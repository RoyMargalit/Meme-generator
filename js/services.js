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
    { id: 1, url: './imgs/1.jpg',keyWords:['politics'] },
    { id: 2, url: './imgs/2.jpg',keyWords:['pets','animals'] },
    { id: 3, url: './imgs/3.jpg',keyWords:['baby','pets'] },
    { id: 4, url: './imgs/4.jpg',keyWords:['pets','cat','animals'] },
    { id: 5, url: './imgs/5.jpg',keyWords:['baby'] },
    { id: 6, url: './imgs/6.jpg',keyWords:['funny','happy'] },
    { id: 7, url: './imgs/7.jpg',keyWords:['baby'] },
    { id: 8, url: './imgs/8.jpg' ,keyWords:['movie','funny']},
    { id: 9, url: './imgs/9.jpg' ,keyWords:['baby']},
    { id: 10, url: './imgs/10.jpg' ,keyWords:['politics']},
    { id: 11, url: './imgs/11.jpg' ,keyWords:['sports']},
    { id: 12, url: './imgs/12.jpg' ,keyWords:['funny']},
    { id: 13, url: './imgs/13.jpg' ,keyWords:['movie']},
    { id: 14, url: './imgs/14.jpg' ,keyWords:['movie']},
    { id: 15, url: './imgs/15.jpg' ,keyWords:['movie']},
    { id: 19, url: './imgs/16.jpg' ,keyWords:['movie']},
    { id: 17, url: './imgs/17.jpg' ,keyWords:['politics']},
]

var gLines = []

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    align:'left',
    color: 'white',
    font:'Impact'
}


function getLinesForDisplay() {
    return gLines;
}

function getImgsForDisplay(){
    var imgs=[]
    imgs=filterImgs(gImgs)
    return imgs
}


function filterImgs(imgs){
    var userSearchBy = document.getElementById('search').value;
    if (userSearchBy === '') return imgs;
    else return imgs.filter(function (img) {
        return img.keyWords.some(function (keyword) {
            return keyword.substring(0, userSearchBy.length) === userSearchBy;
        });
    });
}

function createLine(val, y) {
    var line = {
        txt: val,
        size: 48,
        x1: 50,
        y1: 200*y+100,
        color:'white'
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