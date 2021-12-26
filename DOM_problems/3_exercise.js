function domTreeTracer(id) {
  let currEl = document.getElementById(id);
  let parentEl;
  const domTree = [];

  do {
    parentEl = currEl.parentNode;
    let children = getTagNames(parentEl.children);
    domTree.push(children);

    currEl = parentEl;
  } while (parentEl.tagName !== "BODY");

  return domTree;
}

function getTagNames(htmlCollection) {
  const elementsArr = Array.from(htmlCollection);

  return elementsArr.map(({ tagName }) => tagName);
}

console.log(domTreeTracer(1)); // [["ARTICLE"]]
// console.log(domTreeTracer(2));
// //[["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
// console.log(domTreeTracer(22));
// // [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
