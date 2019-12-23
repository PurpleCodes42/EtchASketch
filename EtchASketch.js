 /* JS here */
 const container = document.querySelector('#container');
 const contWidth = container.offsetWidth;
 const contHeight = container.offsetHeight;

 const buttonClear = document.querySelector("#clear");
 buttonClear.addEventListener("click", blankGrid);

 const buttonPix = document.querySelector("#pixels");
 buttonPix.addEventListener("click", setPixels);

 const buttonRan = document.querySelector("#random");
 buttonRan.addEventListener("click", setRandomColor);

 const buttonNewCol = document.querySelector("#newColors");
 buttonNewCol.addEventListener("click", refreshColors);

 const buttonGrey = document.querySelector("#grey");
 buttonGrey.addEventListener("click", setGrayScale);

 createDiv(16);
 createColorPalette();
 startDraw("rgba(0, 0, 0, 1");

 /* creation of all the squares etc.*/

 function createDiv(pixelRow){
    let divWidth = contWidth/pixelRow + "px";
    let divHeight = contWidth/pixelRow + "px";

    container.style.gridTemplateColumns = `repeat(${pixelRow}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${pixelRow}, 1fr)`;

     for (let j = 0; j < pixelRow; j++){
         for (let i = 0; i< pixelRow; i++){ 
            const div = document.createElement('div');
            div.style.width = divWidth;
            div.style.height = divHeight;
            changeColor(div, "rgba(255, 255, 255, 1)");
            div.classList.add("grids");
            container.appendChild(div);
         }
     }
 }
 
 function createColorPalette(){
     let divWidth = contWidth/10 + "px";
     let divHeight = contWidth/10 + "px";

     colorPalette.style.gridTemplateColumns = `repeat(10, 1fr)`;

     for (let i = 0; i<10; i++){
         const div = document.createElement("div");
         div.style.width = divWidth;
         div.style.height = divHeight;
         div.style.backgroundColor = random_rgba();
         div.classList.add("diffColors");
         colorPalette.appendChild(div);
     }
     putColorListeners();
 }

 function putColorListeners(){  
    const diffColors = document.querySelectorAll(".diffColors"); 
    grids = getGrids();   
    diffColors.forEach(diffColors => diffColors.addEventListener(
        "mouseover", 
        function () {
            startDraw(diffColors.style.backgroundColor);
        },
    ));
}

 /*functions for the buttons*/

 /* generally useful */

 function getGrids() {
     const grids = document.querySelectorAll(".grids");
     return grids;    
 }

 function changeColor(grids, color){
    grids.style.backgroundColor = color;
}

function removeListeners(){
    grids.forEach(grids => grids.removeEventListener("mouseover", grey));
    grids.forEach(grids => grids.removeEventListener("mouseover", rand));
 }

function startDraw(color){  
    removeListeners();
    grids = getGrids();    
    grids.forEach(grids => grids.addEventListener(
        "mouseover", 
        function test() {
            changeColor(grids, color);
            grids.removeEventListener("mouseover", test);
        },
    ));    
}

/* Clear Button */

function blankGrid(){
    grids = getGrids(); 
    grids.forEach(grids => grids.style.backgroundColor = changeColor(grids, "white"));  
}

/* Refresh Button */

 function refreshColors(){
     const palette = document.querySelectorAll(".diffColors");
     palette.forEach(palette => palette.remove());  
     createColorPalette();
     putColorListeners();
 }

/* Set Pixel Button */
 
 function setPixels(){
     clearGrid();
     let pixelsInARow = window.prompt("how many pixs shall the new grid " +
         "have on each side?");
     createDiv(pixelsInARow); 
     startDraw("rgba(0, 0, 0, 1");
 }

 function clearGrid() {
    grids = getGrids(); 
    grids.forEach(grids => grids.remove());  
}

/* All Random Stuff */

function rand(event) {
    changeColor(event.target, random_rgba());
 }

 function setRandomColor(){  
    removeListeners();
    grids = getGrids();    
    grids.forEach(grids => grids.addEventListener("mouseover", rand));
 }

 function random_rgba() {
 var o = Math.round, r = Math.random, s = 255;
 return 'rgba(' + o(r()*s) + ',' +
     o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
 }

 /* Grey Scale */
 
 function grey(event){
    var r = event.target.style.backgroundColor.split(',')[0];
            r = r.slice(5);
            r = parseFloat(r);
            var g = parseFloat(event.target.style.backgroundColor.split(',')[1]);
            var b = parseFloat(event.target.style.backgroundColor.split(',')[2]);
            var a = parseFloat(event.target.style.backgroundColor.split(',')[3]);
            if (r == 64 && g == 64 && b == 64){
                if (isNaN(a)){
                    changeColor(event.target, "rgba(64, 64, 64, 0.1)");  
                }
                else if (a == 0.9){
                    return;
                }
                else {
                    a2 = a + 0.1;
                    changeColor(event.target, "rgba(64, 64, 64, " + a2 + ")");  
                }
            }
            else {
                changeColor(event.target, "rgba(64, 64, 64, 0.1)"); 
            }
 }

 function setGrayScale(){
     removeListeners();
     grids = getGrids();    
     grids.forEach(grids => grids.addEventListener("mouseover", grey));
 }

 