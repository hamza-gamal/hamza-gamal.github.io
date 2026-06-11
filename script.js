const form = document.querySelector(".Contact");

let toastTimeout;

function showToast(text, color = "#22c55e") {
  const toast = document.getElementById("toast");

  clearTimeout(toastTimeout);

  toast.textContent = text;
  toast.style.background = color;

  toast.classList.add("show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = form.querySelector("button");
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Sending...";

  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xbdpvqge", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      showToast("✅ Message sent successfully!");
      form.reset();
    } else {
      showToast("❌ Failed to send message!", "#ef4444");
    }
  } catch (error) {
    showToast("❌ Network error!", "#ef4444");
  }

  button.disabled = false;
  button.textContent = originalText;
});
