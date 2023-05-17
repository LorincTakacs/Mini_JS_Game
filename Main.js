// Create the canvas and get the rendering context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Draw the background-offcanvas
var tileCanvas = document.createElement("canvas");
tileCanvas.width = canvas.width;
tileCanvas.height = canvas.height;
var tileCtx = tileCanvas.getContext("2d");

//Start the inload of everything
const loaded = preLoad();

// Set up the game state
var game = new Game(60, 0, {player: {x: 100, y: 500}, cloud: {x: canvas.width * 0.5, speed: 2}});

var player = new Entity(50, 250, 30 * 2, 30 * 2, 4, false, 0);
var cloud = new Entity(canvas.width/2, 10, 200/* * 2*/, 111/*55.5 * 2*/, 1, false, 0, "./Assets/images/cloud_ver5_shopLogo.png");
var ground = new Entity(0, canvas.height - 40, canvas.width, 40, 0, false, 0);

//Item + animation container to populate
var items = [];
var animations = [];

//Draw the cloud
spawn(cloud);

//Support type variable in order to slow down some functions
var updateCounter = 0;

var spawnFrequency = 30;
var maxItemNumber = 3;
var pointTolvlUp = 40;
var lvl = 1;
var firstGameStart = true;
var screenIndex = 0;

//SpriteSheet animation's variable
var currentFrame = 0;
var runArray = loadSprites(run);
var idleArray = loadSprites(idle);
var jumpArray = loadSprites(jump);
var talkArray = loadSprites(talk);

var spriteArray = idleArray;
var previousArray = spriteArray;

const update = () => {
  if(!pause) {
    // Move the this left or right
    player.move(
      (player.x < 0) ? false : keys.left,
      (player.x > canvas.width - player.width) ? false : keys.right,
      keys.up
    );

    //Move the cloud random
    cloud.move(moveCloudLeft, moveCloudRight, false);
    if(cloud.x > canvas.width - cloud.width ) {
        moveCloudRight = false;
    } else if(cloud.x < 1 /*0 + cloud.width*/ ) {
        moveCloudLeft = false;
    }
    
    items.forEach(e => {
      e.applyGravity();
    });        
    
    //Collison detection for all, remove if true
    for(let i = 0; i < items.length; i++) {

      if(collison(ground, items[i])) {
        
        items.splice(i, 1);

      } else if(collison(player, items[i])) {
        
        addPoints(items[i], items[i].pointsWorth);
        items[i].specialEffect();
        items.splice(i, 1);
        
        if(points >= pointTolvlUp) {
          pointTolvlUp += pointTolvlUp;
          game.increaseLevel();
        }

      }

    }

    //Falling dawn of the player
    player.dy += 0.5;
    player.y += player.dy;

    //If collison is detected with the ground i stop the player from falling more
    if(collison(ground, player)) {
      player.dy = 0;
      player.jumping = false;
      player.y = ground.y - player.height;
    }


    //Spawn form the items array
    if(updateCounter % spawnFrequency === 0) {
      if(items.length < maxItemNumber) {
        spawn(cloud);
      }
    }

    if(updateCounter % 60 === 0) {
      countDown();
    }

    if(updateCounter % 10 === 0) {      
      currentFrame++;
      if(currentFrame >= spriteArray.length) {
        currentFrame = 0;
      }
    }

    //Frequency modificator, its a must have
    updateCounter++;

  }
};

const draw = () => {

  if(!pause) {
    // Clear the canvas, delete the frames
    ctx.clearRect(0, 0, canvas.width, canvas.height);    

    //Still trying with off canvas
    ctx.drawImage(tileCanvas, 0,0);

    //Draw the Sonecloud
    cloud.render();

    //Draw and remove items
    items.forEach(item => {
      item.renderItemImage();
    });
    
    //Draw the collected number "animation"
    animations.forEach(anim => {
      anim.collected();
      if(window.innerWidth > 1200) {
        if(Object.entries(anim.special).length > 0){
          anim.statusText(screenIndex);
          screenIndex++;
        }
      }
    });
    screenIndex = 0;    

    // Draw the player
    //ctx.fillRect(player.x, player.y, player.width, player.height); // This is the HITBOX    
    player.renderPlayer();


  } else if (firstGameStart) {
    ctx.drawImage(tileCanvas, 0,0);

  }

};


const loop = () => {
    update();
    draw();

    requestAnimationFrame(loop);
};