'use strict'
var gCanvas = document.querySelector('#meme-canvas');
var gCtx = gCanvas.getContext('2d');
var gIdx = 0
var gSelected = 0





function onInit() {
    renderGallery()
    init()
}

function searchImg() {
    renderGallery();
}


function renderGallery() {
    var strHtml = ''
    var imgs = getImgsForDisplay()
    imgs.forEach(image => {
        strHtml += `<img src= "${image.url}" onclick="renderEditor(${image.id})" class= "img${image.id}"></img>`
    });
    var image = document.querySelector('.gallery-container')
    image.innerHTML = strHtml
}

function renderEditor(imageId) {
    var elControl = document.querySelector('.control-box')
    var elCan = document.querySelector('.canvas-container')
    elControl.classList.remove('hide')
    elCan.classList.remove('hide')
    var elGallery = document.querySelector('.gallery-container')
    elGallery.classList.add('hide')
    var elSearch = document.querySelector('.search')
    elSearch.classList.add('hide')
    getImg(imageId)
    dragVar()
}


function getImg(imgId) {
    gMeme.selectedImgId = imgId
    drawImg()
}
function drawImg() {
    var img = new Image()
    img.src = `./imgs/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function drawText(line) {
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = `${line.color}`
    gCtx.lineWidth = '2'
    gCtx.font = `${line.size}px ${gMeme.font}`
    gCtx.textAlign = `left`///should not be like this come back if u have time

    gCtx.fillText(line.txt, line.x1, line.y1)
    gCtx.strokeText(line.txt, line.x1, line.y1)
}

function onText(value) {
    if (gLines.length === 3) {
        gLines.splice(2, 1, createLine(value, 1))
    } else if (gLines.length === 2) {
        gLines.splice(1, 1, createLine(value, 2))
    } else if (gLines.length === 0 || gLines.length === 1) {
        gLines.splice(0, 1, createLine(value, 0))
    }
    console.log(gLines, 'gLines')
    drawImg()
    setTimeout(() => {
        renderLines(true)

    }, 50);
}


function drawTxt(x, y, idx) {
    if (gLines[idx].txt === '') drawImg()
    drawText(gLines[idx].txt, gLines[idx].x1, gLines[idx].y1)
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    document.querySelector('.top-text').value = ''
}


function clearedCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}


function onFontSize(num) {
    // clearedCanvas()
    drawImg();
    setTimeout(function () {
        gLines[gSelected].size += num
        gCtx.beginPath()
        renderLines(true)
    }, 50);

}
function onUp(idx) {
    // clearedCanvas()
    drawImg();
    setTimeout(function () {
        gLines[gSelected].y1 += -10
        gCtx.beginPath()
        renderLines(true)
    }, 50);
}
function onDown(idx) {
    drawImg();
    setTimeout(function () {
        gLines[gSelected].y1 += +10
        gCtx.beginPath()
        renderLines(true)

    }, 50);
}

function onDownload(elLink) {
    drawImg()
    setTimeout(() => {
        renderLines(false)
        const data = gCanvas.toDataURL()
        elLink.href = data
        elLink.download = 'meme.jpg'
    }, 150);
}

function onAddLine() {
    if (gSelected >= 2) return
    gLines.push('')
    document.querySelector('.top-text').value = ''
    console.log(gLines, 'glines')
    gSelected++
    
}

function onBack() {
    var elControl = document.querySelector('.control-box')
    var elCan = document.querySelector('.canvas-container')
    elControl.classList.add('hide')
    elCan.classList.add('hide')
    var elGallery = document.querySelector('.gallery-container')
    elGallery.classList.remove('hide')
    var elSearch = document.querySelector('.search')
    elSearch.classList.remove('hide')
    gLines=[]
    document.querySelector('.top-text').value = ''
}

function onDeleteLine() {
    gLines.splice(gSelected, 1)
    console.log(gLines)
    clearedCanvas()
    drawImg();
    setTimeout(() => {
        renderLines(true)
    }, 50);
    if (gSelected === 2) {
        gSelected = 0
    } else if (gSelected === 1) {
        gSelected = 0
    } else {
        gSelected = 0
    }
    ////finish later
}

function renderLines(renderRect) {
    var lines = getLinesForDisplay()
    lines.forEach(function (line) {
        drawText(line)
    })
    if (renderRect) {
        gCtx.beginPath()
        var currLine = gLines[gSelected]
        var width = gCtx.measureText(currLine.txt).width
        gCtx.rect(currLine.x1, currLine.y1 - currLine.size, width, currLine.size + 10);
        gCtx.stroke();
    }
}


function onSelectedLine() {
    gSelected++
    if (gSelected === 3) {
        gSelected = 0
    }
    console.log(gSelected, 'BEFORE gselected!!!')
    drawImg()
    setTimeout(() => {
        renderLines(true)
    }, 50);



}

function onAlign(alignBy) {///not the right way to align
    clearedCanvas()
    drawImg()
    setTimeout(() => {
        if (alignBy === 'center') {
            gMeme.align = 'center';
            gLines.forEach(line => {
                var widthX = gCtx.measureText(line.txt).width
                line.x1 = (gCanvas.width / 2) - (widthX / 2)
                console.log(line.x1)
            });
        } else if (alignBy === 'right') {
            gMeme.align = 'right';
            gLines.forEach(line => {
                var widthX = gCtx.measureText(line.txt).width
                line.x1 = (gCanvas.width / 2) + (gCanvas.width / 4)////come back later
                console.log(line.x1)
            });
        } else if (alignBy === 'left') {
            gMeme.align = 'left';
            gLines.forEach(line => {
                line.x1 = 50;
                console.log(line.x1)
            });
        }
        renderLines(true)
    }, 50);
}

function onChangeColor(val) {
    // var color=document.querySelector('.item13').value
    console.log(val)
    gLines[gSelected].color = val
    clearedCanvas()
    drawImg()
    setTimeout(() => {
        renderLines(true)

    }, 50);
}
function onChangeFont(val) {
    console.log(val)
    gMeme.font = val
    clearedCanvas()
    drawImg()
    setTimeout(() => {
        renderLines(true)

    }, 50);
}




function toggleMenu() {
    document.body.classList.toggle('menu-open')
}



///drag and drop!
var canvas;
var ctx;
var BB;
var offsetX;
var offsetY;
var WIDTH;
var HEIGHT;

function dragVar() {

    // canvas = document.getElementById("meme-canvas");
    console.log(gCanvas)
    ctx = gCanvas.getContext("2d");
    BB = gCanvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
    WIDTH = gCanvas.width;
    HEIGHT = gCanvas.height;
    console.log('offsets', offsetX, offsetY)
    console.log(BB)
    console.log('gCanvas', gCanvas)
    console.log(WIDTH, HEIGHT, 'width height')
    gCtx.beginPath()

}

// drag related variables
var dragok = false;
var startX;
var startY;

gCanvas.onmousedown = myDown;
gCanvas.onmouseup = myUp;
gCanvas.onmousemove = myMove;



function myDown(e) {
    // console.log('jdgfa')

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < gLines.length; i++) {
        var r = gLines[i];
        var width = parseInt(gCtx.measureText(r.txt).width)

        if (mx > r.x1 && mx < r.x1 + width && my > r.y1-r.size && my < r.y1 ) {
            console.log('AFTER condition','i:', i, r.x1, my, r.y1)
            // if yes, set that rects isDragging=true
            dragok = true;
            r.isDragging = true;
        }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
}


// handle mouseup events
function myUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    dragok = false;
    for (var i = 0; i < gLines.length; i++) {
        gLines[i].isDragging = false;
    }
    renderLines(true)
}


// handle mouse moves
function myMove(e) {
    // if we're dragging anything...
    if (dragok) {

        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);
        
        // calculate the distance the mouse has moved
        // since the last mousemove
        var dx = mx - startX;
        var dy = my - startY;
        console.log('my move',mx,my,dx,dy)

        // move each rect that isDragging 
        // by the distance the mouse has moved
        // since the last mousemove
        for (var i = 0; i < gLines.length; i++) {
            var r = gLines[i];
            if (r.isDragging) {
                console.log('mymove in for')
                console.log(gLines[i].x1,gLines[i].y1 ,'before')
                r.x1 += dx;
                r.y1 += dy;
                console.log(gLines[i].x1,gLines[i].y1,'after')
            }
            console.log(startY,'startY')
        }

        // redraw the scene with the new rect positions 
        drawImg()
        renderLines(true)
        
        // reset the starting mouse position for the next mousemove
        startX = mx;
        startY = my;

    }
}

