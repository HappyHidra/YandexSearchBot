// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for Bing
// @author       Mikhail Okmyanskiy
// @match        https://www.bing.com/*
// @match        https://auto.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @match        https://napli.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

const getRandom = (min, max) => {
    return Math.floor(Math.random()*(max - min) + min);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
    "napli.ru":["Взаимодействие PHP и MySQL", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Плагины VS Сode"],
    "kiteuniverse.ru":["Шоу воздушных змеев", "Kite Universe"],
    "motoreforma.com":["мотореформа", "прошивка для CAN-AM", "тюнинг Maverick X3"],
    "auto.ru": ["купить вольво", "ауди", "купить лексус", "купить авто"]
};

let links = document.links;
let bingInput = document.querySelector("#sb_form_q");
let bingSearchBtn = document.querySelector("#search_icon");
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let len = sites[site].length;
let rnd = getRandom(0, len);
let keyword = sites[site][rnd];
if (bingSearchBtn !== null) { //На главной странице поисковика
    document.cookie = `site=${site}`;
    console.log("На главной странице поисковика keyword, site: ", keyword, site);
        setTimeout(()=>{
        bingInput.value = keyword;
    }, getRandom(1500, 2500));
    setTimeout(()=>{
        bingSearchBtn.click();
    }, getRandom(1500, 2500));
}

if (location.hostname == site) { // На целевом сайте
    site = location.hostname
    console.log("На целевом сайте, site: ", site)
    setInterval(()=>{
        let index = getRandom(0, links.length);
        if (getRandom(0, 101) > 70) {
            localStorage.setItem('site', null);
            location.href = "https://www.bing.com/";

        }
        else if (links[index].href.indexOf(site) !== -1) {
            links[index].click();
        }
    }, getRandom(4000, 5000));
} else if(location.hostname == "www.bing.com" && bingSearchBtn == null){ // На страницах поисковика
    site = getCookie("site");
    console.log("На страницах поисковика. Ищем такой куки, site: ", site)
    let pnnext = document.querySelector("[title='Следующая страница']");
    let nextBingPage = true;
    for (let i=0; i<links.length; i++) {
        if (links[i].href.indexOf(site) !== -1) {
            let link = links[i];
            nextBingPage = false;
            setTimeout(()=>{
                link.removeAttribute('target')
                link.click();
            }, 1500)
            break;
        }
    }
    if (window.location.href.includes("first=4")) {
        nextBingPage = false;
        location.href = "https://www.bing.com/";
    }
    if (pnnext !== null){
        setTimeout(()=>{
            pnnext.click();
        }, getRandom(3000, 5000));
    }
}
