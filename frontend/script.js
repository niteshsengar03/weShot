document.getElementById("weShotForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  // Get form values
  const name = document.getElementById("name").value.trim();
  const regNo = document.getElementById("regNo").value.trim();
  const email = document.getElementById("email").value.trim();

  // Reference to message div
  const messageBox = document.getElementById("message");

  // Direct API call to backend
  try {
    const res = await fetch(env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ regNo, name, email })
    });

    if (!res.ok) {
      const errorText = await res.text();
      messageBox.textContent = `❌ Error: ${errorText}`;
      messageBox.style.color = "red";
    } else {
      const responseData = await res.json();
      messageBox.textContent = "✅ Successfully submitted!";
      messageBox.style.color = "green";

      console.log("Success:", responseData);

      // Optionally reset the form
      document.getElementById("weShotForm").reset();
    }
  } catch (err) {
    messageBox.textContent = `⚠️ Network error: ${err.message}`;
    messageBox.style.color = "red";
  }
});
