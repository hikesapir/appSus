export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    getRandomClr
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomClr() {
    const colors = ['#ffc107', '#df8eb6', '#0dcaf0', '#ffc107'];

    var idx = getRandomInt(0, colors.length - 1);
    var randomClr = colors[idx];
    return randomClr;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}