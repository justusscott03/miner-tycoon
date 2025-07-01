const screenSize = {
    originalWidth : 716,
    originalHeight : 962,
    scaledWidth : null,
    scaledHeight : null
};

let screenWidth = window.innerWidth, screenHeight = window.innerHeight;

const aspectRatio = screenSize.originalWidth / screenSize.originalHeight;
if (screenWidth / screenHeight > aspectRatio) {
    screenSize.scaledHeight = screenHeight;
    screenSize.scaledWidth = screenSize.scaledHeight * aspectRatio;
}
else {
    screenSize.scaledWidth = screenWidth;
    screenSize.scaledHeight = screenSize.scaledWidth / aspectRatio;
}

function debounce (func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(function () { func.apply(this, args) }, delay);
    }
}

window.addEventListener("resize", debounce(
    function (event) {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        if (screenWidth / screenHeight > aspectRatio) {
            screenSize.scaledHeight = screenHeight;
            screenSize.scaledWidth = screenSize.scaledHeight * aspectRatio;
        }
        else {
            screenSize.scaledWidth = screenWidth;
            screenSize.scaledHeight = screenSize.scaledWidth / aspectRatio;
        }
    }, 300
));

export { screenSize };