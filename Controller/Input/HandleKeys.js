var keys = {
    left: false,
    right: false,
    up: false
};
var pause = false;    

const handleKeyDown = (event) => {
    if (event.keyCode === 37) {
      keys.left = true;
    } else if (event.keyCode === 39) {
      keys.right = true;
    } else if (event.keyCode === 38) {
      keys.up = true;
    }

    if(event.keyCode === 13 && pause === false) {
        pause = true;
        loaded.sounds.gameAudio.pause();
        menu.toggle();
    } else if(event.keyCode === 13 && pause === true) {
        pause = false;        
        //GameOver?
        if(gameOver) {
          returnMenu();
          game.reset();
          gameOver = false;
        }
        //Is it the first play?
        if(firstGameStart) {
          firstGameStart = false;             
        }
        //Music
        if(document.getElementById("music").checked) {
          loaded.sounds.gameAudio.play();
          loaded.sounds.gameAudio.loop = true;
          loaded.sounds.gameAudio.volume = document.getElementById("musicVolume").value / 100;
        }       

        menu.toggle();
    }

  }

  const handleKeyUp = (event) => {
    if (event.keyCode === 37) {
      keys.left = false;
    } else if (event.keyCode === 39) {
      keys.right = false;
    } else if (event.keyCode === 38) {
      keys.up = false;
    }
  }


document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
//Gamepad using

const handleGamepadInput = (event) => {
  if (event.gamepad.axes[0] < -0.2) {
    keys.left = true;
  } else if (event.gamepad.axes[0] > 0.2) {
    keys.right = true;
  } else {
    keys.left = false;
    keys.right = false;
  }
  
  if (event.gamepad.buttons[0].pressed) {
    keys.up = true;
  } else {
    keys.up = false;
  }
  
  if (event.gamepad.buttons[9].pressed && pause === false) {
    pause = true;
    loaded.sounds.gameAudio.pause();
    menu.toggle();
  } else if (event.gamepad.buttons[9].pressed && pause === true) {
    pause = false;
    // GameOver?
    if (gameOver) {
      returnMenu();
      game.reset();
      gameOver = false;
    }
    // Is it the first play?
    if (firstGameStart) {
      firstGameStart = false;
    }
    // Music
    if (document.getElementById("music").checked) {
      loaded.sounds.gameAudio.play();
      loaded.sounds.gameAudio.loop = true;
      loaded.sounds.gameAudio.volume = document.getElementById("musicVolume").value / 100;
    }

    menu.toggle();
  }
}

window.addEventListener("gamepadconnected", (event) => {
  console.log("Gamepad connected:", event.gamepad.id);
  setInterval(() => {
    const gamepad = navigator.getGamepads()[event.gamepad.index];
    if (gamepad) {
      handleGamepadInput({ gamepad: gamepad });
    }
  }, 100);
});

//Ipad port keyHandles down there
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const upButton = document.getElementById("up-button");
const pauseButton = document.getElementById("pause-button");
const startBtn = document.getElementById("startBtn");

const handleButtonPress = (event) => {
  const buttonId = event.target.id;
  
  event.target.classList.add("arrow-touched");

  if (buttonId === "left-button") {
    keys.left = true;
  } else if (buttonId === "right-button") {
    keys.right = true;
  } else if (buttonId === "up-button") {
    keys.up = true;
  }

  if ((buttonId === "pause-button" && pause === false) || (buttonId === "startBtn" && !pause)) {
    pause = true;
    loaded.sounds.gameAudio.pause();
    menu.toggle();
    //Dismiss the pause button    
    //pauseButton.classList.add("d-none");
  } else if ((buttonId === "pause-button" && pause === true) || (buttonId === "startBtn" && pause)) {
    pause = false;        
    if(gameOver) {
      game.reset();
      gameOver = false;
    }    
    if(firstGameStart) {
      firstGameStart = false;             
    }
    if(document.getElementById("music").checked) {
      loaded.sounds.gameAudio.play();
      loaded.sounds.gameAudio.loop = true;
      loaded.sounds.gameAudio.volume = document.getElementById("musicVolume").value / 100;
    }        
    menu.toggle();
    //pauseButton.classList.remove("d-none");
  }
  // Prevent double-tap zooming on touch devices
 /* if (event.touches.length > 1) {
    event.preventDefault();
  }*/ 
}

