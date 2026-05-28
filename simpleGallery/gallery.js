const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeBtn = document.getElementById("close-btn");

// Open lightbox
galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        lightbox.style.display = "flex";
        // Remove '-thumbnail' to get full-size URL
        lightboxImage.src = item.src.replace("-thumbnail", "");
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.style.display = "none";
}

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
    // Only close if the background (lightbox itself) is clicked, not the image
    if (e.target === lightbox) {
        closeLightbox();
    }
});