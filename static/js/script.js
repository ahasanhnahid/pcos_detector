// ==============================================
// 🔷 1. Navbar Scroll Effect
// ==============================================
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('logo');

  if (window.scrollY > 50) {
    navbar.classList.remove('bg-transparent');
    navbar.classList.add('bg-[#0a0f2c]/90', 'backdrop-blur');
  } else {
    navbar.classList.add('bg-transparent');
    navbar.classList.remove('bg-[#0a0f2c]/90', 'backdrop-blur');
  }
});

// ==============================================
// 🔷 2. Image Dataset Grid (Infected & Non-Infected)
// ==============================================

// Get container references
const infectedContainer = document.getElementById("infected-grid");
const nonInfectedContainer = document.getElementById("noninfected-grid");

// Helper to create each image card with download icon
function createImageCard(src) {
  const wrapper = document.createElement("div");
  wrapper.className = "relative rounded-xl overflow-hidden shadow";

  const img = document.createElement("img");
  img.src = src;
  img.alt = "Dataset Image";
  img.className = "object-cover w-full h-24 rounded-xl";

  const a = document.createElement("a");
  a.href = src;
  a.download = "";
  a.className = "absolute top-1 right-1 bg-white text-gray-700 p-1 rounded-full shadow";
  a.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3M12 4v8" />
      </svg>
    `;

  wrapper.appendChild(img);
  wrapper.appendChild(a);
  return wrapper;
}

// Load 10 infected sample images
const infectedImages = Array.from({ length: 10 }, (_, i) => {
  const padded = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
  return `/static/images/infected/infected${padded}.jpg`;
});

// Load 10 non-infected sample images
const nonInfectedImages = Array.from({ length: 10 }, (_, i) => {
  const padded = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
  return `/static/images/notinfected/non_infected${padded}.jpg`;
});

// Append them to the DOM
infectedImages.forEach((src) => infectedContainer.appendChild(createImageCard(src)));
nonInfectedImages.forEach((src) => nonInfectedContainer.appendChild(createImageCard(src)));


// ==============================================
// 🔷 3. Preview Selected Image Before Upload
// ==============================================
function previewImage(event) {
  const previewBox = document.getElementById('previewBox');
  const imagePreview = document.getElementById('imagePreview');

  const file = event.target.files[0];
  if (file) {
    previewBox.classList.remove('hidden');
    imagePreview.src = URL.createObjectURL(file);
  }
}

// ==============================================
// ✅ 4. Important: No form-blocking or fake prediction
// ==============================================
// ❌ Do NOT use `e.preventDefault()` or fake results here!
// ✅ Let the form submit normally to Flask backend.
