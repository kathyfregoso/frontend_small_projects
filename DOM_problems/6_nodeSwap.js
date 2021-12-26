function nodeSwap(id1, id2) {
  let node1 = document.getElementById(id1);
  let node2 = document.getElementById(id2);

  if (!validSwap(node1, node2)) return undefined;

  let cloneNode1 = node1.cloneNode(true);
  let cloneNode2 = node2.cloneNode(true);
  let node1Parent = node1.parentNode;
  let node2Parent = node2.parentNode;

  node1Parent.replaceChild(cloneNode2, node1);
  node2Parent.replaceChild(cloneNode1, node2);
}

function validSwap(node1, node2) {
  return node1 && node2 && !node1.contains(node2) && !node2.contains(node1);
}
