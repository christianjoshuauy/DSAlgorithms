import React, { Component } from "react";
import Cardcontainer from "../components/Cardcontainer";
import SortHeader from "../ui/SortHeader";
import "../styles/SortingAlgo.css";
import {
  getBubbleSortAnimations,
  getHeapSortAnimations,
  getInsertionSortAnimations,
  getMergeSortAnimations,
  getQuickSortAnimations,
  getSelectionSortAnimations,
} from "../Algos/Sortalgos";
import { Alert, Snackbar } from "@mui/material";

let animationSpeed = 3;
let numOfBars = 200;
let type = 0;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

export default class Sort2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      open: false,
      message: "",
      severity: "success",
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  render() {
    const { array } = this.state;
    return (
      <React.Fragment>
        <Cardcontainer>
          <SortHeader
            onReset={() => this.resetArray()}
            changeType={(val) => this.changeHandler(val)}
            changeArray={(val) => this.changeArrayHandler(val)}
            changeTime={(val) => this.changeTimeHandler(val)}
            onPlay={() => this.sortPlay()}
          />
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                  width: `${
                    numOfBars > 250
                      ? .135
                      : numOfBars > 200
                      ? .21
                      : numOfBars > 150
                      ? .285
                      : numOfBars > 100
                      ? .425
                      : numOfBars > 50
                      ? .7
                      : 1.5
                  }%`,
                }}
              ></div>
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

  changeArrayHandler(val) {
    numOfBars = val;
    this.resetArray();
  }

  changeTimeHandler(val) {
    animationSpeed = 11 - val;
  }

  sortPlay() {
    if (type === 1) {
      this.bubbleSort();
      this.handleMessages("This algorithm's time complexity is O(N^2)", "info");
    } else if (type === 2) {
      this.mergeSort();
      this.handleMessages("This algorithm's time complexity is O(N log N)", "info");
    } else if (type === 3) {
      this.selectionSort();
      this.handleMessages("This algorithm's time complexity is O(N^2)", "info");
    } else if (type === 4) {
      this.insertionSort();
      this.handleMessages("This algorithm's time complexity is O(N^2)", "info");
    } else if (type === 5) {
      this.quickSort();
      this.handleMessages("This algorithm's time complexity is O(N log N)", "info");
    } else if (type === 6) {
      this.heapSort();
      this.handleMessages("This algorithm's time complexity is O(N log N)", "info");
    } else {
      this.handleMessages("Invalid Option", "warning");
    }
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < numOfBars; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOne, barTwo] = animations[i];
        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOne, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][4] === "cmp") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * animationSpeed);
      } else if (animations[i][4] === "cmp2") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOne, barTwo] = [animations[i][0], animations[i][1]];
          const [newHeight1, newHeight2] = [animations[i][2], animations[i][3]];
          const [barOneStyle, barTwoStyle] = [
            arrayBars[barOne].style,
            arrayBars[barTwo].style,
          ];
          barOneStyle.height = `${newHeight1}px`;
          barTwoStyle.height = `${newHeight2}px`;
        }, i * animationSpeed);
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][4] === "cmp") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * animationSpeed);
      } else if (animations[i][4] === "cmp2") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOne, barTwo] = [animations[i][0], animations[i][1]];
          const [newHeight1, newHeight2] = [animations[i][2], animations[i][3]];
          const [barOneStyle, barTwoStyle] = [
            arrayBars[barOne].style,
            arrayBars[barTwo].style,
          ];
          barOneStyle.height = `${newHeight1}px`;
          barTwoStyle.height = `${newHeight2}px`;
        }, i * animationSpeed);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][2] === "cmp") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * animationSpeed);
      } else if (animations[i][2] === "cmp2") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const barOne = animations[i][0];
          const newHeight = animations[i][1];
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }

  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][2] === "cmp") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * animationSpeed);
      } else if (animations[i][2] === "cmp2") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const barOne = animations[i][0];
          const newHeight = animations[i][1];
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i][2] === "cmp") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * animationSpeed);
      } else if (animations[i][2] === "cmp2") {
        const barOneStyle = arrayBars[animations[i][0]].style;
        const barTwoStyle = arrayBars[animations[i][1]].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const barOne = animations[i][0];
          const newHeight = animations[i][1];
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
