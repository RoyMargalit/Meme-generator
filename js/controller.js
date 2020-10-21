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
}
