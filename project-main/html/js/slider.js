document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    let slides = document.querySelectorAll(".slide");
    const prevButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");
    const imageUpload = document.getElementById("imageUpload");

    const confirmModal = new ModalPage({
});

 console.log(confirmModal);

 document.getElementById('openModal')
 .addEventListener('click', () => {
    console.log('Modal Button clicked');
    confirmModal.createAndOpen();
});


    let currentIndex = 0;

    function updateSlide() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
    }

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);

    // Touch Events for Swipe
    let startX = 0;
    slider.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
    });

    slider.addEventListener("touchend", (event) => {
        let endX = event.changedTouches[0].clientX;
        if (startX - endX > 50) nextSlide(); //  Left
        if (endX - startX > 50) prevSlide(); //  Right
    });



    slider.style.display = "flex";
    slider.style.transition = "transform 0.5s ease-in-out";
});
