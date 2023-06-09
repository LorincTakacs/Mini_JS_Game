class MyAnimation {
    constructor(x, y, width, height, pointNumbers, special) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.pointNumbers = pointNumbers;
        this.special = special;
        
        this.firstTime = true;
        this.originalY = 0;

        //Might be nneded a little bit of an optimalization
        this.goodSound = (this.pointNumbers > 0) ? new Audio("./Assets/AudioFiles/Collected_ver2.wav") : "";

        //Bad collected sound        
        this.badSound = (this.pointNumbers < 0) ? new Audio("./Assets/AudioFiles/BadCollected.wav") : "";
    }

    collected() {
        if(this.firstTime) {       

            this.originalY = this.y;
            this.firstTime = false;
            if(document.getElementById("soundEffects").checked) {                             
                if(this.pointNumbers > 0) {
                    this.goodSound.volume = document.getElementById("effectVolume").value * 0.01;
                    this.goodSound.play();
                } else {                    
                    this.badSound.volume = document.getElementById("effectVolume").value * 0.01;
                    this.badSound.play();
                }
            }
        }
        ctx.font = "36px Arial";
        //Checking if its add or minus
        if(this.pointNumbers > 0) {
            //Style the text            
            ctx.fillStyle = "#ffbe0b";
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;

            // Draw the text with stroke and fill        
            ctx.strokeText("+" + this.pointNumbers, this.x, this.y);
            ctx.fillText("+" + this.pointNumbers, this.x, this.y);    

        } else if (this.pointNumbers <= 0) {
            //Style the text            
            ctx.fillStyle = "#7209b7";
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;

            // Draw the text with stroke and fill        
            ctx.strokeText(this.pointNumbers, this.x, this.y);
            ctx.fillText(this.pointNumbers, this.x, this.y);
        }

        this.y -= 0.2;
        if(this.originalY > this.y + 4) {
            animations.splice(animations.indexOf(this), 1);
        }
                
        
    }

    statusText(screenIndex = 1) {
        let text = "";        
        if(this.special.hasOwnProperty("speedUP")) {
            text = "Speed-Up";
        } else if (this.special.hasOwnProperty("time")) {
            text = "Bonus Time";
        }
        ctx.font = "36px Arial";
        ctx.fillStyle = "#06d6a0";

        ctx.strokeText(text, canvas.width * 0.5 - ctx.measureText(text).width * 0.5, 200 + (screenIndex * 40));
        ctx.fillText(text, canvas.width * 0.5 - ctx.measureText(text).width * 0.5, 200 + (screenIndex * 40));
    }

}