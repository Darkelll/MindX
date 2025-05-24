let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>  {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}


//The animation for accordian
document.querySelectorAll('.accor').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordian-item');
    const content = item.querySelector('.accordian-content');
    const isActive = item.classList.contains('active');

    // Collapse all items
    document.querySelectorAll('.accordian-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.accordian-content').style.maxHeight = null;
    });

    // Expand clicked item
    if (!isActive) {
      item.classList.add('active');
      content.style.maxHeight = 2 * content.scrollHeight + 'px';
    }
  });
});


//Navigation function onto pages

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('.navbar li a');

window.onscroll = () => {
  let currentId = null;

  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      currentId = id;
    }
  });

  navlinks.forEach(link => {
    link.classList.remove('active-1');
    if (currentId && link.getAttribute('href')?.includes(currentId)) {
      link.classList.add('active-1');
    }
  });
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }else {
            entry.target.classList.remove('visible');
        }
    })
});

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

const observer_right = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }else {
            entry.target.classList.remove('visible');
        }
    })
});

document.querySelectorAll('.right-scroll-animate').forEach(el => observer.observe(el));
