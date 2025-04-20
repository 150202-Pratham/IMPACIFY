document.addEventListener("DOMContentLoaded", () => {
    const options = {
        strings: ["a place to relax.", "a coffee lover's paradise.", "where moments are brewed."],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
    };

    const typed = new Typed(".js-text-animation", options);
});