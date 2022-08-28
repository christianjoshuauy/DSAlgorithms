import { sleep } from "../components/utilities";

let arrow;
let count = -1;
const width = 1489;
//const height = 815;
const startX = width / 2;
const startY = 50;
const nodesOffsetX = 100;
const nodesOffsetY = 100;

class Node {
  constructor(val, x, y, parent = null) {
    this.val = val === undefined ? randomIntFromInterval(1, 99) : val;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.dx = 5;
    this.dy = 2;
    this.startingRadius = 0;
    this.radius = 30;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.startingRadius, 0, 2 * Math.PI, false);
    context.font = "20px Poppins";
    context.strokeStyle = "turquoise";
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(this.val, this.x, this.y);

    context.beginPath();
    if (this.parent) {
      if (this.parent.left === this) {
        context.moveTo(this.x, this.y - this.radius);
        context.lineTo(this.parent.x, this.y - nodesOffsetY + this.radius);
        context.stroke();
      } else {
        context.moveTo(this.x, this.y - this.radius);
        context.lineTo(this.parent.x, this.y - nodesOffsetY + this.radius);
        context.stroke();
      }
    }
  }

  renderNode(context){
    if(this.startingRadius <= this.radius){
      context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.startingRadius, 0, 2 * Math.PI, false);
      context.clip();
      context.clearRect(this.x - this.startingRadius, this.y - this.startingRadius, this.startingRadius * 2, this.startingRadius * 2);
      context.restore();
      this.draw(context);
      this.startingRadius += this.dy;
      requestAnimationFrame(() => {this.renderNode(context);})
    }
    else{
      this.startingRadius = 30;
    }
  }
}

export default class BST {
  constructor() {
    this.root = null;
  }
  addNode(val, context = null) {
    let temp = new Node(val, startX, startY);
    if (this.root == null) {
      this.root = temp;
    }
    let curr = this.root;
    while (curr) {
      if (val === curr.val) {
        break;
      } else if (val < curr.val) {
        if (!curr.left) {
          temp.parent = curr;
          curr.left = temp;
          temp.x = curr.x - nodesOffsetX;
          temp.y = curr.y + nodesOffsetY;
          if(curr.parent && curr.parent.right === curr){
            this.update1(curr);
          }
          break;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          temp.parent = curr;
          curr.right = temp;
          temp.x = curr.x + nodesOffsetX;
          temp.y = curr.y + nodesOffsetY;
          if(curr.parent && curr.parent.left === curr){
            this.update2(curr);
          }
          break;
        }
        curr = curr.right;
      }
    }
  }

  async addNodeAnimated(val, context = null) {
    arrow = new Arrow();
    let temp = new Node(val, startX, startY);
    if (this.root == null) {
      this.root = temp;
    }
    let curr = this.root;
    while (curr) {
      await this.awaitUpdate(arrow, context, curr);
      if (val === curr.val) {
        break;
      } else if (val < curr.val) {
        if (!curr.left) {
          temp.parent = curr;
          curr.left = temp;
          temp.x = curr.x - nodesOffsetX;
          temp.y = curr.y + nodesOffsetY;
          if(curr.parent && curr.parent.right === curr){
            this.update1(curr);
          }
          break;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          temp.parent = curr;
          curr.right = temp;
          temp.x = curr.x + nodesOffsetX;
          temp.y = curr.y + nodesOffsetY;
          if(curr.parent && curr.parent.left === curr){
            this.update2(curr);
          }
          break;
        }
        curr = curr.right;
      }
    }
  }

  async searchNodeAnimated(val, context = null){
    arrow = new Arrow();
    if(this.root == null){
      return false;
    } 
    let curr = this.root;
    while(curr){
      await this.awaitUpdate(arrow, context, curr);
      if(val === curr.val){
        return true;
      }
      else if(val < curr.val){
        curr = curr.left;
      }
      else{
        curr = curr.right;
      }
    }
    return false;
  }

  async deleteNodeAnimated(val, context = null){
    arrow = new Arrow();
    let curr = this.root, prev = null;
    while(curr && curr.val !== val){
      await this.awaitUpdate(arrow, context, curr);
      prev = curr;
      if(val < curr.val) curr = curr.left;
      else curr = curr.right;
    }

    if(!curr) return this.root;

    if(!curr.left || !curr.right){
      await this.awaitUpdate(arrow, context, curr);
      let child = curr.left ? curr.left : curr.right;
      await this.awaitUpdate(arrow, context, child);
      if(curr.left){
        if(curr.parent)
          curr.left.parent = curr.parent;
        this.update3(curr.left);
      }
      else{
        if(curr.parent)
          curr.right.parent = curr.parent;
        this.update4(curr.right);
      }
      if(!prev) this.root = child;
      else if(prev.left === curr) prev.left = child;
      else prev.right = child;
    }
    else{
      let node = curr;
      prev = curr;
      await this.awaitUpdate(arrow, context, curr);
      curr = curr.right;
      await this.awaitUpdate(arrow, context, curr);
      while(curr.left){
        prev = curr;
        curr = curr.left;
        await this.awaitUpdate(arrow, context, curr)
      }
      node.val = curr.val;
      if(prev.left === curr) prev.left = curr.right;
      else prev.right = curr.right;
    }
    return this.root;
  }