const handleButtonRelease = (event) => {
  const buttonId = event.target.id;

  event.target.classList.remove("arrow-touched");

  if (buttonId === "left-button") {
    keys.left = false;
  } else if (buttonId === "right-button") {
    keys.right = false;
  } else if (buttonId === "up-button") {
    keys.up = false;
  }

  // Prevent double-tap zooming on touch devices
/*  if (event.touches.length > 1) {
    event.preventDefault();
  }
*/
}
/*
leftButton.addEventListener("touchstart", handleButtonPress);
leftButton.addEventListener("touchend", handleButtonRelease);

rightButton.addEventListener("touchstart", handleButtonPress);
rightButton.addEventListener("touchend", handleButtonRelease);

upButton.addEventListener("touchstart", handleButtonPress);
upButton.addEventListener("touchend", handleButtonRelease);

pauseButton.addEventListener("touchstart", handleButtonPress);
pauseButton.addEventListener("touchend", handleButtonRelease);
*/
startBtn.addEventListener("click", handleButtonPress);
startBtn.addEventListener("click", handleButtonRelease);


//Define custom joystick controls for iPad platform
// Define the joystick button's properties
const joystick = {
  right: {
    x: 50,
    y: canvas.height - 50,
    radius: 50
  },
  left: {
    x: 50,
    y: canvas.height - 160,
    radius: 50
  }  
};

const jumpButton = {
  x: 50,
  y: canvas.height - 50,
  radius: 50
};

// Draw the joystick button
var joystickImage = new Image();
const  drawJoystick = () => {
  if(tablet) {
    joystickImage.src = loaded.images.jumpBtn;

    controlCtx.beginPath();
    controlCtx.arc(joystick.right.x, joystick.right.y, joystick.right.radius, 0, Math.PI * 2); //RIGHT indicator
    controlCtx.arc(joystick.left.x, joystick.left.y, joystick.left.radius, 0, Math.PI * 2); //LEFT indicator
    controlCtx.fillStyle = "gold";
    controlCtx.fill();
    controlCtx.closePath();

    // Draw a smaller circle inside the joystick button
    controlCtx.beginPath();
    controlCtx.arc(joystick.right.x, joystick.right.y, joystick.right.radius - 20, 0, Math.PI * 2); //RIGHT indicator
    controlCtx.arc(joystick.left.x, joystick.left.y, joystick.left.radius - 20, 0, Math.PI * 2); //LEFT indicator
    controlCtx.fillStyle = "white";
    controlCtx.fill();
    controlCtx.closePath();
    
    controlCtx.drawImage(joystickImage, joystick.right.x - 30 , joystick.right.y - 30, 60, 60);  
    
    controlCtx.save();
    controlCtx.translate(joystick.left.x - 30, joystick.left.y - 30);
    controlCtx.rotate(Math.PI);
    controlCtx.drawImage(joystickImage, - 60, -60, 60, 60);
    controlCtx.restore();
  }
}

//Draw the jumpButton
var jumpBtnImage = new Image();
const drawJumpBtn = () => {
  if(tablet) {
    jumpBtnImage.src = loaded.images.jumpBtn;

    jumpCtx.beginPath();
    jumpCtx.arc(jumpButton.x, jumpButton.y, jumpButton.radius, 0, Math.PI * 2);
    jumpCtx.fillStyle = "gold";
    jumpCtx.fill();
    jumpCtx.closePath();

    // Draw a smaller circle inside the joystick button
    jumpCtx.beginPath();
    jumpCtx.arc(jumpButton.x, jumpButton.y, jumpButton.radius - 20, 0, Math.PI * 2);
    jumpCtx.fillStyle = "white";
    jumpCtx.fill();
    jumpCtx.closePath();

    jumpCtx.save(); // save the current canvas state
    jumpCtx.translate(jumpButton.x, jumpButton.y); // move the canvas origin to the center of the button
    jumpCtx.rotate(- Math.PI / 2); // rotate the canvas by 90 degrees clockwise
    jumpCtx.drawImage(jumpBtnImage, -30, -30, 60, 60); // draw the image centered at the new origin
    jumpCtx.restore(); // restore the previous canvas state
  }
};

//Draw the pause button
var pauseBtnImage = new Image(),
    tablet = false;
const pauseBtn = () => {
  if(tablet) {
    pauseBtnImage.src = loaded.images.pauseBtn;
    ctx.drawImage(pauseBtnImage, 10, 10, 60, 60);
  }
};

