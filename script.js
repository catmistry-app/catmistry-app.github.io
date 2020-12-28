// Init all MDC elements
window.mdc.autoInit();

const $ = (i) => {return document.getElementById(i);}

const data = 
    [{
        url: 'https://www.catmistry.cf/images/catmistry.png',
        title: "CATmistry",
        text: "Chemistry, Gamified"
    },
    {
        url: "https://www.catmistry.cf/images/learn1.jpg",
        title: "Learn",
        text: "In a simple-to-understand but detailed manner"
    }, 
    {
        url: "https://www.catmistry.cf/images/learn2.jpg",
        title: "Learn",
        text: "With interactive elements to enhance your understanding"
    },
    {
        url: "https://www.catmistry.cf/images/learn3.jpg",
        title: "Learn",
        text: "Through specially designed graphs made by the CATmistry team"
    }, 
    {
        url: "https://www.catmistry.cf/images/practice.jpg",
        title: "Practice",
        text: "Track your understanding and learn more effectively"
    },
    {
        url: "https://www.catmistry.cf/images/play.jpg",
        title: "Play",
        text: "CATmistry's own games"
    },
    {
        url: "https://www.catmistry.cf/images/follow.jpg",
        title: "Follow",
        text: "Your cat on its journey through earth"
    }];

let i = -1;
const selImg = (anim = true) => {
    const imgElem = $('slideshowImg');
    const titleElem = $('title');
    const subtitleElem = $('text');
    let timeout = 0;
    if (anim) {
        imgElem.classList.add('invisible');
        titleElem.classList.add('invisible');
        subtitleElem.classList.add('invisible');
        timeout = 520;
    }
    setTimeout(() => {
        imgElem.src = data[i].url;
        titleElem.textContent = data[i].title;
        subtitleElem.textContent = data[i].text;
        imgElem.classList.remove('invisible');
        titleElem.classList.remove('invisible');
        subtitleElem.classList.remove('invisible');
    }, timeout);
    
    i++;
    if (i >= data.length) i = 0;
}

setInterval(() => {
  selImg()
}, 5000);

selImg(false); // Ensure there's a first image