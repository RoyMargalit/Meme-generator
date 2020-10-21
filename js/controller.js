'use strict'
console.log('controller');


function onInit() {
    init()
    renderGallery()
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

function getImg(imgId){
    console.log(imgId)
    gMeme.selectedImgId=imgId
    console.log(gMeme)
    drawImg()
}
function drawImg() {
    var img = new Image()
    img.src = `./imgs/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
    //HERE STANDS A 0 BUT LATER THAT WILL CHANGE SINCE THE LINE WILL BE PROMPT
}

function drawText(text,x,y){
    console.log('drawing........')
    console.log(x,y)
    gCtx.strokeStyle = 'red'///change later by color
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '2'
    gCtx.font = `${gMeme.lines[0].size}px Impact`
    console.log(gMeme.lines[0].size)
    // gCtx.textAlign = 'start'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y) 
}


function draw(ev){
    const { offsetX, offsetY } = ev
    console.log(ev)
    drawText(gMeme.lines[0].txt,50,100)
}

function onInputText(value){
    console.log(value)
   gMeme.lines[0].txt=value
   console.log(gMeme.lines[0].txt)
}
