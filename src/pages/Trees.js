import React, { Component } from "react";
import Cardcontainer from "../components/Cardcontainer";
import TreesHeader from "../ui/TreesHeader";
import "../styles/Trees.css";
import BST from "../Algos/Treesalgos";
import { Alert, Snackbar } from "@mui/material";

let type = 0;
let context;
let tempVal;
const WIDTH = 1489;
const HEIGHT = 815;

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
      await this.tree.addNodeAnimated(tempVal, context);
      this.drawTreeMain(this.tree.root);
    } else if (type === 2) {
      this.tree.root = await this.tree.deleteNodeAnimated(tempVal, context);
      this.drawTreeMain(this.tree.root);
    } else if (type === 3) {
      if(await this.tree.searchNodeAnimated(tempVal, context)){
        this.handleMessages("Found the node with value: " + tempVal, "success");
      }
      else{
        this.handleMessages("Couldn't find the node with the value: " + tempVal, "error");
      }
      this.drawTreeMain(this.tree.root);
    } else if (type === 4) {
      let array = await this.tree.preorderTraversal(context, this.tree.root);
      this.drawTreeMain(this.tree.root);
      this.setState({ array });
    } else if (type === 5) {
      let array = await this.tree.inorderTraversal(context, this.tree.root);
      this.drawTreeMain(this.tree.root);
      this.setState({ array });
    } else if (type === 6) {
      let array = await this.tree.postorderTraversal(context, this.tree.root);
      this.drawTreeMain(this.tree.root);
      this.setState({ array });
    } else if(type === 7){
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
