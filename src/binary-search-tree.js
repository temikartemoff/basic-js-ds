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

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);

    if (this._root === null) {
      this._root = node;
    } else {
      let current = this._root;

      while (true) {
        if (data < current.data) {
          if (current.left === null) {
            current.left = node;
            break;
          }
          current = current.left;
        } else if (data > current.data) {
          if (current.right === null) {
            current.right = node;
            break;
          }
          current = current.right;
        } else {
          break;
        }
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;

    while (current !== null) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  remove(data) {
    const removeNode = function(node, data) {
      if (node === null) {
        return null;
      }

      if (data === node.data) {
        if (node.left === null && node.right === null) {
          return null;
        }

        if (node.left === null) {
          return node.right;
        }

        if (node.right === null) {
          return node.left;
        }

        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    if (this._root === null) {
      return null;
    }

    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }

    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }

    return current.data;
  }
}


module.exports = {
  BinarySearchTree
};