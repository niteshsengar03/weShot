import React, { useState } from "react";
import { studentAPI, type StudentData } from "../services/api";
import "./StudentForm.css";

interface FormErrors {
  regNo?: string;
  name?: string;
  email?: string;
}

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentData>({
    regNo: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Registration Number validation
    if (!formData.regNo.trim()) {
      newErrors.regNo = "Registration number is required";
    } else if (formData.regNo.length < 9 || formData.regNo.length > 10) {
      newErrors.regNo = "Registration number must be 9-10 characters";
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "regNo" ? value.toUpperCase() : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await studentAPI.createStudent(formData);
      setMessage({
        text: `Successfully registered! Welcome, ${response.message.name}!`,
        type: "success",
      });

      // Reset form
      setFormData({
        regNo: "",
        name: "",
        email: "",
      });
    } catch (error) {
      setMessage({
        text: `${
          error instanceof Error ? error.message : "Registration failed"
        }`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1 className="form-title">
            We<span className="highlight">Shot</span>
          </h1>
          <p className="form-subtitle">Enter your details and join us!</p>

          <div className="info-section">
            <div className="info-content">
              <p>
                Our mission is to keep you updated on{" "}
                <strong>VIT Chennai placements</strong>. If you get shortlisted
                in a company, we will email you the details.
              </p>
              <p>
                Please provide an email address that you{" "}
                <strong>check regularly</strong> and is{" "}
                <strong>NeoPat registered</strong> so you never miss our alerts.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="student-form">
          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
              required
            />
            <label htmlFor="name" className={formData.name ? "active" : ""}>
              Full Name
            </label>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={formData.regNo}
              onChange={handleInputChange}
              className={errors.regNo ? "error" : ""}
              style={{ textTransform: "uppercase" }}
              required
            />
            <label htmlFor="regNo" className={formData.regNo ? "active" : ""}>
              Registration No.
            </label>
            {errors.regNo && <span className="error-text">{errors.regNo}</span>}
          </div>

          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error" : ""}
              required
            />
            <label htmlFor="email" className={formData.email ? "active" : ""}>
              Email
            </label>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </div>
    </div>
  );
};

export default StudentForm;
