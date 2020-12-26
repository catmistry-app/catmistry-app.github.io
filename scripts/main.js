let slideIndex = 0;
let slides = document.getElementsByClassName("slide");

showSlides();

function showSlides() {
    if(slideIndex !== 0) {
        slides[slideIndex-1].style.display = "none";
    } else {
        slides[slides.length-1].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    slideIndex++;
    if(slideIndex === slides.length) {
        slideIndex = 0;
    }
    setTimeout(showSlides, 4000);
    return "";
}