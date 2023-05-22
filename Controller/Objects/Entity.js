class Entity {

    constructor(x, y, width, height, speed, jumping, dy, imgPath = "") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;

        this.movingLeft = false;
        this.jumping = jumping;
        this.dy = dy;
        this.imgPath = imgPath;

        this.image = new Image();
        this.image.src = this.imgPath;

        this.spriteImage = [];
        this.moving = false;
    }

    move(keyLeft, keyRight, keyY) {
        if (keyLeft) {
            this.x -= this.speed;
            this.movingLeft = true;
            this.moving = true;                   
        } else if (keyRight) {
            this.x += this.speed;
            this.movingLeft = false;
            this.moving = true;
        } else {
            this.moving = false;
        }
                    
        if (keyY && !this.jumping) {            
            this.jumping = true;            
            this.dy = fpsModificator == 1 ? -13 : -18;
        }

    }    

    render() {        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    renderPlayer() { 
        if(this.jumping) {
            if(this.spriteImage != jumpArray) {
                currentFrame = 0;
            }
            this.spriteImage = jumpArray[currentFrame];
        } else if(!this.moving) {
            this.spriteImage = spriteArray[currentFrame];
        } else {
            this.spriteImage = runArray[currentFrame];
        }
        
        if(this.movingLeft) {
            ctx.save();
            ctx.scale(-1,1); //FLip
            ctx.drawImage(this.spriteImage, -(this.x - this.width * 0.5) - (this.width * 2), this.y - this.height * 0.5, this.width *2, this.height *2);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.restore();
        } else {
            ctx.drawImage(this.spriteImage, this.x - this.width * 0.5, this.y - this.height * 0.5, this.width * 2, this.height * 2);
        }

    }

}

const loadSprites = (arr) => {
    let images = [];    

    arr.forEach((e) => {
        const actualImage = new Image();
        
        
        actualImage.src = e;
        images.push(actualImage);
    });

    return images;

};