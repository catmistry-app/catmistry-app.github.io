function parseURL() {
    //return 'https://gist.githubusercontent.com/lisilinhart/e9dcf5298adff7c2c2a4da9ce2a3db3f/raw/2f1a0d47eba64756c22460b5d2919d45d8118d42/red_panda.md';
    return 'blog/test.md'
}

async function fetchAndParseMarkdown(url) { // Convert Markdown into purified HTML
    const response = await fetch(url);
    const data = await response.text();
    return DOMPurify.sanitize(marked(data, {}));
}


function generateLinkMarkup($headings) {
    // console.log($headings); // All h1 and h2 headings (for debug)
    const parsedHeadings = $headings.map(heading => {
        return {
            title: heading.innerText,
            depth: heading.nodeName.replace(/\D/g, ''),
            id: heading.getAttribute('id') };
    });
    // console.log(parsedHeadings);
    // Update document title with first heading
    const $title = `${parsedHeadings[0].title}`;
    document.title = $title + ' - CryptoAlgo Inc.';
    document.querySelector('.mdc-top-app-bar__title').textContent = $title;
    document.querySelector('.header .title-holder-l .title-inside h1').textContent = $title;
    // Convert list into HTML content
    const htmlMarkup = parsedHeadings.map(h => `
	<li class="${h.depth > 1 ? 'pl-4' : ''}">
		<a href="#${h.id}">${h.title}</a>
	</li>
	`); // Plug in values into template
    return `
		<ul>${htmlMarkup.join('')}</ul>
	`; // Combine all values into one
}

function updateLinks(visibleId, $links) {
    $links.map(link => {
        let href = link.getAttribute('href');
        link.classList.remove('is-active');
        if (href === visibleId) link.classList.add('is-active');
    });
}

function handleObserver(entries, observer, $links) {
    entries.forEach(entry => {
        const { target, isIntersecting, intersectionRatio } = entry;
        if (isIntersecting && intersectionRatio >= 1) {
            const visibleId = `#${target.getAttribute('id')}`;
            updateLinks(visibleId, $links);
        }
    });
}

function createObserver($links) {
    const options = { // Fires events when heading crosses 70% of the top of viewport
        rootMargin: "0px 0px -70% 0px",
        threshold: 1
    };

    const callback = (e, o) => handleObserver(e, o, $links);
    return new IntersectionObserver(callback, options);
}

function handleLinkClick(evt, $headings, motionQuery) {
    evt.preventDefault();
    let id = evt.target.getAttribute("href").replace('#', ''); // Remove hash
    let section = $headings.find(heading => heading.getAttribute('id') === id);
    section.setAttribute('tabindex', -1);
    section.focus();

    window.scroll({
        behavior: motionQuery.matches ? 'instant' : 'smooth',
        top: section.offsetTop - 20 - 48 });
}

async function init() {
    // Part 0 - Parse id from page URL
    const $url = parseURL();

    // Part 1 - Fetch and parse markdown into dom
    const $main = document.querySelector('#content');
    const $aside = document.querySelector('#aside');
    $main.innerHTML = await fetchAndParseMarkdown($url);

    // Part 2 - Generate contents links
    const $headings = [...$main.querySelectorAll('h1, h2')];
    $aside.innerHTML = generateLinkMarkup($headings);

    // Part 3 - Set up scroll observer to update currently active link
    const $links = [...$aside.querySelectorAll('a')];
    const observer = createObserver($links);
    $headings.map(heading => observer.observe(heading));

    // Part 4 - Add click listeners for links to scroll to section
    const motionQuery = window.matchMedia('(prefers-reduced-motion)');
    $links.map(link => {
        link.addEventListener("click",
            evt => handleLinkClick(evt, $headings, motionQuery));
    });
}

init();

let hasReloaded = true;

// Handling theme changes
function themeChanged() {
    setTimeout(function() {
        hasReloaded = true;
        if (typeof DISQUS === "object") {
            DISQUS.reset({
                reload: true
            });
        }
    }, 250) // Wait for animation to complete
}

// Disqus config
/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
function disqus_config () {
    this.callbacks.onReady.push(function () {
        if (!hasReloaded) {
            const div = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = 'Disclaimer: social and share buttons do not work'
            div.id = 'disqus_overlay';
            div.appendChild(p);
            document.getElementById('disqus_thread').appendChild(div);
        }
    });
}