  async awaitUpdate(arrow = null, context = null, curr = null){
    count = 2;
    update(arrow, context, curr.x, curr.y, curr.radius, "turquoise");
    await sleep(500);
    update(arrow, context, curr.x, curr.y, curr.radius, "red");
    await sleep(500);
  }

  async preorderTraversal(context = null, root = null){
    arrow = new Arrow();
    let array = [];
    await this.preorderHelper(arrow, context, root, array);
    return array;
  }

  async preorderHelper(arrow = null, context = null, root = null, array){
    if(!root) return;
    await this.awaitUpdate(arrow, context, root);
    array.push(root.val);
    await this.preorderHelper(arrow, context, root.left, array);
    await this.preorderHelper(arrow, context, root.right, array);
  }

  async inorderTraversal(context = null, root = null){
    arrow = new Arrow();
    let array = [];
    await this.inorderHelper(arrow, context, root, array);
    return array;
  }

  async inorderHelper(arrow = null, context = null, root = null, array){
    if(!root) return;
    await this.inorderHelper(arrow, context, root.left, array);
    await this.awaitUpdate(arrow, context, root);
    array.push(root.val);
    await this.inorderHelper(arrow, context, root.right, array);
  }

  async postorderTraversal(context = null, root = null){
    arrow = new Arrow();
    let array = [];
    await this.postorderHelper(arrow, context, root, array);
    return array;
  }

  async postorderHelper(arrow = null, context = null, root = null, array){
    if(!root) return;
    await this.postorderHelper(arrow, context, root.left, array);
    await this.postorderHelper(arrow, context, root.right, array);
    await this.awaitUpdate(arrow, context, root);
    array.push(root.val);
  }

  async bfs(context = null, root = null){
    arrow = new Arrow();
    if(root === null){
      return;
    }
    let res = [];
    let q = [];
    q.push(root);
    while(q.length > 0){
      //let temp = [];
      for(let i = 0; i < q.length; i++){
        let curr = q.shift();
        await this.awaitUpdate(arrow, context, curr);
        res.push(curr.val);
        if(curr.left){
          q.push(curr.left);
        }
        if(curr.right){
          q.push(curr.right);
        }
      }
      //res.push(temp);
    }
    return res;
  }

  update1(node){
    node.x += nodesOffsetX;
    if(node.left){
        this.update1(node.left);
    }
    if(node.right){
        this.update1(node.right);
    }
  }

  update2(node){
    node.x -= nodesOffsetX;
    if(node.left){
        this.update2(node.left);
    }
    if(node.right){
        this.update2(node.right);
    }
  }

  update3(node){
    node.x += nodesOffsetX;
    node.y -= nodesOffsetY;
    if(node.left){
        this.update3(node.left);
    }
    if(node.right){
        this.update3(node.right);
    }
  }

  update4(node){
    node.x -= nodesOffsetX;
    node.y -= nodesOffsetY;
    if(node.left){
        this.update4(node.left);
    }
    if(node.right){
        this.update4(node.right);
    }
  }
}

function Arrow(x, y, x1, y1){
  this.fromX = x;
  this.fromY = y;
  this.toX = x1;
  this.toY = y1;
  this.radius = 30;
  this.diffX = 8;
  this.diffY = 20;

  this.draw = (context, color) => {
    if(color === "red"){
      // context.beginPath();
      // context.moveTo(arrow.fromX, arrow.fromY);
      // context.lineTo(arrow.toX, arrow.toY);
      // context.strokeStyle = color;
      // context.lineWidth = 2;
      // context.stroke();

      context.beginPath();
      context.moveTo(arrow.fromX - arrow.diffX / 1.5 - 1, arrow.fromY + arrow.diffY - 1);
      context.lineTo(arrow.fromX + arrow.diffX / 1.5 + 1, arrow.fromY + arrow.diffY - 1);
      context.lineWidth = 2;
      context.strokeStyle = color;
      context.stroke();

      context.beginPath();
      context.moveTo(arrow.fromX - arrow.diffX / 1.5, arrow.fromY + arrow.diffY);
      context.lineTo(arrow.toX, arrow.toY);
      context.strokeStyle = color;
      context.stroke();

      context.beginPath();
      context.moveTo(arrow.fromX + arrow.diffX / 1.5, arrow.fromY + arrow.diffY);
      context.lineTo(arrow.toX, arrow.toY);
      context.strokeStyle = color;
      context.stroke();
    }

    context.beginPath();
    context.arc(arrow.fromX, arrow.toY + arrow.radius + arrow.diffX, arrow.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = color;
    context.stroke();
  }
}



async function update(node = null, context, x, y, radius, color){
  if(count >= 0 && node !== null){
    context.clearRect(node.fromX - node.diffX, node.fromY, 20, node.toY - node.fromY + 1);
    node.draw(context, color);
    await sleep(500);
    node.fromX = x;
    node.toX = x;
    node.toY = y - radius - node.diffX;
    node.fromY = node.toY - radius;
    count--;
    setTimeout(() => { update(node, context, x, y, radius); }, 500);
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


