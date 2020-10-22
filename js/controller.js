'use strict'
var gCanvas = document.querySelector('#meme-canvas');
var gCtx = gCanvas.getContext('2d');
var gIdx = 0
var gSelected = 0

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

function renderEditor(imageId) {
    var elControl = document.querySelector('.control-box')
    var elCan = document.querySelector('.canvas-container')
    elControl.classList.remove('hide')
    elCan.classList.remove('hide')
    var elGallery = document.querySelector('.gallery-container')
    elGallery.classList.add('hide')
    getImg(imageId)
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
    gCtx.strokeStyle = gLines[0].color///change later by color
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '2'
    gCtx.font = `${gLines[0].size}px Impact`
    // gCtx.textAlign = 'start'
    gCtx.fillText(line.txt, line.x1, line.y1)
    gCtx.strokeText(line.txt, line.x1, line.y1)
}


function onText(value) {

    if (gLines.length === 3) {
        gLines.splice(2, 1, createLine(value, 2))
    } else if (gLines.length === 2) {
        gLines.splice(1, 1, createLine(value, 1))
    } else if (gLines.length === 0 || gLines.length === 1) {
        gLines.splice(0, 1, createLine(value, 0))
    }
    console.log(gLines, 'gLines')
    renderLines()
}

function onTopText(idx, value) {
    gLines[0] = createLine(value, idx)
    drawTxt(gLines[idx].x1, gLines[idx].y1, idx)
}
function onBottomText(idx, value) {
    var newFig = createLine(value, idx)
    gLines.splice(1, idx, newFig)
    drawTxt(gLines[idx].x1, gLines[idx].y1, idx)
}

function drawTxt(x, y, idx) {
    if (gLines[idx].txt === '') drawImg()
    drawText(gLines[idx].txt, gLines[idx].x1, gLines[idx].y1)
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
        console.log(gSelected)
        gLines[gSelected].size += num
        renderLines()
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
        gLines[gSelected].y1 += -10
        renderLines()
        // drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1)
        // drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1)
    }, 50);
}
function onDown(idx) {
    clearedCanvas()
    drawImg();
    setTimeout(function () {
        gLines[gSelected].y1 += +10
        // gMeme.lines[0].y1 += +10
        renderLines()
        // drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1 += 10)
        // drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1 += 10)

    }, 50);
}


function onDownload(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme.jpg'
}

function onAddLine() {
    gLines.push('')
    console.log(gLines, 'glines')
    var elLine = document.querySelector('.bottom-text')
    var elBot = document.querySelector('.bot')
    var strHtml = ''
    // elLine.classList.remove('hide')

    strHtml += `
        <input type="text" name="line2" class="bottom-text" oninput="onText(value)" placeholder="Line ${gLines.length}!"></input>
        <button onclick="onFontSize(2,${gMeme.selectedLineIdx})">+</button>
        <button onclick="onFontSize(-2,${gMeme.selectedLineIdx})">-</button>
        <button onclick="onChangeLine()">⬆ ⬇</button>
        <button onclick="onUp(${gMeme.selectedLineIdx})">Up⬆</button>
        <button onclick="onDown(${gMeme.selectedLineIdx})">Down⬇</button>
        <button onclick="clearCanvas()">Clear</button>
        <button onclick="clearText()">Clear TXT</button>
        <button><a href="#" onclick="onDownload(this)" download="">Download</a></button>
        <button onclick="onBack()">back to gallery</button> `
    elBot.innerHTML += strHtml
    gSelected++
}

function onBack() {
    var elControl = document.querySelector('.control-box')
    var elCan = document.querySelector('.canvas-container')
    elControl.classList.add('hide')
    elCan.classList.add('hide')
    var elGallery = document.querySelector('.gallery-container')
    elGallery.classList.remove('hide')
}

function onDeleteLine() {
    clearedCanvas()
    drawImg();

    ////finish later
}

function renderLines() {
    // console.log('render lines!')
    var lines = getLinesForDisplay()
    lines.forEach(function (line) {
        drawText(line)
    })
}


function onSelectedLine() {
    if (gSelected >= gLines.length) {
        gSelected = 0
        console.log(gSelected,'gselected!!!')
        return
    }
    gMeme.selectedLineIdx = gSelected
    gSelected++
    console.log(gSelected,'gselected!!!')
}