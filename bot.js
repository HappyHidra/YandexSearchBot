// ==UserScript==
// @name         Yandex bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Mikhail Okmyanskiy
// @match        https://yandex.ru/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let inp = document.querySelector("#text");
let event = new Event("click");
let btnK = document.querySelector(".search2__button").firstChild;
let eventMouse = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
});

const intervalID = setTimeout(myCallback, 1000);
function myCallback()
{
let links = document.links;
let keywords = ["продаже машин от частных лиц и официальных дилеров", "автомобильный сайт в Рунете", "купить авто","купить машину"];
let keyword = keywords[getRandom(0, keywords.length)];
if (btnK !== undefined) {
  inp.value = keyword;
 //btnK.click();
  btnK.dispatchEvent(event);
}
for (let i=0; i<links.length; i++) {
    if (links[i].href.indexOf("auto.ru") !== -1) {
      console.log("Нашел строку" + links[i]);
      let link = links[i];
        link.dispatchEvent(event);
      link.click();
      break;
    }
  }
function getRandom(min, max) {
  return Math.floor(Math.random()*(max - min) + min);
}
}
