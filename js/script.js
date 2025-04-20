// Swiper js
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  // grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// Nav open close
const body = document.querySelector('body'),
      navMenu = body.querySelector('.menu-content'),
      navOpenBtn = body.querySelector('.navOpen-btn'),
      navCloseBtn = navMenu.querySelector('.navClose-btn');

if(navMenu && navOpenBtn){
  navOpenBtn.addEventListener("click", () =>{
    navMenu.classList.add("open");
    body.style.overflowY = "hidden"
  })
}

if(navMenu && navCloseBtn){
  navCloseBtn.addEventListener("click", () =>{
    navMenu.classList.remove("open");
    body.style.overflowY = "scroll";
  })
}

// Change header bg color
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  if(scrollY > 5){
    document.querySelector("header").classList.add("header-active");
  }else{
    document.querySelector("header").classList.remove("header-active");
  }

  // Scroll up button
  const scrollUpBtn = document.querySelector('.scrollUp-btn');

  if(scrollY > 250){
    scrollUpBtn.classList.add("scrollUpBtn-active");
  }else{
    scrollUpBtn.classList.remove("scrollUpBtn-active");
  }
  
  
  // Nav link indicator

  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section =>{
    const sectionHeight = section.offsetHeight,
          sectionTop = section.offsetTop - 100;

          let navId = document.querySelector(`.menu-content a[href='#${section.id}']`);
          if(scrollY > sectionTop && scrollY <=  sectionTop + sectionHeight){
            navId.classList.add("active-navlink");           
          }else{
            navId.classList.remove("active-navlink");     
          }
          
          navId.addEventListener("click", () => {
            navMenu.classList.remove("open");
            body.style.overflowY = "scroll";
          })
  })
})  
  
  
  // Scroll Reveal Animation
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
  })
  
  sr.reveal(`.section-title, .section-subtitle, .section-description, .brand-image, .tesitmonial, .newsletter 
.logo-content, .newsletter-inputBox, .newsletter-mediaIcon, .footer-content, .footer-links`, {interval:100,})

sr.reveal(`.about-imageContent, .menu-items`, {origin: 'left'})
sr.reveal(`.about-details, .time-table`, {origin: 'right'})

// Drink Customization Toggle
document.querySelectorAll('.customize-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const panel = this.nextElementSibling;
        panel.classList.toggle('active');
        
        // Update button text
        const icon = this.querySelector('i');
        if (panel.classList.contains('active')) {
            icon.classList.remove('fa-sliders-h');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-sliders-h');
        }
    });
});

// Extra Shots Counter
document.querySelectorAll('.shots-counter').forEach(counter => {
    const minusBtn = counter.querySelector('.minus');
    const plusBtn = counter.querySelector('.plus');
    const countDisplay = counter.querySelector('span');
    
    minusBtn.addEventListener('click', () => {
        let count = parseInt(countDisplay.textContent);
        if (count > 0) {
            countDisplay.textContent = count - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let count = parseInt(countDisplay.textContent);
        countDisplay.textContent = count + 1;
    });
});