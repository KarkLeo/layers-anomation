const root = document.querySelector('.js_img');
const imgRation = 1.47516053; // OriginalImageWidth / OriginalImageHeight

let isRatio = innerWidth / innerHeight > imgRation;
let globalBgP = {
    height: isRatio ? `${100 / imgRation}vw` : '100vh',
    bgSize: isRatio ? `110% auto` : `auto 110%`,
    bgPosition: [
        {x: '50%', y: '50%'},
        {x: '50%', y: '50%'},
        {x: '50%', y: '50%'},
        {x: '50%', y: '50%'},
        {x: '50%', y: '50%'}
    ]
}

let renderBg = (bg, prop) => {
    bg.style = `
        height: ${prop.height};
    
        background-size: ${prop.bgSize};
        background-position:
          ${prop.bgPosition[0].x} ${prop.bgPosition[0].y},
          ${prop.bgPosition[1].x} ${prop.bgPosition[1].y},
          ${prop.bgPosition[2].x} ${prop.bgPosition[2].y},
          ${prop.bgPosition[3].x} ${prop.bgPosition[3].y},
          ${prop.bgPosition[4].x} ${prop.bgPosition[4].y}
    `;
}

const mouse_monitor = function (e) {
    let x = e.clientX;
    let y = e.clientY;

    let xCenterItem = root.offsetLeft + root.clientWidth / 2;
    let yCenterItem = root.offsetTop + root.clientHeight / 2;

    x = (e.clientX >= xCenterItem)
        ? ((e.clientX - xCenterItem) / ((innerWidth - xCenterItem) * 2) + 0.5)
        : (e.clientX / (xCenterItem * 2));
    y = (e.clientY >= yCenterItem)
        ? ((e.clientY - yCenterItem) / ((innerHeight - yCenterItem) * 2) + 0.5)
        : (e.clientY / (yCenterItem * 2));

    let dX = (i = 1) => x >= .5 ? (x - .5) / (i + 0.5) + .5 : .5 - (.5 - x) / (i + 0.5);
    let dY = (i = 1) => y >= .5 ? (y - .5) / (i + 0.5) + .5 : .5 - (.5 - y) / (i + 0.5);
    let positionImg = root.getBoundingClientRect();
    globalBgP.bgPosition[0].x = `${x * 100}%`;
    globalBgP.bgPosition[0].y = positionImg.y === 0 ? `${dY(3) * 100}%` : globalBgP.bgPosition[0].y;
    globalBgP.bgPosition[1].x = `${dX() * 100}%`;
    globalBgP.bgPosition[1].y = positionImg.y === 0 ? `${dY(6) * 100}%` : globalBgP.bgPosition[1].y;
    globalBgP.bgPosition[2].x = `${dX(2) * 100}%`;
    globalBgP.bgPosition[2].y = positionImg.y === 0 ? `${dY(9) * 100}%` : globalBgP.bgPosition[2].y;
    globalBgP.bgPosition[3].x = `${dX(3) * 100}%`;
    globalBgP.bgPosition[3].y = positionImg.y === 0 ? `${dY(12) * 100}%` : globalBgP.bgPosition[3].y;
    globalBgP.bgPosition[4].x = `50%`;
    globalBgP.bgPosition[4].y = positionImg.y === 0 ? `50%` : globalBgP.bgPosition[4].y;
    renderBg(root, globalBgP)
};

let resizeImg = () => {
    isRatio = innerWidth / innerHeight > imgRation;
    globalBgP.height = isRatio ? `${100 / imgRation}vw` : '100vh';
    globalBgP.bgSize = isRatio ? `110% auto` : `auto 110%`;
    renderBg(root, globalBgP);
};


let scrollBackground = () => {
    let scrollBgStep = .1
    let positionImg = root.getBoundingClientRect();
    let scrollProcent = positionImg.y / positionImg.height * 100;
    if (scrollProcent < 0) {
        globalBgP.bgPosition[0].y = `calc(${50 + scrollProcent / 2}% + ${-3 * scrollBgStep * scrollProcent}vh)`;
        globalBgP.bgPosition[1].y = `calc(${50 + scrollProcent / 2}% + ${-4 * scrollBgStep * scrollProcent}vh)`;
        globalBgP.bgPosition[2].y = `calc(${50 + scrollProcent / 2}% + ${-5 * scrollBgStep * scrollProcent}vh)`;
        globalBgP.bgPosition[3].y = `calc(${50 + scrollProcent / 2}% + ${-6 * scrollBgStep * scrollProcent}vh)`;
        globalBgP.bgPosition[4].y = `calc(${50 + scrollProcent / 2}% + ${-7 * scrollBgStep * scrollProcent}vh)`;
    } else {
        globalBgP.bgPosition[0].y =
            globalBgP.bgPosition[1].y =
                globalBgP.bgPosition[2].y =
                    globalBgP.bgPosition[3].y =
                        globalBgP.bgPosition[4].y = `50%`;
    }

    renderBg(root, globalBgP)
};

let initBackground = () => {
    resizeImg();
    scrollBackground();
}
document.addEventListener("DOMContentLoaded", initBackground);
document.body.addEventListener("mousemove", mouse_monitor);
window.addEventListener('resize', resizeImg);
window.addEventListener('scroll', scrollBackground);

