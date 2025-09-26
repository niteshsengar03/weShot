import { dataStudentDTO } from "../DTO/student.dto";
import { findStudentByReg, findStudentByEmail } from "../repositories/student.repository";


type ScrapedStudent = {
  reg: string;
  name: string;
  email: string;
  subject: string;
};

export async function scrapedStudents(
  students: Array<dataStudentDTO>
) {
  const result: ScrapedStudent[] = [];

  for (const student of students) {
    if (student.reg) {
      //regNo provided
      const existingStudent = await findStudentByReg(student.reg);
      if (existingStudent) {
        result.push({
          reg: existingStudent.regNo,
          name: student.name,
          email: existingStudent.email,
          subject: student.subject
        });
      }
    } else if (student.email) {
      //fallback to email
      const existingByEmail = await findStudentByEmail(student.email);
      if (existingByEmail) {
        result.push({
          reg: existingByEmail.regNo,
          name: student.name,
          email: existingByEmail.email, 
          subject: student.subject
        });
      }
    }
    
  }

  return result;
}
