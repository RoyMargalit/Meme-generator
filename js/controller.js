'use strict'
console.log('controller');
var gCanvas = document.querySelector('#meme-canvas');
var gCtx = gCanvas.getContext('2d');
var gIdx=0


function onInit() {
    renderGallery()
    init()
}

function renderGallery() {
    var strHtml = ''
    gImgs.forEach(image => {
        strHtml += `<img src= "${image.url}" onclick="renderEditor(${image.id})" class= "img${image.id}"></img>`
    });
    var image = document.querySelector('.gallery-container')
    image.innerHTML = strHtml
}

function renderEditor(imageId){
    var elControl=document.querySelector('.control-box')
    var elCan=document.querySelector('.canvas-container')
    elControl.classList.remove('hide')
    elCan.classList.remove('hide')
    var elGallery=document.querySelector('.gallery-container')
    elGallery.classList.add('hide')
    getImg(imageId)
}



function getImg(imgId) {
    console.log(imgId)
    gMeme.selectedImgId = imgId
    console.log(gMeme)
    drawImg()
}
function drawImg() {
    console.log('drawing');
    var img = new Image()
    img.src = `./imgs/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function drawText(text, x, y) {
    gCtx.strokeStyle = gMeme.lines[0].color///change later by color
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '2'
    gCtx.font = `${gMeme.lines[0].size}px Impact`
    console.log(gMeme.lines[0].size)
    // gCtx.textAlign = 'start'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}



function onTopText(idx, value) {
    gTopText = value
    gMeme.lines[idx].txt = value
    drawTxt(gMeme.lines[idx].x1, gMeme.lines[idx].y1, idx)
}
function onBottomText(idx, value) {
    var newFig = {
        txt: value,
        size: 48,
        align: 'left',
        color: 'black',
        x1: 50,
        y1: gCanvas.height - 50,

    }
    gMeme.lines.splice(1, idx, newFig)
    console.log(gMeme.lines)
    drawTxt(gMeme.lines[idx].x1, gMeme.lines[idx].y1, idx)

    // if(gMeme.lines[idx].txt==='') drawImg()
}

function drawTxt(x, y, idx) {
    if (gMeme.lines[idx].txt === '') drawImg()
    console.log(x, y)
    drawText(gMeme.lines[idx].txt, gMeme.lines[idx].x1, gMeme.lines[idx].y1)
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    document.querySelector('.top-text').value = ''
    document.querySelector('.bottom-text').value = ''
}


function clearedCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}


////find a way to sent idx

function onFontSize(num, idx) {
    clearedCanvas()
    drawImg();
    setTimeout(function () {
        // gMeme.lines[0].size += num
        // gMeme.lines[1].size += num
        gMeme.lines[gIdx].size += num
        drawText(gMeme.lines[gIdx].txt, gMeme.lines[gIdx].x1, gMeme.lines[gIdx].y1)
        // drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1)
        // drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1)
    }, 50);


}
function onUp(idx) {
    clearedCanvas()
    drawImg();
    setTimeout(function () {
        // gMeme.lines[0].y1 += -10
        // gMeme.lines[1].y1 += -10
        gMeme.lines[gIdx].y1 += -10
        drawText(gMeme.lines[gIdx].txt, gMeme.lines[gIdx].x1, gMeme.lines[gIdx].y1)
        // drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1)
        // drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1)
    }, 50);
}
function onDown(idx) {
    clearedCanvas()
    drawImg();
    setTimeout(function () {
        gMeme.lines[gIdx].y1 += +10
        // gMeme.lines[0].y1 += +10
        drawText(gMeme.lines[gIdx].txt, gMeme.lines[gIdx].x1, gMeme.lines[gIdx].y1 += 10)
        // drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1 += 10)
        // drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1 += 10)

    }, 50);
}


function onDownload(elLink) {
    const data = gCanvas.toDataURL()
    console.log(data);
    elLink.href = data
    elLink.download = 'meme.jpg'
}

function onAddLine() {
    var elLine = document.querySelector('.bottom-text')
    var elBot = document.querySelector('.bot')
    console.log(elLine)

    var strHtml = ''
    // console.log(strHtml)
    elLine.classList.remove('hide')
    // var idx=0
    gMeme.lines.forEach(function(line,idx) {
        console.log(idx)        
        strHtml += `<button onclick="onFontSize(2,${gIdx})">+</button>
        <button onclick="onFontSize(-2,${gIdx})">-</button>
        <button onclick="onChangeLine()">⬆ ⬇</button>
        <button onclick="onUp(${gIdx})">Up⬆</button>
        <button onclick="onDown(${gIdx})">Down⬇</button>
        <button onclick="clearCanvas()">Clear</button>
        <button onclick="clearText()">Clear TXT</button>
        <button><a href="#" onclick="onDownload(this)" download="">Download</a></button>
        <button onclick="onAddLine()">Add Line</button> 
        <button onclick="onBack()">back to gallery</button> `
        console.log(gIdx)
        idx++
        gIdx++
        console.log(idx)
    });

    elBot.innerHTML += strHtml
}

function onBack(){
    var elControl=document.querySelector('.control-box')
    var elCan=document.querySelector('.canvas-container')
    elControl.classList.add('hide')
    elCan.classList.add('hide')
    var elGallery=document.querySelector('.gallery-container')
    elGallery.classList.remove('hide')
}

















function onDeleteLine() {
    clearedCanvas()
    drawImg();

    ////finish later
}