// ======================
// === Clouds animation
// ======================

let initialCloudsAnimation = (cloud) => {
    let timerId = setTimeout(function tick() {
        let t = Date.now();
        let translateX = `translateX(${cloud.getPositionX(t, cloud.cPosiotion.phiA)})`;
        let translateY = `translateY(${cloud.getPositionY(t, cloud.cPosiotion.phiA)})`;
        let scaleX = `scaleX(${cloud.getWidth(t)})`;
        let scaleY = `scaleY(${cloud.getHeight(t)})`;
        let rotate = `rotate(${cloud.getRotate(t)})`;
        cloud.spinA.style = `
        width: ${cloud.widthA}vw;
        transform: 
            ${translateX}
            ${translateY}
            ${scaleX}
            ${scaleY}
            ${rotate}
    `;
        translateX = `translateX(${cloud.getPositionX(t, cloud.cPosiotion.phiB)})`;
        translateY = `translateY(${cloud.getPositionY(t, cloud.cPosiotion.phiB)})`;
        cloud.spinB.style = `
    width: ${cloud.widthB}vw;
    transform: 
        ${translateX}
        ${translateY}
        ${scaleX}
        ${scaleY}
        ${rotate}
    `;
        translateX = `translateX(${cloud.getPositionX(t, cloud.cPosiotion.phiC)})`;
        translateY = `translateY(${cloud.getPositionY(t, cloud.cPosiotion.phiC)})`;
        cloud.spinC.style = `
    width: ${cloud.widthC}vw;
    transform: 
        ${translateX}
        ${translateY}
        ${scaleX}
        ${scaleY}
        ${rotate}
    `;

        timerId = setTimeout(tick, 15); // (*)
    }, 15);
    return timerId;
};

const CloudParam = function (imgs, srcAr) {
    const randomGen = (min, max) => Math.random() * (max - min) + min;
    const oscillation = (t, {A, w, phi}) => A * Math.cos((t * w + phi) * Math.PI / 180);
    const oscillationPosX = (t, A, w, phi) => A * Math.cos((t * w + phi) * Math.PI / 180) - 50;
    const oscillationPosY = (t, A, w, phi) => A * Math.sin((t * w + phi) * Math.PI / 180) - 80;

    this.spinA = document.querySelector(`.${imgs[0]}`);
    this.spinB = document.querySelector(`.${imgs[1]}`);
    this.spinC = document.querySelector(`.${imgs[2]}`);

    const setSrc = (img, scrAr) => {
        img.src = srcAr[Math.round(randomGen(0, scrAr.length - 1))];
    };
    setSrc(this.spinA, srcAr);
    setSrc(this.spinB, srcAr);
    setSrc(this.spinC, srcAr);

    this.widthA = randomGen(70, 160);
    this.widthB = randomGen(70, 160);
    this.widthC = randomGen(70, 160);
    this.cWidth = {
        A: randomGen(2, 40),
        w: randomGen(.005, .05),
        phi: randomGen(0, 360)
    };
    this.getWidth = function (t) {
        return (100 + oscillation(t, this.cWidth)) / 100
    };
    this.cHeight = {
        A: randomGen(2, 40),
        w: randomGen(.005, .05),
        phi: randomGen(0, 360)
    };
    this.getHeight = function (t) {
        return (100 + oscillation(t, this.cHeight)) / 100
    };
    this.cRotate = {
        A: randomGen(1, 10),
        w: randomGen(.005, .05),
        phi: randomGen(0, 360)
    };
    this.getRotate = function (t) {
        return oscillation(t, this.cRotate) + 'deg'
    };
    this.cPosiotion = {
        Ax: 70,
        Ay: 60,
        w: randomGen(.001, .005),
        phiA: randomGen(0, 360),
        get phiB() {
            return this.phiA + 120
        },
        get phiC() {
            return this.phiA + 240
        },
    };
    this.getPositionX = function (t, phi) {
        let posX = oscillationPosX(t, this.cPosiotion.Ax, this.cPosiotion.w, phi);
        return `calc(${posX}vw ${posX < 0 ? '- ' + Math.abs(posX) : '+ ' + posX}%)`
    };
    this.getPositionY = function (t, phi) {
        let posY = oscillationPosY(t, this.cPosiotion.Ay, this.cPosiotion.w, phi);
        return `${posY}%`;
    };
};

let imgs_1 = [
    'js_cloud--1',
    'js_cloud--2',
    'js_cloud--3'
];
let imgs_2 = [
    'js_cloud--4',
    'js_cloud--5',
    'js_cloud--6'
];
let imgs_3 = [
    'js_cloud--7',
    'js_cloud--8',
    'js_cloud--9'
];
let srcAr = [
    "./img/cloud-1-min.png",
    "./img/cloud-2-min.png",
    "./img/cloud-3-min.png",
    "./img/cloud-4-min.png",
    "./img/cloud-5-min.png"
];
let cloud_1 = new CloudParam(imgs_1, srcAr);
initialCloudsAnimation(cloud_1);
let cloud_2 = new CloudParam(imgs_2, srcAr);
initialCloudsAnimation(cloud_2);
let cloud_3 = new CloudParam(imgs_3, srcAr);
initialCloudsAnimation(cloud_3);
