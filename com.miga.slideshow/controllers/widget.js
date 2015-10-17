var images = [];
var time = 5000;
var isRunning = false;
var currentImage = 0;
var interChange = null;
var isFront = false;

exports.init = function(obj){
    images = obj.images;
    time = obj.time;
};

exports.start = function(){
    isRunning=true;
    changeImage();
    interChange=setInterval(changeImage,time);
};

exports.pause = function(){
    isRunning=false;
    clearInterval(interChange);
    interChange = null;
};

exports.resume = function(){
    isRunning=true;
    interChange=setInterval(changeImage,time);
};

function changeImage(e){
    if (currentImage > images.length - 1) {
        currentImage = 0;
    }

    var ani = Ti.UI.createAnimation({});
    ani.duration = 500;

    if (isFront){
        $.view_image2.backgroundImage = images[currentImage];
        ani.opacity = 1;
        $.view_image2.animate(ani);
        $.view_image2.show();

        ani.addEventListener("complete",function(e){
            $.view_image1.hide();
            $.view_image1.backgroundImage = undefined;
            ani = null;
        });
    } else {
        $.view_image1.backgroundImage = images[currentImage];
        $.view_image1.show();
        ani.opacity = 0;
        $.view_image2.animate(ani);

        ani.addEventListener("complete",function(e){
            $.view_image2.hide();
            $.view_image2.backgroundImage = undefined;
            ani = null;
        });
    }
    isFront = !isFront;
    currentImage++;
}
