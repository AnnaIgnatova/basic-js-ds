const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

module.exports = class BinarySearchTree {
  constructor() {
    this.node = null;
  }
  root() {
    return this.node;
  }

  add(value) {
    const treeNode = new Node(value);

    if (!this.node) {
      this.node = treeNode;
      return this.node;
    }
    addNodeToTree(this.node);

    function addNodeToTree(node) {
      if (treeNode.data < node.data) {
        if (!node.left) {
          node.left = treeNode;
          return;
        }
        addNodeToTree(node.left);
      } else {
        if (!node.right) {
          node.right = treeNode;
          return;
        }
        addNodeToTree(node.right);
      }
    }
  }

  has(value) {
    return this.find(value) === null ? false : true;
  }

  find(value) {
    return searchInTree(this.node, value);

    function searchInTree(treeNode, value) {
      if (!treeNode) {
        return null;
      }

      if (treeNode.data === value) {
        return treeNode;
      }

      if (value < treeNode.data) {
        return searchInTree(treeNode.left, value);
      } else {
        return searchInTree(treeNode.right, value);
      }
    }
  }

  remove(data) {
    this.node = removeNodeFromTree(this.node, data);

    function removeNodeFromTree(treeNode, data) {
      if (!treeNode) {
        return null;
      }

      if (data < treeNode.data) {
        treeNode.left = removeNodeFromTree(treeNode.left, data);
        return treeNode;
      } else if (treeNode.data < data) {
        treeNode.right = removeNodeFromTree(treeNode.right, data);
        return treeNode;
      } else {
        if (!treeNode.left && !treeNode.right) {
          return null;
        }

        if (!treeNode.left) {
          treeNode = treeNode.right;
          return treeNode;
        }

        if (!treeNode.right) {
          treeNode = treeNode.left;
          return treeNode;
        }

        let minNodesRight = treeNode.right;

        while (minNodesRight.left) {
          minNodesRight = minNodesRight.left;
        }

        treeNode.data = minNodesRight.data;
        treeNode.right = removeNodeFromTree(treeNode.right, minNodesRight.data);

        return treeNode;
      }
    }
  }

  min(treeNode = this.node) {
    return treeNode.left ? this.min(treeNode.left) : treeNode.data;
  }

  max(treeNode = this.node) {
    return treeNode.right ? this.max(treeNode.right) : treeNode.data;
  }
};
