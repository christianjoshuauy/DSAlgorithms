export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  const arr = array.slice();
  mergeSortHelper(auxArray, 0, array.length - 1, arr, animations);
  return animations;
}

function mergeSortHelper(mainArray, left, right, arr, animations) {
  if (left === right) return;
  const mid = Math.floor((left + right) / 2);
  mergeSortHelper(arr, left, mid, mainArray, animations);
  mergeSortHelper(arr, mid + 1, right, mainArray, animations);
  doMerge(mainArray, left, mid, right, arr, animations);
}

function doMerge(mainArray, left, mid, right, arr, animations) {
  let k = left;
  let i = left;
  let j = mid + 1;
  while (i <= mid && j <= right) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (arr[i] <= arr[j]) {
      animations.push([k, arr[i]]);
      mainArray[k++] = arr[i++];
    } 
    else {
      animations.push([k, arr[j]]);
      mainArray[k++] = arr[j++];
    }
  }
  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, arr[i]]);
    mainArray[k++] = arr[i++];
  }
  while (j <= right) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, arr[j]]);
    mainArray[k++] = arr[j++];
  }
}

export function getInsertionSortAnimations(array){
  const animations = [];
  if(array.length <= 1) return array;
  const arr = array.slice();
  // Start Insertion Sort
  for(let i = 1; i < arr.length; i++){
    let key = arr[i];
    let j = i - 1;
    while(key < arr[j] && j >= 0){
      // Push Animations
      animations.push([j + 1, j, 'cmp']);
      animations.push([j + 1, j, 'cmp2']);
      animations.push([j + 1, arr[j], 'swap']);

      arr[j + 1] = arr[j];
      j--;
    }
    //End While Push for Animations
    animations.push([j + 1, i, 'cmp']);
    animations.push([j + 1, i, 'cmp2']);
    animations.push([j + 1, key, 'swap']);

    arr[j + 1] = key;
  }
  return animations;
}

export function getBubbleSortAnimations(array){
  const animations = [];
  if(array.length <= 1) return array;
  const arr = array.slice();
  //Start Bubble Sort
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length - i; j++){
      // Push compare animation
      if(arr[j] > arr[j + 1]){
        animations.push([j, j + 1, 'cmp']);
        animations.push([j, j + 1, 'cmp2']);
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      // Push Swap animation
      animations.push([j, arr[j], 'swap']);
    }
  }
  return animations;
}

export function getSelectionSortAnimations(array) {
  const animations = [];
  if(array.length <= 1) return array;
  const arr = array.slice();
  //Start Selection Sort
  for(let i = 0; i < arr.length; i++){
    let smallest = i, temp;
    for(let j = i + 1; j < arr.length; j++){
      animations.push([j, smallest, 'cmp']);
      animations.push([j, smallest, 'cmp2']);
      if(arr[j] < arr[smallest])
        smallest = j;
    }
    temp = arr[i];
    arr[i] = arr[smallest];
    arr[smallest] = temp;
    animations.push([i, smallest, 'cmp']);
    animations.push([i, smallest, 'cmp2']);
    animations.push([i, arr[i], 'swap']);
    animations.push([smallest, arr[smallest], 'swap']);
  }
  return animations;
}

export function getQuickSortAnimations(array){
  const animations = [];
  if(array.length <= 1) return array;
  const arr = array.slice();
  //Start QuickSort
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSortHelper(arr, left, right, animations){
  if(left < right) {
    const idx = partition(arr, left, right, animations);
    quickSortHelper(arr, left, idx - 1, animations);
    quickSortHelper(arr, idx + 1, right, animations);
  }
}

function partition(arr, left, right, animations){
  let idx = left;
  const pivot = arr[right];
  for(let i = left; i < right; i++){
    animations.push([idx, i, arr[idx], arr[i], 'cmp']);
    animations.push([idx, i, arr[idx], arr[i], 'cmp2']);
    if(arr[i] <= pivot){
      const temp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = temp;
      animations.push([idx, i, arr[idx], arr[i], 'swap']);
      idx++;
    }
  }
  animations.push([idx, right, arr[idx], arr[right], 'cmp']);
  animations.push([idx, right, arr[idx], arr[right], 'cmp2']);
  const temp = arr[idx];
  arr[idx] = arr[right];
  arr[right] = temp;
  animations.push([idx, right, arr[idx], arr[right], 'swap']);
  return idx;
}

export function getHeapSortAnimations(array){
  const animations = [];
  if(array.length <= 1) return array;
  const arr = array.slice();
  // Start HeapSort
  for(let i = Math.floor(arr.length / 2) - 1; i >= 0; i--){
    heapify(arr, arr.length, i, animations);
  }
  for(let i = arr.length - 1; i >= 0; i--){
    animations.push([0, i, arr[0], arr[i], 'cmp']);
    animations.push([0, i, arr[0], arr[i], 'cmp2']);
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    animations.push([0, i, arr[0], arr[i], 'swap']);
    heapify(arr, i, 0, animations);
  }
  return animations;
}

function heapify(arr, len, i, animations){
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  // comparing animations
  if(left < len){
    animations.push([left, largest, arr[left], arr[largest], 'cmp']);
    animations.push([left, largest, arr[left], arr[largest], 'cmp2']);
    if(arr[left] > arr[largest])
      largest = left;
  }
  // comparing animations
  if(right < len){
    animations.push([right, largest, arr[right], arr[largest], 'cmp']);
    animations.push([right, largest, arr[right], arr[largest], 'cmp2']);
    if(arr[right] > arr[largest])
      largest = right;
  }
  // comparing animation
  animations.push([largest, i, arr[largest], arr[i], 'cmp']);
  animations.push([largest, i, arr[largest], arr[i], 'cmp2']);
  if(largest !== i) {
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    animations.push([largest, i, arr[largest], arr[i], 'swap']);
    heapify(arr, len, largest, animations);
  }
}