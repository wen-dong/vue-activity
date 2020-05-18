
const imgs = [
    // require('assets/images/bg_bottom.png'), 
];

let imgsLen = imgs.length;

export default function preloadImages() {
    return new Promise((resolve,reject) => {
        imgs.forEach((item) => {
            let img = new Image();
            img.src = item;
            img.onload = function() {
                imgsLen --;
                if (!imgsLen) {
                    resolve(true)
                }
            }
        })
    })
    
    
}