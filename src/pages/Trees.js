import React, { Component } from "react";
import Cardcontainer, { setCode } from "../components/Cardcontainer";
import TreesHeader from "../ui/TreesHeader";
import "../styles/Trees.css";
import BST from "../Algos/Treesalgos";
import { Alert, Snackbar } from "@mui/material";

let type = 0;
let context;
let tempVal;
const WIDTH = 1489;
const HEIGHT = 815;
const insertCode =
`TreeNode* insertIntoBST(TreeNode* root, int val) {
  TreeNode *temp = new TreeNode(val);
  if(!root) return temp;
  TreeNode *curr = root;
  while(curr){
      if(val <= curr->val){
          if(!curr->left){
              curr->left = temp;
              break;
          }
          curr = curr->left;
      }
      else{
          if(!curr->right){
              curr->right = temp;
              break;
          }
          curr = curr->right;
      }
  }
  return root;
}`;
const deleteCode =
`TreeNode* deleteNode(TreeNode* root, int key) {
  TreeNode *curr = root, *prev = NULL;
  while(curr && curr->val != key){
      prev = curr;
      if(key < curr->val) curr = curr->left;
      else curr = curr->right;
  }
  
  if(!curr) return root;
  
  if(!curr->left || !curr->right){
      TreeNode *child = curr->left ? curr->left : curr->right;
      if(!prev) root = child;
      else if(prev->left == curr) prev->left = child;
      else prev->right = child;
  }
  else{
      TreeNode *node = curr;
      prev = curr;
      curr = curr->right;
      while(curr->left){ 
          prev = curr;
          curr = curr->left;
      }
      node->val = curr->val;
      if(prev->left == curr) prev->left = curr->right;
      else prev->right = curr->right;
  }
  
  return root;
}`;
const findCode =
`TreeNode* searchBST(TreeNode* root, int val) {
  if(!root) return NULL;
  TreeNode *curr = root;
  while(curr){
      if(val == curr->val)
          break;
      else if(val < curr->val)
          curr = curr->left;
      else
          curr = curr->right;
  }
  return curr;
}`;
const preorderCode =
`vector<int> tree;
vector<int> preorderTraversal(TreeNode* root){
    if(!root) return tree;
    tree.push_back(root->val);
    preorderTraversal(root->left);
    preorderTraversal(root->right);
    return tree;
}`;
const inorderCode =
`vector<int> tree;
vector<int> inorderTraversal(TreeNode* root){
    if(!root) return tree;
    inorderTraversal(root->left);
    tree.push_back(root->val);
    inorderTraversal(root->right);
    return tree;
}`;
const postordercode = 
`vector<int> tree;
vector<int> postorderTraversal(TreeNode* root){
    if(!root) return tree;
    postorderTraversal(root->left);
    postorderTraversal(root->right);
    tree.push_back(root->val);
    return tree;
}`;
const breadthCode =
`vector<vector<int>> levelOrder(TreeNode* root) {
  vector<vector<int>>tree;
  if(!root)
      return tree;
  queue<TreeNode*>q;
  q.push(root);
  while(!q.empty()){
      int rowSize=q.size();
      vector<int>v1;
      while(rowSize--){
          TreeNode *curr=q.front();
          q.pop();
          if(curr->left)
              q.push(curr->left);
          if(curr->right)
              q.push(curr->right);
          v1.push_back(curr->val);
      }
      tree.push_back(v1);
  }
  return tree;
}`;

export default class Trees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      open: false,
      severity: "success",
      message: "",
    };
    this.tree = new BST();
    this.ref = React.createRef();
  }

  componentDidMount() {
    context = this.ref.current.getContext("2d");
    this.resetTree(context);
  }

  resetTree() {
    let array = [];
    this.tree = new BST();
    for (let i = 0; i < 6; i++) {
      this.tree.addNode(randomIntFromInterval(1, 99), context);
    }
    this.drawTreeMain(this.tree.root);
    this.setState({ array });
  }

  render() {
    let { array } = this.state;
    return (
      <React.Fragment>
        <Cardcontainer>
          <TreesHeader
            onReset={() => this.resetTree()}
            changeType={(v) => this.handleChangeType(v)}
            changeValue={(v) => this.handleChangeValue(v)}
            onPlay={() => this.playHandler()}
          />
          <div className="container2">
            <canvas
              ref={this.ref}
              height={HEIGHT}
              width={WIDTH}
              className="canvas"
            ></canvas>
          </div>
          <div className="array-container2">
            {array.map((value, idx) => (
              <div className="box" key={idx}>
                {value}
              </div>
            ))}
          </div>
        </Cardcontainer>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert variant="filled" onClose={this.handleClose} severity={this.state.severity}>
            {this.state.message}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }

  handleMessages(message, severity) {
    this.setState({ open: true,  message: message, severity: severity});
  }

  handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleChangeType(v) {
    type = v;
  }

  handleChangeValue(v) {
    tempVal = v;
  }

  async playHandler() {
    let array = [];
    this.setState({ array });
    if (type === 1) {
      setCode(insertCode);
      await this.tree.addNodeAnimated(tempVal, context);
      this.drawTreeMain(this.tree.root);
    } else if (type === 2) {
      setCode(deleteCode);
      this.tree.root = await this.tree.deleteNodeAnimated(tempVal, context);
      this.drawTreeMain(this.tree.root);
    } else if (type === 3) {
      setCode(findCode);
      if(await this.tree.searchNodeAnimated(tempVal, context)){
        this.handleMessages("Found the node with value: " + tempVal, "success");
      }
      else{
        this.handleMessages("Couldn't find the node with the value: " + tempVal, "error");
      }
      this.drawTreeMain(this.tree.root);
    } else if (type === 4) {
      setCode(preorderCode);
      let array = await this.tree.preorderTraversal(context, this.tree.root);
      this.drawTreeMain(this.tree.root);
      this.setState({ array });
    } else if (type === 5) {
      setCode(inorderCode);
      let array = await this.tree.inorderTraversal(context, this.tree.root);
      this.drawTreeMain(this.tree.root);
      this.setState({ array });
    } else if (type === 6) {
      setCode(postordercode);
      let array = await this.tree.postorderTraversal(context, this.tree.root);
      this.drawTreeMain(this.tree.root);
      this.setState({ array });
    } else if(type === 7){
      setCode(breadthCode);
      let array = await this.tree.bfs(context, this.tree.root);
      this.drawTreeMain(this.tree.root);
      this.setState({ array });
    } else {
      this.handleMessages("Invalid Option", "warning");
    }
  }

  drawTreeMain(root) {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    this.drawTree(root);
  }

  drawTree(root) {
    if (!root) return;
    root.renderNode(context);
    this.drawTree(root.left);
    this.drawTree(root.right);
  }
}

//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
