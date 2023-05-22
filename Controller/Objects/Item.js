class Item {
    constructor(x, y, width, height, fallSpeed, pointsWorth, imgPath, special = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fallSpeed = fallSpeed;
        this.pointsWorth = pointsWorth;
        //this.imgPath = imgPath;
        this.alpha = 1;
        this.special = special;
        
        //Give it the preloaded image
        this.image = loaded.images[imgPath];
       
    }
    
    //Apply gravity
    applyGravity() {  
        this.y += this.fallSpeed;
    }

    //Render individual images
    renderItemImage() {       
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    //Special effects application
    specialEffect() {    
        if(this.special.hasOwnProperty("speedUP")){            
            player.speed += parseInt(this.special.speedUP);

            setTimeout(()=> {
                player.speed -= parseInt(this.special.speedUP);                
            }, 3000);
        }

        if(this.special.hasOwnProperty("time")){            
            time += parseInt(this.special.time);
        }
    }
    
}