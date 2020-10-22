'use strict'
console.log('services')
var gId = 0
var gTopText;
var gBottomText;


function init() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    gTopText = document.querySelector('.top-text').value
    console.log(gTopText)

}



var gImgs = [
    { id: 1, url: './imgs/1.jpg' },
    { id: 2, url: './imgs/2.jpg' },
    { id: 3, url: './imgs/3.jpg' },
    { id: 4, url: './imgs/4.jpg' },
    { id: 5, url: './imgs/5.jpg' },
    { id: 6, url: './imgs/6.jpg' },
    { id: 7, url: './imgs/7.jpg' },
    { id: 8, url: './imgs/8.jpg' },
    { id: 9, url: './imgs/9.jpg' },
    { id: 10, url: './imgs/10.jpg' },
    { id: 11, url: './imgs/11.jpg' },
    { id: 12, url: './imgs/12.jpg' },
    { id: 13, url: './imgs/13.jpg' },
    { id: 14, url: './imgs/14.jpg' },
    { id: 15, url: './imgs/15.jpg' },
    { id: 16, url: './imgs/16.jpg' },
]

var gLines = []

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
}

function getLinesForDisplay() {
    return gLines;
}

function createLine(val, idx) {
    var line = {
        txt: val,
        size: 48,
        align: 'left',
        color: 'black',
        x1: 50,
        y1: 100*idx+100,
    }
    return line
}


















  // {
        //     txt:'',
        //     size:48,
        //     align:'left',
        //     color:'black',
        //     x1: 50,
        //     y1:100,
        // }