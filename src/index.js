/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files
import './index.html';

// Stylesheets
import './css/main.scss';

// Scripts
import './js/main.js';

const navbar = document.querySelector("nav");
const sections = document.querySelectorAll("section"); 
const navLinks = document.querySelectorAll(".nav-links a"); 

// for carousel 
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

const previousButton = document.querySelector(".carousel-button.previous");
const nextButton = document.querySelector(".carousel-button.next");

let currentSlide = 0; 


// detect scrolling, shrink navbar when detected
window.addEventListener("scroll", function() {

    if (window.scrollY > 0) {
        navbar.classList.add("small");
    } else {
        navbar.classList.remove("small");
    }

    let currentSection = "";

    const navbarBottom = navbar.getBoundingClientRect().bottom;  // getting location of the bottom of navbar

    // const checkPoint = navbar.offsetHeight + 1;

    sections.forEach(function (section) {

        const sectionPosition = section.getBoundingClientRect();  // getting location of each section

        // checking if section reached/passed bottom of navbar
        // if so, then that is the section we are currently reading
        if (sectionPosition.top <= navbarBottom && sectionPosition.bottom > navbarBottom) {
            currentSection = section.id;
        }

    });

    // this is special case user reached bottom of page
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        currentSection = sections[sections.length - 1].id;
    }

    // updating navbar indicator
    navLinks.forEach(function (link) {

        link.classList.remove("active");  // removing active class from section 

        // checking if current traversed section is equal to computed currentsection,
        // if so we make that section apart of active class
        if (link.getAttribute("href") === "#" + currentSection) { 
            link.classList.add("active");
        }

    });

});

// interacting with modal (opening modal)
const cards = document.querySelectorAll(".game-mode-card");

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        const modalId = card.getAttribute("data-modal");

        const modal = document.getElementById(modalId);

        modal.style.display = "flex";

    });

});

// interacting with modal (closing modal)
const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const modal = button.closest(".modal");

        modal.style.display = "none";

    });

});

// Function for displaying a slide
function showSlide(index) {

    // Remove active class from all slides
    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    // Display current slide
    slides[index].classList.add("active");
    dots[index].classList.add("active");
}


// Next button
nextButton.addEventListener("click", function() {

    currentSlide++;

    // If we pass the last slide,
    // return to the first slide
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
});


// Previous button
previousButton.addEventListener("click", function() {

    currentSlide--;

    // If we go before the first slide,
    // go to the last slide
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
});
