import React, { Component } from "react";
import Cardcontainer from "../components/Cardcontainer";
import LinkedlistHeader from "../ui/LinkedlistHeader";
import "../styles/LinkedListAlgo.css";
import {
  getAddAtAnimations,
  getAddatHeadAnimations,
  getAddatTailAnimations,
  getDeleteAtAnimations,
  getReverseLinkedListAnimations,
} from "../Algos/Linkedlistalgos";
import { Alert, Snackbar } from "@mui/material";

export class Node {
  constructor(val, next) {
    this.val = val === undefined ? randomIntFromInterval(1, 999) : val;
    this.next = next === undefined ? null : next;
  }
}

let type = 0;
let temporaryVal;
let temporaryIndex;
const DEFAULT_LIST = 3;
const ANIMATION_SPEED = 300;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

export default class LinkedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      open: false,
      message: "",
      severity: "success",
    };
    this.head = new Node();
    this.size = 0;
  }

  componentDidMount() {
    this.resetList();
  }

  render() {
    const { array } = this.state;
    return (
      <React.Fragment>
        <Cardcontainer>
          <LinkedlistHeader
            onPlay={() => this.listPlay()}
            changeType={(val) => {
              this.changeHandler(val);
            }}
            changeValue={(val) => {
              this.changeValueHandler(val);
            }}
            changeIndex={(val) => {
              this.changeIndexHandler(val);
            }}
            onReset={() => this.resetList()}
          />
          <div className="container">
            {array.map((value, idx) => (
              <div className="cont" key={idx}>
                <div className="circle">
                  <div className="val">{value}</div>
                </div>
                <div className="arrow">
                  <div className="line2"></div>
                  <div className="point"></div>
                </div>
              </div>
            ))}
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert
              variant="filled"
              onClose={this.handleClose}
              severity={this.state.severity}
            >
              {this.state.message}
            </Alert>
          </Snackbar>
        </Cardcontainer>
      </React.Fragment>
    );
  }

  handleMessages(message, severity) {
    this.setState({ open: true, message: message, severity: severity });
  }

  handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  changeHandler(val) {
    type = val;
  }

  changeValueHandler(val) {
    temporaryVal = val;
  }

  changeIndexHandler(idx) {
    temporaryIndex = idx;
  }

  listPlay() {
    if (type === 1) {
      this.addAtHead(temporaryVal);
    } else if (type === 2) {
      this.addAtIndex(temporaryVal, temporaryIndex);
    } else if (type === 3) {
      this.addAtTail(temporaryVal);
    } else if (type === 4) {
      this.deleteAtIndex(temporaryIndex);
    } else if (type === 5) {
      this.reverseList();
    } else {
      this.handleMessages("Invalid Option", "warning");
    }
  }

  reverseList() {
    const animations = getReverseLinkedListAnimations(this);
    const contain = document.getElementsByClassName("cont");
    const circle = document.getElementsByClassName("circle");
    const line = document.getElementsByClassName("line2");
    const point = document.getElementsByClassName("point");
    const num = document.getElementsByClassName("val");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][1] === "color") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = SECONDARY_COLOR;
          lineStyle.backgroundColor = SECONDARY_COLOR;
          pointStyle.borderLeftColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else if (animations[i][1] === "back") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = PRIMARY_COLOR;
          lineStyle.backgroundColor = PRIMARY_COLOR;
          pointStyle.borderLeftColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else if (animations[i][1] === "swap") {
        const nodeOne = animations[i][0];
        const containStyle = contain[nodeOne].style;
        const valueStyle = num[nodeOne].style;
        setTimeout(() => {
          containStyle.transition = "400ms linear";
          containStyle.transform = "rotate(-180deg)";
          valueStyle.transition = "400ms linear";
          valueStyle.transform = "rotate(180deg)";
        }, i * ANIMATION_SPEED);
      } else if (animations[i][1] === "swap2") {
        const nodeOne = animations[i][0];
        const containStyle = contain[nodeOne].style;
        const valueStyle = num[nodeOne].style;
        setTimeout(() => {
          containStyle.transition = "250ms linear";
          containStyle.transform = "rotate(-360deg)";
          valueStyle.transition = "250ms linear";
          valueStyle.transform = "rotate(360deg)";
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          this.listToArray();
        }, i * ANIMATION_SPEED);
      }
    }
  }

  addAtHead(val) {
    const animations = getAddatHeadAnimations(this, val);
    const circle = document.getElementsByClassName("circle");
    const line = document.getElementsByClassName("line2");
    const point = document.getElementsByClassName("point");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][1] === "color") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = SECONDARY_COLOR;
          lineStyle.backgroundColor = SECONDARY_COLOR;
          pointStyle.borderLeftColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else if (animations[i][1] === "back") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = PRIMARY_COLOR;
          lineStyle.backgroundColor = PRIMARY_COLOR;
          pointStyle.borderLeftColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          this.listToArray();
        }, i * ANIMATION_SPEED);
      }
    }
    this.size++;
  }

  addAtTail(val) {
    const animations = getAddatTailAnimations(this, val);
    const circle = document.getElementsByClassName("circle");
    const line = document.getElementsByClassName("line2");
    const point = document.getElementsByClassName("point");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][1] === "color") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = SECONDARY_COLOR;
          lineStyle.backgroundColor = SECONDARY_COLOR;
          pointStyle.borderLeftColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else if (animations[i][1] === "back") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = PRIMARY_COLOR;
          lineStyle.backgroundColor = PRIMARY_COLOR;
          pointStyle.borderLeftColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          this.listToArray();
        }, i * ANIMATION_SPEED);
      }
    }
    this.size++;
  }

  addAtIndex(val, idx) {
    const animations = getAddAtAnimations(this, val, idx, this.size);
    const circle = document.getElementsByClassName("circle");
    const line = document.getElementsByClassName("line2");
    const point = document.getElementsByClassName("point");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][1] === "color") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = SECONDARY_COLOR;
          lineStyle.backgroundColor = SECONDARY_COLOR;
          pointStyle.borderLeftColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else if (animations[i][1] === "back") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = PRIMARY_COLOR;
          lineStyle.backgroundColor = PRIMARY_COLOR;
          pointStyle.borderLeftColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          this.listToArray();
        }, i * ANIMATION_SPEED);
      }
    }
    this.size++;
  }

  deleteAtIndex(idx) {
    const animations = getDeleteAtAnimations(this, idx, this.size);
    const circle = document.getElementsByClassName("circle");
    const line = document.getElementsByClassName("line2");
    const point = document.getElementsByClassName("point");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][1] === "color") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = SECONDARY_COLOR;
          lineStyle.backgroundColor = SECONDARY_COLOR;
          pointStyle.borderLeftColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else if (animations[i][1] === "back") {
        const nodeOne = animations[i][0];
        const circleStyle = circle[nodeOne].style;
        const lineStyle = line[nodeOne].style;
        const pointStyle = point[nodeOne].style;
        setTimeout(() => {
          circleStyle.borderColor = PRIMARY_COLOR;
          lineStyle.backgroundColor = PRIMARY_COLOR;
          pointStyle.borderLeftColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          this.listToArray();
        }, i * ANIMATION_SPEED);
      }
    }
    this.size--;
  }

  resetList() {
    let i = 0;
    this.head.val = randomIntFromInterval(1, 999);
    let curr = this.head;
    while (i < DEFAULT_LIST) {
      curr.next = new Node(randomIntFromInterval(1, 999));
      curr = curr.next;
      this.size++;
      i++;
    }
    this.listToArray();
  }

  listToArray() {
    const array = [];
    let curr = this.head;
    while (curr !== null) {
      array.push(curr.val);
      curr = curr.next;
    }
    this.setState({ array });
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