const configureTouches = () => {
  //Set the platform tablet to true in order to draw out the pause button
  tablet = true;

//Create event listener for the jump btn
jumpCanvas.addEventListener("touchstart", function(event) {
  // Get the position of the touch relative to the jumpCanvas element
  const rect = jumpCanvas.getBoundingClientRect();
  const touchX = event.touches[0].clientX - rect.left;
  const touchY = event.touches[0].clientY - rect.top;
  
  // Calculate the distance between the touch position and the jump button position
  const distance = Math.sqrt(Math.pow(touchX - jumpButton.x, 2) + Math.pow(touchY - jumpButton.y, 2));
  // If the touch is within the jump button, trigger character jump
  if (distance < jumpButton.radius + 100) {
    keys.up = true;
  }

  // Prevent double-tap zooming on touch devices
  if (event.touches.length > 1) {
    event.preventDefault();
  }

});

jumpCanvas.addEventListener("touchend", function(event) {
  keys.up = false;
  // Prevent double-tap zooming on touch devices
  if (event.touches.length > 1) {
    event.preventDefault();
  }

});

//Event listener for the pause button
canvas.addEventListener("touchstart", function(event){

  const rect = canvas.getBoundingClientRect();
  const touchX = event.touches[0].clientX - rect.left;
  const touchY = event.touches[0].clientY - rect.top;

  // Calculate the distance between the touch position and the jump button position
  const distance = Math.sqrt(Math.pow(touchX - 10, 2) + Math.pow(touchY - 10, 2));  
  if(distance < 60) {
    pause = true;
    loaded.sounds.gameAudio.pause();
    menu.toggle();
  }

  // Prevent double-tap zooming on touch devices
  if (event.touches.length > 1) {
    event.preventDefault();
  }
  
});

// Add an event listener for touchstart event
controlCanvas.addEventListener("touchstart", function(event) {

  // Get the position of the touch
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;

  // Calculate the distance between the touch position and the joystick position
  const rightDistance = Math.sqrt(Math.pow(touchX - joystick.right.x, 2) + Math.pow(touchY - joystick.right.y, 2));
  const leftDistance = Math.sqrt(Math.pow(touchX - joystick.left.x, 2) + Math.pow(touchY - joystick.left.y, 2));

  // If the touch is within the joystick button, change the character's direction and movement
  if (rightDistance < joystick.right.radius) {
    //const rightAngle = Math.atan2(touchY - joystick.right.y, touchX - joystick.right.x);
    //const direction = angle * (180 / Math.PI);
    keys.right = true;
    // Here you can define your own character's movement and direction logic based on the touch direction
    /*
    if (rightAngle < Math.PI / 2 && rightAngle > -Math.PI / 2) {
      keys.right = true;
      keys.left = false;
    } else {
      keys.right = false;
      //keys.left = true;
    }*/

  }

  if (leftDistance < joystick.left.radius) {
    //const leftAngle = Math.atan2(touchY - joystick.left.y, touchX - joystick.left.x);
    keys.left = true;    
    /*
    if(leftAngle < Math.PI / 2 && leftAngle > -Math.PI / 2) {
      keys.left = true;
      keys.right = false;
    } else {
      keys.left = false;
    }*/
  }

  // Prevent double-tap zooming on touch devices
  if (event.touches.length > 1) {
    event.preventDefault();
  }

});

// Add an event listener for touchmove event
/*
controlCanvas.addEventListener("touchmove", function(event) {
  // Get the position of the touch
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;

  // Calculate the distance between the touch position and the joystick position
  const distance = Math.sqrt(Math.pow(touchX - joystick.x, 2) + Math.pow(touchY - joystick.y, 2));

  // If the touch is within the joystick button, change the character's direction and movement
  if (distance < joystick.radius) {
    const angle = Math.atan2(touchY - joystick.y, touchX - joystick.x);
    const direction = angle * (180 / Math.PI);

    // Here you can define your own character's movement and direction logic based on the touch direction
    if (angle < Math.PI / 2 && angle > -Math.PI / 2) {
      keys.right = true;
      keys.left = false;
    } else {
      keys.right = false;
      keys.left = true;
    }
    
  }

  // Prevent double-tap zooming on touch devices
  if (event.touches.length > 1) {
    event.preventDefault();
  }

});
*/

// Add an event listener for touchend event
controlCanvas.addEventListener("touchend", function(event) {
  // Here you can reset your character's movement and direction logic
  keys.left = false;
  keys.right = false;

  // Prevent double-tap zooming on touch devices
  if (event.touches.length > 1) {
    event.preventDefault();
  }

});
};

//Megtiltom a scrollt
window.addEventListener("scroll", function(event) {
  event.preventDefault();
});


