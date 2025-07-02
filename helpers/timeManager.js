const frameTime = {
    last : Date.now(),
    current : 0,
    delta : 0
};

function getFormattedTime () {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function getFormattedDate () {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    return `${month} \u2022 ${day} \u2022 ${year}`;
}

export { frameTime, getFormattedTime, getFormattedDate };
