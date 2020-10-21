'use strict'
console.log('controller');
var gCanvas = document.querySelector('#meme-canvas');
var gCtx = gCanvas.getContext('2d');
var gOl


function onInit() {
    renderGallery()
    init()
}

function renderGallery() {
    var strHtml = ''
    gImgs.forEach(image => {
        strHtml += `<img src= "${image.url}" onclick="getImg(${image.id})" class= "img${image.id}"></img>`
        // console.log(image.id)
    });
    var image = document.querySelector('.gallery-container')
    image.innerHTML = strHtml
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
    drawTxt(gMeme.lines[idx].x1,gMeme.lines[idx].y1,idx)
}
function onBottomText(idx, value) {
    var newFig={
        txt:value,
        size:48,
        align:'left',
        color:'black',
        x1: 50,
        y1:gCanvas.height-50,

    }
    gMeme.lines.splice(1,idx,newFig)
    console.log(gMeme.lines)
    drawTxt(gMeme.lines[idx].x1,gMeme.lines[idx].y1,idx)

    // if(gMeme.lines[idx].txt==='') drawImg()
}

function drawTxt(x,y,idx){
    if(gMeme.lines[idx].txt==='') drawImg()
    console.log(x,y)
    drawText(gMeme.lines[idx].txt, gMeme.lines[idx].x1, gMeme.lines[idx].y1)
}


function draw(ev) {////switch this
    const { offsetX, offsetY } = ev
    console.log(ev)
    drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1)
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    document.querySelector('.top-text').value='' 
    document.querySelector('.bottom-text').value='' 
}

// function clearText() {
//     gCtx.font = `${gMeme.lines[0].size} Impact`;
//     gCtx.fillStyle = "white";
//     console.log(gMeme.lines[0].x1, gMeme.lines[0].y1,'waiting!!!!!')
//     gCtx.fillText('fhiqgfiuq', gMeme.lines[0].x1, gMeme.lines[0].y1);
// }











function clearedCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}



function onFontSize(num) {
    clearedCanvas()
    drawImg();
    setTimeout(function(){ gMeme.lines[0].size += num
        gMeme.lines[1].size += num
        drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1) 
        drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1) 
    }, 50);
    
    
}
////find a way to sent idx
function onUp() {
    clearedCanvas()
    drawImg();
   
    setTimeout(function(){ gMeme.lines[0].y1 += -10
        gMeme.lines[1].y1 += -10
        drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1) 
        drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1) 
    }, 50);
}
function onDown() {
    clearedCanvas()
    drawImg();
    setTimeout(function(){ gMeme.lines[0].y1 += +10
        drawText(gMeme.lines[0].txt, gMeme.lines[0].x1, gMeme.lines[0].y1 += 10) 
        drawText(gMeme.lines[1].txt, gMeme.lines[1].x1, gMeme.lines[1].y1 += 10) 
    
    }, 50);
}

function onDeleteLine(){
    clearedCanvas()
    drawImg();

////finish later
}