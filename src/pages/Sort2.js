import React, { Component } from "react";
import Cardcontainer, { setCode } from "../components/Cardcontainer";
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
const bubbleCode = 
`void bubbleSort(int *arr, int len){
  int temp;
  for(int i=0; i < len; i++){
    for(int j=0; j < len - i; j++){
      if(arr[j]>arr[j+1]){
        temp=arr[j];
        arr[j]=arr[j+1];
        arr[j+1]=temp;
      }
    }
  }
}`;
const mergeCode = 
`void mergeSort(int *arr, int start, int end){
  if(start<end){
    int mid=(start+end)/2;
    mergeSort(arr, start, mid);
    mergeSort(arr, mid+1, end);
    merge(arr, start, mid, end);
  }
}

void merge(int *arr, int start, int mid, int end){
  int temp[end-start+1];
  int i=start, j=mid+1, k=0;
  while(i<=mid&&j<=end){
    if(arr[i]<=arr[j])
      temp[k++]=arr[i++];
    else
      temp[k++]=arr[j++];
  }
  while(i<=mid)
    temp[k++]=arr[i++];
  while(j<=end)
    temp[k++]=arr[j++];
  for(int l=start; l<=end; l++)
    arr[l]=temp[l-start];
}`;
const selectionCode = 
`void selectionSort(int *arr, int len){
  int temp;
  for(int i=0; i<len; i++){
    int smallest=i;
    for(int j=i+1; j<len; j++){
      if(arr[j]<arr[smallest])
        smallest=j;
    }
    temp=arr[i];
    arr[i]=arr[smallest];
    arr[smallest]=temp;
  }
}`;
const insertionCode = 
`void insertionSort(int *arr, int len){
  for(int i=1; i<len; i++){
    int key=arr[i];
    int j=i-1;
    while(key<arr[j] && j>=0){
      arr[j+1]=arr[j];
      j--;
    }
    arr[j+1]=key;
  }
}`;
const quickCode = 
`void quickSort(int arr[], int start, int end){
    if (start >= end)
        return;
    int p = partition(arr, start, end);
    quickSort(arr, start, p - 1);
    quickSort(arr, p + 1, end);
}

int partition(int arr[], int start, int end)
{
    int pivot = arr[start];
    int count = 0;
    for (int i = start + 1; i <= end; i++) {
        if (arr[i] <= pivot)
            count++;
    }
    int pivotIndex = start + count;
    swap(arr[pivotIndex], arr[start]);
    int i = start, j = end;
    while (i < pivotIndex && j > pivotIndex) {
        while (arr[i] <= pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i < pivotIndex && j > pivotIndex) {
            swap(arr[i++], arr[j--]);
        }
    }
    return pivotIndex;
}`;
const heapCode = 
`void heapSort(int arr[], int n){
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i >= 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

void heapify(int arr[], int n, int i)
{
    int largest = i; // Initialize largest as root
    int l = 2 * i + 1; // left
    int r = 2 * i + 2; // right
    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}`;

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
                  height: `${value}%`,
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
      setCode(bubbleCode);
      this.bubbleSort();
      this.handleMessages("This algorithm's time complexity is O(N^2)", "info");
    } else if (type === 2) {
      setCode(mergeCode);
      this.mergeSort();
      this.handleMessages("This algorithm's time complexity is O(N log N)", "info");
    } else if (type === 3) {
      setCode(selectionCode);
      this.selectionSort();
      this.handleMessages("This algorithm's time complexity is O(N^2)", "info");
    } else if (type === 4) {
      setCode(insertionCode);
      this.insertionSort();
      this.handleMessages("This algorithm's time complexity is O(N^2)", "info");
    } else if (type === 5) {
      setCode(quickCode);
      this.quickSort();
      this.handleMessages("This algorithm's time complexity is O(N log N)", "info");
    } else if (type === 6) {
      setCode(heapCode);
      this.heapSort();
      this.handleMessages("This algorithm's time complexity is O(N log N)", "info");
    } else {
      this.handleMessages("Invalid Option", "warning");
    }
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < numOfBars; i++) {
      array.push(randomIntFromInterval(2, 80));
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
          barOneStyle.height = `${newHeight}%`;
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
          barOneStyle.height = `${newHeight1}%`;
          barTwoStyle.height = `${newHeight2}%`;
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
          barOneStyle.height = `${newHeight1}%`;
          barTwoStyle.height = `${newHeight2}%`;
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
          barOneStyle.height = `${newHeight}%`;
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
          barOneStyle.height = `${newHeight}%`;
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
          barOneStyle.height = `${newHeight}%`;
        }, i * animationSpeed);
      }
    }
  }
}

function randomIntFromInterval(min, max) {
  return Math.random() * (max - min + 1) + min;
}