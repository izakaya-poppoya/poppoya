const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

function closeMenu() {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 40),
  { passive: true }
);

document.querySelectorAll("img[data-fallback]").forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("is-missing");
    const label = document.createElement("span");
    label.className = "fallback-label";
    label.textContent = image.dataset.fallback;
    image.parentElement.appendChild(label);
  });
});

const mobileMenuQuery = window.matchMedia("(max-width: 620px)");
const menuGroups = document.querySelectorAll(".menu-group");

function updateMenuGroupState() {
  menuGroups.forEach((group) => {
    const heading = group.querySelector("h3");
    if (mobileMenuQuery.matches) {
      heading.setAttribute("role", "button");
      heading.setAttribute("tabindex", "0");
      heading.setAttribute("aria-expanded", String(group.classList.contains("is-open")));
    } else {
      group.classList.remove("is-open");
      heading.removeAttribute("role");
      heading.removeAttribute("tabindex");
      heading.removeAttribute("aria-expanded");
    }
  });
}

function toggleMenuGroup(group) {
  if (!mobileMenuQuery.matches) return;
  const isOpen = group.classList.toggle("is-open");
  group.querySelector("h3").setAttribute("aria-expanded", String(isOpen));
}

menuGroups.forEach((group) => {
  const heading = group.querySelector("h3");
  heading.addEventListener("click", () => toggleMenuGroup(group));
  heading.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenuGroup(group);
    }
  });
});

mobileMenuQuery.addEventListener("change", updateMenuGroupState);
updateMenuGroupState();

document.getElementById("year").textContent = new Date().getFullYear();
