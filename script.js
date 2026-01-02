let array = [];
const SIZE = 20;
const DELAY = 200;
let isSorted = false;

/* Utility Functions */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray() {
    array = [];
    isSorted = false;

    for (let i = 0; i < SIZE; i++) {
        array.push(Math.floor(Math.random() * 90) + 10);
    }
    renderArray();
}

function renderArray() {
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    array.forEach(value => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${value * 2}px`;
        container.appendChild(bar);
    });
}

/* Sorting Algorithms */

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
                bars = document.getElementsByClassName("bar");
                await sleep(DELAY);
            }

            bars[j].style.backgroundColor = "#22c55e";
            bars[j + 1].style.backgroundColor = "#22c55e";
        }
    }
    isSorted = true;
}

async function selectionSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = "blue";

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = "red";
            await sleep(DELAY);

            if (array[j] < array[minIndex]) {
                bars[minIndex].style.backgroundColor = "#22c55e";
                minIndex = j;
                bars[minIndex].style.backgroundColor = "blue";
            } else {
                bars[j].style.backgroundColor = "#22c55e";
            }
        }

        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        renderArray();
        bars = document.getElementsByClassName("bar");
        await sleep(DELAY);
    }
    isSorted = true;
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            renderArray();
            await sleep(DELAY);
        }
        array[j + 1] = key;
        renderArray();
        await sleep(DELAY);
    }
    isSorted = true;
}

/* Searching Algorithms */

async function linearSearch() {
    const value = parseInt(document.getElementById("searchValue").value);
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = "red";
        await sleep(DELAY);

        if (array[i] === value) {
            bars[i].style.backgroundColor = "yellow";
            alert(`Value found at index ${i}`);
            return;
        }
        bars[i].style.backgroundColor = "#22c55e";
    }
    alert("Value not found");
}

async function binarySearch() {
    if (!isSorted) {
        alert("Please sort the array before Binary Search!");
        return;
    }

    const value = parseInt(document.getElementById("searchValue").value);
    let bars = document.getElementsByClassName("bar");

    let low = 0, high = array.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        bars[mid].style.backgroundColor = "red";
        await sleep(DELAY);

        if (array[mid] === value) {
            bars[mid].style.backgroundColor = "yellow";
            alert(`Value found at index ${mid}`);
            return;
        }

        bars[mid].style.backgroundColor = "#22c55e";

        if (array[mid] < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    alert("Value not found");
}

/* Initial Load */
generateArray();
