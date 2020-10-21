'use strict'
console.log('services')

var gTopText;
var gBottomText;


function init() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gTopText=document.querySelector('.top-text').value
    console.log(gTopText)
    
}



var gImgs = [
    { id: 1, url: './imgs/1.jpg' },
    { id: 2, url: './imgs/2.jpg' },
    { id: 3, url: './imgs/3.jpg' },
    { id: 4, url: './imgs/4.jpg' },
    { id: 5, url: './imgs/5.jpg' },
    { id: 6, url: './imgs/6.jpg' },
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines:[
        {
            txt:'',
            size:48,
            align:'left',
            color:'black',
            x1: 50,
            y1:100,
        }
    ]
}
