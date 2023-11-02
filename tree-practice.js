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
}

function getParentNode (rootNode, target) {
  // Your code here
}

function inOrderPredecessor (rootNode, target) {
  // Your code here
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent

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
