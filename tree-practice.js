const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  if(!rootNode.left) return rootNode.val;

  return findMinBST(rootNode.left)
}

function findMaxBST (rootNode) {
  if(!rootNode.right) return rootNode.val;

  return findMaxBST(rootNode.right)
}

function findMinBT (rootNode) {
  let min = rootNode.val;

  function depthFirstTraversal(root) {
    let stack = [root];
    while(stack.length){
     let node = stack.pop();
     if(node.val < min){
      min = node.val;
     }
     if(node.left){
       stack.push(node.left)
     }
     if(node.right){
       stack.push(node.right)
     }
    }
  }

  depthFirstTraversal(rootNode);
  return min;
}

function findMaxBT (rootNode) {
  let max = rootNode.val;

  function depthFirstTraversal(root) {
    let stack = [root];
    while(stack.length){
     let node = stack.pop();
     if(node.val > max){
      max = node.val;
     }
     if(node.left){
       stack.push(node.left)
     }
     if(node.right){
       stack.push(node.right)
     }
    }
  }

  depthFirstTraversal(rootNode);
  return max;
}

function getHeight (rootNode) {
  if(!rootNode){
    return -1;
  }

  let left = getHeight(rootNode.left);
  let right = getHeight(rootNode.right);

  return Math.max(left, right) + 1;
}

function balancedTree (rootNode) {
  let balanced = true;

  //finds height for each node in tree
  function findLocalHeight(rootNode){
    if(!rootNode) return;

    let left = getHeight(rootNode.left)
    let right = getHeight(rootNode.right)

    // console.log("LEFT:", left, "RIGHT:", right)
    if(Math.abs(left - right) > 1){
      balanced = false;
    } else {
      findLocalHeight(rootNode.left)
      findLocalHeight(rootNode.right)
    }
  }

  findLocalHeight(rootNode);
  return balanced;

  // we want to traverse absolute left, and absolute right
  // compare these lengths
  // if they are the same or one apart, then move to children
  // if not, immediately return false from whole function
  // repeat this process for the rest
  // if the end is reached without a false return, the tree is balanced
}

function countNodes (rootNode) {
  // Your code here
  let count = 0;

  function traverse(node){
    if(!node) return;
    traverse(node.left)
    traverse(node.right)
    count++;
  }

  traverse(rootNode)
  return count;
}

function getParentNode (rootNode, target) {
  if(target === rootNode.val) return null;
  let parent;
  function traverse(node){
    if(!node) return;
    traverse(node.left)
    traverse(node.right)

    if(node.left){
      if(node.left.val === target){
        parent = node;
      }
    }

    if(node.right){
      if(node.right.val === target){
        parent = node;
      }
    }
  }

  traverse(rootNode)
  return parent;
}

function inOrderPredecessor (rootNode, target) {
  let nodes = [];
  function traverse(node){
    if(!node) return
    traverse(node.right)
    nodes.push(node.val)
    traverse(node.left)
  }

  traverse(rootNode)
  let ans = nodes[nodes.indexOf(target) + 1]
  return ans ? ans : null;
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  // let parent;

  // function traverse(node){
  //   if(!node) return;
  //   traverse(node.left)

  //   if(node.left && node.left.val === target){
  //     parent = node;
  //     //no children
  //     if(!node.left.left && !node.left.right){
  //       parent.left = null;
  //     }
  //     //only left child
  //     else if(node.left.left && !node.left.right){
  //       parent.left = node.left.left;
  //     }
  //     //only right child
  //     else if(node.left.right && !node.left.left){
  //       parent.left = node.left.right;
  //     }
  //     //two children
  //     else {
  //       let min = findMinBST(parent.right);
  //       parent.right = min;
  //       console.log("TEST", min)
  //     }
  //   }

  //   if(node.right && node.right.val === target){
  //     parent = node;
  //     //no children
  //     if(!node.right.left && !node.right.right){
  //       parent.right = null;
  //     }
  //     //only left child
  //     else if(node.right.left && !node.right.right){
  //       parent.right = node.right.left;
  //     }
  //     //only right child
  //     else if(node.right.right && !node.right.left){
  //       parent.right = node.right.right;
  //     }
  //     //two children
  //     else {
  //       let min = findMinBST(parent.right);
  //       console.log("TEST", min)
  //     }
  //   }

  //   traverse(node.right)
  // }

  // traverse(rootNode)
  // if(!parent) return undefined;
  // return rootNode;

  // Undefined if the target cannot be found
  // Set target based on parent

  // Case 0: Zero children and no parent:
  //   return null

  // Case 1: Zero children:
  //   Set the parent that points to it to null

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.

  // Case 3: One child:
  //   Make the parent point to the child
  
  let found;
  function wrapper(rootNode){
    if (!rootNode.left && !rootNode.right) return null;
    if (target < rootNode.val) {
      rootNode.left = wrapper(rootNode.left, target);
    } else if (target > rootNode.val) {
      rootNode.right = wrapper(rootNode.right, target);
    } else {
      found = true;
      if (!rootNode.left) return rootNode.right;
      if (!rootNode.right) return rootNode.left;
      let minRight = findMinBST(rootNode.right);
      rootNode.val = minRight;
      rootNode.right = wrapper(rootNode.right, minRight);
    }
    return rootNode;
  }

  let res =  wrapper(rootNode)
  if(!found){
    return undefined;
  }
  return res;
}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
