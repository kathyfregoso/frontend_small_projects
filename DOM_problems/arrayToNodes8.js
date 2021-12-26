// function arrayToNodes(nodesArray) {
//   let parent = document.createElement(nodesArray[0]);
//   let children = nodesArray[1];

//   if (children.length === 0) return parent;

//   for (let idx = 0; idx < children.length; idx += 1) {
//     parent.appendChild(arrayToNodes(children[idx]));
//   }
//   return parent;
// }

const arrayToNodes = function (nodes) {
  const [parent, children] = nodes;
  const subTree = document.createElement(parent);

  children
    .map((node) => arrayToNodes(node))
    .forEach((branch) => subTree.appendChild(branch));

  return subTree;
};
