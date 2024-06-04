document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wordForm");
  const input = document.getElementById("wordInput");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const word = input.value;

    try {
      const response = await fetch("/write-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: word }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      input.value = ""; // Clear the input field
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
