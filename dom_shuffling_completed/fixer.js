let header = document.querySelector('body > header');
let h1 = document.querySelector('main > h1');

header.insertAdjacentElement('afterbegin', h1);
let body = document.body;
body.insertAdjacentElement('afterbegin', header);

let content = document.querySelector('#content');
let article = document.querySelector('section > article');
let babyMop = content.children[1];
let chinStick = content.lastElementChild;
article.append(chinStick);
article.append(babyMop);
