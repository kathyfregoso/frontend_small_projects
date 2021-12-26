function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

let intros = document.querySelectorAll(".intro p");

for (let idx = 0; idx < intros.length; idx += 1) {
  intros[idx].classList.add("article-text");
}
