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
    pauseButton.classList.add("d-none");
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
    pauseButton.classList.remove("d-none");
  }
  // Prevent double-tap zooming on touch devices
  if (event.touches.length > 1) {
    event.preventDefault();
  } 
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
  if (event.touches.length > 1) {
    event.preventDefault();
  }

}

leftButton.addEventListener("touchstart", handleButtonPress);
leftButton.addEventListener("touchend", handleButtonRelease);

rightButton.addEventListener("touchstart", handleButtonPress);
rightButton.addEventListener("touchend", handleButtonRelease);

upButton.addEventListener("touchstart", handleButtonPress);
upButton.addEventListener("touchend", handleButtonRelease);

pauseButton.addEventListener("touchstart", handleButtonPress);
pauseButton.addEventListener("touchend", handleButtonRelease);

startBtn.addEventListener("click", handleButtonPress);
startBtn.addEventListener("click", handleButtonRelease);