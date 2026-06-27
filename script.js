// ال js كله عبارة عن مساعدة في الفورم لعدم الانتقال إلى Formspree بعد الإرسال

const form = document.querySelector(".Contact");
const toast = document.getElementById("toast");

let toastTimeout;

function showToast(message, type = "success") {
  clearTimeout(toastTimeout);

  toast.textContent = message;
  toast.className = "";
  toast.classList.add(type, "show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@.][^\s@]*@[^\s@.]+(\.[^\s@.]+)+$/;
  return emailRegex.test(email);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = form.querySelector('input[name="email"]');
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address.", "error");
    emailInput.focus();
    return;
  }

  const button = form.querySelector("button");
  const originalHTML = button.innerHTML;

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
      showToast("Thank you for your message! I'll get back to you soon.");
      form.reset();
    } else {
      showToast("Failed to send message!", "error");
    }
  } catch (error) {
    showToast("Network error!", "error");
  }

  button.disabled = false;
  button.innerHTML = originalHTML;
});