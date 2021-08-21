const svgns = "http://www.w3.org/2000/svg";
const svg = document.querySelector("svg");
const group = document.getElementById("array")
let done = false

let array = []

for (let index = 0; index < 10; index++) {
    randInt = Math.floor(Math.random() * 100) - 50
    array.push(randInt)
    
}

array.sort()
svg.setAttribute("width", 80*array.length+1) 
setup(0,10,20,70)

function start() {
    let searchFor = document.getElementById("searchfor")
    let k = searchFor.value

    if (k == ""){
        alert("must be filled out");
        return false
    }

    if (done == true){
        let searchFor = document.getElementById("searchfor")
        let k = searchFor.value
        let newArray = array
        window.location.reload()
        console.log(k)
        array = newArray
        done = false
        start()
    }

    if (done == false){
        done = true;
        submitButton = document.getElementById("submit");
        submitButton.style.visibility = "hidden";
    }
    let searchAlgorithm = document.getElementById('options').value
    if (searchAlgorithm == "binary"){
        array = array.sort()
        binarySearch(array, k)
        return false

    }else if(searchAlgorithm == "linear"){
        linearSearch(array, k)
        return false
    }
}

async function setup(rectx, recty, textx, texty) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        let newRect = rect(rectx, recty, 80, 80);
        group.appendChild(newRect);

        let newText = text(textx, texty, element);
        group.appendChild(newText);

        rectx+=81
        textx+=81
    }
    await sleep(1000)
}

async function binarySearch(array) {
    let rects = document.getElementsByTagName('rect')
    let numbers = document.getElementsByTagName('text')
    let searchFor = document.getElementById("searchfor")
    let k = searchFor.value
    let low = 0;
    let high = array.length;
    let middle = Math.floor(array.length / 2);
    
    while (high>=low) {
        rects[middle].setAttribute("fill", "blue")
        await sleep(1000)
        if (array[middle] == k){
            rects[middle].setAttribute("fill", "green");
            rects[middle].setAttribute('transform','translate(30,100)');
            numbers[middle].setAttribute('transform','translate(30,100)');
            return true
        }
        else if (k > array[middle]){
            low = middle+1
        }
        else if (k < array[middle]){
            high = middle-1
        }
        middle = Math.floor((low + high) / 2);
        discard(low, high, rects)
    }
    return false
    
}

async function linearSearch(array) {
    let searchFor = document.getElementById("searchfor")
    let k = searchFor.value
    let rects = document.getElementsByTagName('rect')
    let numbers = document.getElementsByTagName('text')
    for (let i = 0; i < array.length; i++) {
        await sleep(1000)
        rects[i].setAttribute("fill", "orange")
        if (array[i] == k){
            rects[i].setAttribute("fill", "green");
            rects[i].setAttribute('transform','translate(30,100)');
            numbers[i].setAttribute('transform','translate(30,100)');
            return;
        }
        
    }alert(`${k} not found`)
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


function rect(rectx, recty, width, height) {
    let newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    newRect.setAttribute("x", rectx);
    newRect.setAttribute("y", recty);
    newRect.setAttribute("width", width);
    newRect.setAttribute("height", height);
    newRect.setAttribute("fill", "red");
    return newRect;
}

function text(textx, texty, content) {
    let newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    newText.setAttribute("x", textx);
    newText.setAttribute("y", texty);
    newText.setAttribute("fill", "black");
    newText.setAttribute("font-size", 30);
    newText.setAttribute("font-family", 'arial');
    newText.setAttribute("font-weight", "bold");
    newText.textContent = content;
    return newText;
}


function discard(low, high, rects) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (i<low || i>high){
            rects[i].setAttribute("fill", "darkgray")
        }
        else{
            rects[i].setAttribute("fill", "orange")
        }
    }
}
