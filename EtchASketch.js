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

 function getGrids() {
     const grids = document.querySelectorAll(".grids");
     return grids;    
 }

 function refreshColors(){
     const palette = document.querySelectorAll(".diffColors");
     palette.forEach(palette => palette.remove());  
     createColorPalette();
     putColorListeners();
 }



 function changeColor(grids, color){
     grids.style.backgroundColor = color;
 }

 function blankGrid(){
     grids = getGrids(); 
     grids.forEach(grids => grids.style.backgroundColor = changeColor(grids, "white"));  
     startDraw("rgba(0, 0, 0, 1");
 }

 function clearGrid() {
     grids = getGrids(); 
     grids.forEach(grids => grids.remove());  
 }
 
 function setPixels(){
     clearGrid();
     let pixelsInARow = window.prompt("how many pixs shall the new grid " +
         "have on each side?");
     createDiv(pixelsInARow); 
     startDraw("rgba(0, 0, 0, 1");
 }

 function startDraw(color){  
     grids = getGrids();    
     grids.forEach(grids => grids.addEventListener(
         "mouseover", 
         function test() {
             changeColor(grids, color);
             grids.removeEventListener("mouseover", test);
         },
     ));    
 }

 function setRandomColor(){  
     grids = getGrids();    
     grids.forEach(grids => grids.addEventListener(
         "mouseover", 
         function test() {
             changeColor(grids, random_rgba());
             grids.removeEventListener("mouseover", test);
         },
     ));
 }

 function random_rgba() {
 var o = Math.round, r = Math.random, s = 255;
 return 'rgba(' + o(r()*s) + ',' +
     o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
 }

 function setGrayScale(){
     grids = getGrids();    
     grids.forEach(grids => grids.addEventListener(
         "mouseover", 
         function test() {
             var alpha = parseFloat(grids.style.backgroundColor.split(',')[3]);
             if (isNaN(alpha)){
                 changeColor(grids, "rgba(64, 64, 64, 0.1)");  
             }
             else if (alpha == 1){
                 return;  
             }
             else {
                 alpha2 = alpha + 0.1;
                 changeColor(grids, "rgba(64, 64, 64, " + alpha2 + ")");  
             }     
         },
     ));
 }