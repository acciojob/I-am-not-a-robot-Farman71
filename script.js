document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("flex");
  document.body.appendChild(imageContainer);

  const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg"
  ];

  // Duplicate one random image
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const shuffledImages = [...images];
  shuffledImages.push(images[duplicateIndex]);

  // Shuffle images
  shuffledImages.sort(() => Math.random() - 0.5);

  let selectedImages = [];

  // Create and append images
  shuffledImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });

  const message = document.createElement("h3");
  message.id = "h";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  document.body.appendChild(message);

  const resultMessage = document.createElement("p");
  resultMessage.id = "para";
  document.body.appendChild(resultMessage);

  const resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.textContent = "Reset";
  resetButton.style.display = "none";
  resetButton.addEventListener("click", resetSelection);
  document.body.appendChild(resetButton);

  const verifyButton = document.createElement("button");
  verifyButton.id = "verify";
  verifyButton.textContent = "Verify";
  verifyButton.style.display = "none";
  verifyButton.addEventListener("click", verifySelection);
  document.body.appendChild(verifyButton);

  function handleImageClick(img) {
    if (selectedImages.length < 2 && !selectedImages.includes(img)) {
      img.classList.add("selected");
      selectedImages.push(img);
      resetButton.style.display = "block";
      
      if (selectedImages.length === 2) {
        verifyButton.style.display = "block";
      }
    }
  }

  function resetSelection() {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    resultMessage.textContent = "";
  }

  function verifySelection() {
    if (selectedImages.length === 2) {
      if (selectedImages[0].src === selectedImages[1].src) {
        resultMessage.textContent = "You are a human. Congratulations!";
      } else {
        resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      }
      verifyButton.style.display = "none";
    }
  }
});
