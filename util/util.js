const formattingSecond = (second) => {
    let m = parseInt(second / 60);
    let s = parseInt(second % 60);
    return `${m}'${s}"`
}

const formattingNum = (num) => {
    return num < 10 ? `0${num}` : num;
}

const getStatic = () => {
    let staticData = window.localStorage.getItem('static');
    return JSON.parse(staticData);
}

export default {
    formattingNum,
    formattingSecond,
    getStatic
}
