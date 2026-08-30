const form = document.querySelector(".Contact");
const toast = document.getElementById("toast");
const skillExampleToggle = document.querySelector(".skill-example-toggle");
const skills3dExample = document.querySelector(".skills-3d-example");
const themeToggles = document.querySelectorAll(".theme-toggle");
const menuToggle = document.querySelector(".icon-nav");
const mobileMenu = document.querySelector(".nav-phone");

let toastTimeout;

// function updateThemeControls(isLightMode) {
//   themeToggles.forEach((toggle) => {
//     toggle.setAttribute(
//       "aria-label",
//       isLightMode ? "Switch to dark mode" : "Switch to light mode",
//     );

//     const mobileLabel = toggle.querySelector(".sun-phone span");
//     if (mobileLabel) {
//       mobileLabel.textContent = isLightMode ? "Dark Mode" : "Light Mode";
//     }
//   });
// }

// const savedTheme = localStorage.getItem("portfolio-theme");
// const isLightMode = savedTheme === "light";
// document.body.classList.toggle("light-mode", isLightMode);
// updateThemeControls(isLightMode);

// themeToggles.forEach((toggle) => {
//   const toggleTheme = () => {
//     const lightMode = document.body.classList.toggle("light-mode");
//     localStorage.setItem("portfolio-theme", lightMode ? "light" : "dark");
//     updateThemeControls(lightMode);
//   };

//   toggle.addEventListener("click", toggleTheme);
//   toggle.addEventListener("keydown", (event) => {
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault();
//       toggleTheme();
//     }
//   });
// });

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

menuToggle?.addEventListener("click", toggleMobileMenu);
menuToggle?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleMobileMenu();
  }
});

mobileMenu?.querySelectorAll(".nav-links-phone a").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("is-open"));
});

skillExampleToggle?.addEventListener("click", () => {
  const isVisible = skills3dExample.classList.toggle("is-visible");

  skillExampleToggle.setAttribute("aria-expanded", String(isVisible));
  skills3dExample.setAttribute("aria-hidden", String(!isVisible));
  skillExampleToggle.textContent = isVisible ? "Hide Example" : "Example";
});

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

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = form.querySelector('input[name="email"]');
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address.", "error");
    emailInput.focus();
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const originalHTML = button.innerHTML;

  button.disabled = true;
  button.textContent = "Sending...";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      showToast("Thank you for your message! I'll get back to you soon.");
      form.reset();
    } else {
      showToast(result.message || "Failed to send message!", "error");
    }
  } catch (error) {
    showToast("Network error!", "error");
  } finally {
    button.disabled = false;
    button.innerHTML = originalHTML;
  }
});

console.log(`Hamza Gamal | Portfolio`);
