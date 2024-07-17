// script.js

let array = [];
let arraySize = 50;
let sortingSpeed = 50;
let showValues = false;

window.onload = () => {
    createArray();
    displayArray();
};

function createArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const arrayBar = document.createElement('div');
        arrayBar.classList.add('array-bar');
        arrayBar.style.height = `${value * 3}px`;  // Adjust the height scale factor if necessary
        if (showValues) {
            arrayBar.innerText = value;
            arrayBar.style.color = 'white';
            arrayBar.style.fontSize = '12px';
        }
        arrayContainer.appendChild(arrayBar);
    });
}

function updateSpeed(value) {
    sortingSpeed = 101 - value;
}

function updateArraySize(value) {
    arraySize = value;
    createArray();
}

function toggleArrayValues() {
    showValues = !showValues;
    displayArray();
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }

            await new Promise(resolve => setTimeout(resolve, sortingSpeed));

            bars[j].style.backgroundColor = '#4CAF50';
            bars[j + 1].style.backgroundColor = '#4CAF50';
        }
        bars[array.length - 1 - i].style.backgroundColor = 'green';
    }
    bars[0].style.backgroundColor = 'green';
}

async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) {
        if (start >= 0 && start < array.length) {
            const bars = document.getElementsByClassName('array-bar');
            bars[start].style.backgroundColor = 'green';
        }
        return;
    }

    const index = await partition(start, end);
    await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
}

async function partition(start, end) {
    const bars = document.getElementsByClassName('array-bar');
    let pivotIndex = start;
    const pivotValue = array[end];

    bars[end].style.backgroundColor = 'yellow';

    for (let i = start; i < end; i++) {
        bars[i].style.backgroundColor = 'red';
        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
            bars[pivotIndex].style.backgroundColor = '#4CAF50';
            pivotIndex++;
        }
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        bars[i].style.backgroundColor = '#4CAF50';
    }

    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
    bars[end].style.height = `${array[end] * 3}px`;
    bars[end].style.backgroundColor = '#4CAF50';
    bars[pivotIndex].style.backgroundColor = 'green';

    await new Promise(resolve => setTimeout(resolve, sortingSpeed));

    return pivotIndex;
}

async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) {
        return;
    }

    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.getElementsByClassName('array-bar');
    let leftArray = array.slice(start, mid + 1);
    let rightArray = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = `${array[k] * 3}px`;
            bars[k].style.backgroundColor = 'red';
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = `${array[k] * 3}px`;
            bars[k].style.backgroundColor = 'red';
            j++;
        }
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        bars[k].style.backgroundColor = '#4CAF50';
        k++;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        bars[k].style.backgroundColor = '#4CAF50';
        i++;
        k++;
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        bars[k].style.backgroundColor = '#4CAF50';
        j++;
        k++;
    }
}

async function heapSort() {
    const bars = document.getElementsByClassName('array-bar');
    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0] * 3}px`;
        bars[i].style.height = `${array[i] * 3}px`;
        bars[i].style.backgroundColor = 'green';
        await heapify(i, 0);
    }
    bars[0].style.backgroundColor = 'green';
}

async function heapify(n, i) {
    const bars = document.getElementsByClassName('array-bar');
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[largest].style.height = `${array[largest] * 3}px`;
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        await heapify(n, largest);
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j + 1].style.backgroundColor = 'red';

            await new Promise(resolve => setTimeout(resolve, sortingSpeed));

            bars[j].style.backgroundColor = 'green';
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[i].style.backgroundColor = 'green';
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'red';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = '#4CAF50';
                }
                minIndex = j;
            } else {
                bars[j].style.backgroundColor = '#4CAF50';
            }

            await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;
        }

        bars[minIndex].style.backgroundColor = '#4CAF50';
        bars[i].style.backgroundColor = 'green';
    }
    bars[array.length - 1].style.backgroundColor = 'green';
}
