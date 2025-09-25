// 👉 Replace with your actual API details
const API_URL = "https://your-api-endpoint.com/saveUser";
const API_KEY = "YOUR_API_KEY";

const form = document.getElementById("weShotForm");
const msg  = document.getElementById("message");
const toggleNote = document.getElementById("toggleNote");
const noteContent = document.getElementById("noteContent");

// --- Collapsible Note Toggle ---
toggleNote.addEventListener("click", () => {
  noteContent.classList.toggle("open");
});

// --- Form Submission ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    collegeId: document.getElementById("collegeId").value.trim(),
    email: document.getElementById("email").value.trim()
  };

  msg.textContent = "Submitting…";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      msg.style.color = "#00e0ff";
      msg.textContent = "✅ Details saved successfully!";
      form.reset();
    } else {
      const err = await res.text();
      msg.style.color = "#ff8080";
      msg.textContent = "❌ Error: " + err;
    }
  } catch (error) {
    msg.style.color = "#ff8080";
    msg.textContent = "⚠️ Network error. Try again!";
    console.error(error);
  }
});

// --- Particle.js Configuration ---
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#00e0ff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00e0ff",
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      random: true,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 150, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
