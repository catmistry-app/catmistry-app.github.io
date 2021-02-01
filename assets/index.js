let greatWords = ['educational', 'time-saving', 'beautiful', 'helpful']
const describeText = document.getElementById('great-things');

const $ = (e) => { return document.getElementById(e) }

function init() {
    // Shuffle list of qns
    let m = greatWords.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = greatWords[m];
        greatWords[m] = greatWords[i];
        greatWords[i] = t;
    }
    // End shuffling algorithm

    describeText.textContent = greatWords[0];
}

init();
let wordCounter = 1;

function startInterval() { // Start changing text
    setInterval(function() {
        describeText.classList.add('hide');
        setTimeout(function() {
            describeText.textContent = greatWords[wordCounter];
            setTimeout(function() { describeText.classList.remove('hide'); }, 100)
        }, 500)
        wordCounter ++;
        if (wordCounter >= greatWords.length) {
            wordCounter = 0;
        }
    }, 3500);
}
// Init ScrollReveal elements

const revealOps = {
    delay: 500
};
ScrollReveal(revealOps).reveal('.load-hidden:not(#intro-header)');
ScrollReveal({delay: 500, afterReveal: startInterval}).reveal('#intro-header');

function getOS() {
    let userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) os = 0;
    else if (iosPlatforms.indexOf(platform) !== -1) os = 1;
    else if (windowsPlatforms.indexOf(platform) !== -1) os = 2;
    else if (/Android/.test(userAgent)) os = 3;
    else if (!os && /Linux/.test(platform)) os = 4;

    return os;
}

const btnTextStr = ['Download on the App Store', 'Download on the App Store', 'Not available', 'Get it on the Galaxy Store', 'Not available', 'Download APK'];
const btnLinkStr = ['https://apps.apple.com/sg/app/catmistry/id1545311327',
    'https://apps.apple.com/sg/app/catmistry/id1545311327',
    '',
    'coming5oon',
    ''];

const addAltDownload = (text, href) => {

}

// Set download button text based on device
$('download-device').textContent = btnTextStr[getOS()];

// Onclick listeners
$('downloadMore').onclick = (event) => {
    const menu = $('downloadOpts').MDCMenu;
    menu.setAbsolutePosition(event.clientX, event.clientY);
    menu.open = true;
}

$('mainDownload').onclick = () => {
    document.location = btnLinkStr[getOS()];
}
