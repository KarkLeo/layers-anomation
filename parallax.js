// Easy parallax
let parallaxBG = (elementsSelector = [], range = 20) => {
    let elements = document.querySelectorAll(elementsSelector.toString());
    let parallax = (element) => {
        let t = element.getBoundingClientRect().top;
        let h = element.getBoundingClientRect().height;
        let H = window.innerHeight;
        let dh = range / 50;
        let pos = (.5 - (t + h) / (H + h)) * dh * h;
        element.style.backgroundPositionY = `calc(50% ${pos < 0 ? '- ' + (-1 * pos) : '+ ' + pos}px)`;
    };
    let parallaxScroll = () => elements.forEach((item) => parallax(item));
    parallaxScroll();
    window.addEventListener('scroll', parallaxScroll);
};
parallaxBG(['.par-block'], 25);


