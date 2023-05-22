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
          loaded.sounds.gameAudio.volume = document.getElementById("musicVolume").value * 0.01;
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
      loaded.sounds.gameAudio.volume = document.getElementById("musicVolume").value * 0.01;
    }        
    menu.toggle();
    //pauseButton.classList.remove("d-none");
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
  /*
  if (event.touches.length > 1) {
    event.preventDefault();
  }*/

}

leftButton.addEventListener("touchstart", handleButtonPress);
leftButton.addEventListener("touchend", handleButtonRelease);

rightButton.addEventListener("touchstart", handleButtonPress);
rightButton.addEventListener("touchend", handleButtonRelease);

upButton.addEventListener("touchstart", handleButtonPress);
upButton.addEventListener("touchend", handleButtonRelease);

/*
pauseButton.addEventListener("touchstart", handleButtonPress);
pauseButton.addEventListener("touchend", handleButtonRelease);
*/

startBtn.addEventListener("click", handleButtonPress);
startBtn.addEventListener("click", handleButtonRelease);

//Tring to disable zooming globally
document.addEventListener('touchstart', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, {passive: false});