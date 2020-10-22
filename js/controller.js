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
    gCtx.strokeStyle = line.color
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '2'
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = `${line.align}`

    gCtx.fillText(line.txt, line.x1, line.y1)
    gCtx.strokeText(line.txt, line.x1, line.y1)
    // gCtx.rect(textW.width,50,line.x1,line.y1);
    // gCtx.stroke();
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
        // gMeme.lines[0].y1 += -10
        // gMeme.lines[1].y1 += -10
        gLines[gSelected].y1 += -10
        gCtx.beginPath()
        renderLines(true)
        // drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1)
        // drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1)
    }, 50);
}
function onDown(idx) {
    // clearedCanvas()
    drawImg();
    setTimeout(function () {
        gLines[gSelected].y1 += +10
        // gMeme.lines[0].y1 += +10
        gCtx.beginPath()
        renderLines(true)
        // drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1 += 10)
        // drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1 += 10)

    }, 50);
}

function onDownload(elLink) {
    drawImg()
    setTimeout(() => {
        renderLines(false)
        const data = gCanvas.toDataURL()
        elLink.href = data
        elLink.download = 'meme.jpg'
    }, 50);
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
}

function onDeleteLine() {
    clearedCanvas()
    drawImg();
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
        gCtx.rect(currLine.x1, currLine.y1 - currLine.size, width, currLine.size);
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
        // gCtx.beginPath()
        renderLines(true)
        // var currLine = gLines[gSelected]
        // var width = gCtx.measureText(currLine.txt).width
        // gCtx.rect(currLine.x1, currLine.y1 - currLine.size, width, currLine.size);
        // gCtx.stroke();
        // console.log(currLine.x1, currLine.y1, width, currLine.size);

    }, 50);



}







// draw()

// function draw() {
//     // const offsetX = ev.offsetX
//     // const offsetY = ev.offsetY
//     const { offsetX, offsetY } = gCanvas
//     console.log(offsetX,offsetY,'offsets!!!!')
//     // console.log(offsetX, offsetY)
//     // switch (gCurrShape) {
//     //     case 'triangle':
//     //         drawTriangle(offsetX, offsetY)
//     //         break;
//     //     case 'rect':
//     //         drawRect(offsetX, offsetY)
//     //         break;
//     //     ///can put prompt to read input
//     //     case 'text':
//     //         drawText('Puki', offsetX, offsetY)
//     //         break;
//     //     case 'line':
//     //         drawLine(offsetX, offsetY)
//     //         break;
//     // }
// }

















// <button onclick="onFontSize(2,${gMeme.selectedLineIdx})">+</button>
//         <button onclick="onFontSize(-2,${gMeme.selectedLineIdx})">-</button>
//         <button onclick="onSelectedLine()">⬆ ⬇</button>
//         <button onclick="onUp(${gMeme.selectedLineIdx})">Up⬆</button>
//         <button onclick="onDown(${gMeme.selectedLineIdx})">Down⬇</button>
//         <button onclick="clearCanvas()">Clear</button>
//         <button onclick="clearText()">Clear TXT</button>
//         <button><a href="#" onclick="onDownload(this)" download="">Download</a></button>
//         <button onclick="onBack()">back to gallery</button> `



// function onTopText(idx, value) {
//     gLines[0] = createLine(value, idx)
//     drawTxt(gLines[idx].x1, gLines[idx].y1, idx)
// }
// function onBottomText(idx, value) {
//     var newFig = createLine(value, idx)
//     gLines.splice(1, idx, newFig)
//     drawTxt(gLines[idx].x1, gLines[idx].y1, idx)
// }
