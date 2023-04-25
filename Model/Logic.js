//Technikai "globális" változók
var gameOver = false;


//Collison detection
const collison = (rectA, rectB) => {    
    if (
        rectA.x + rectA.width > rectB.x &&
        rectA.x < rectB.x + rectB.width &&
        rectA.y + rectA.height > rectB.y &&
        rectA.y < rectB.y + rectB.height
    ) {
       return true;
    }

    return false;
};

//Randomizer
const randomizer = (type) => {
    var randomNumber = Math.floor(Math.random() * 10) + 1;
    if(type == 'bool') {
        var bool = false;
        if(randomNumber > 5) {
            bool = true;
        }
        return bool;
    }

    //TODO: megkell vizsgáljam erre szükségem lesz-e
    if(type == 'number') {
        return randomNumber;
    }
    
};

//Get a random itemType
const getRandomItemType = () => {
    const randomId = Math.floor(Math.random() * itemTypes.length);
    for (let i = 0; i < itemTypes.length; i++) {
      if (itemTypes[i].id === randomId.toString()) {
        return itemTypes[i];
      }
    }
  };

const 
        pointsH3 = document.querySelector(".points h3"),
        pointsBadge = document.querySelector(".badge.points");
var points = 0;   
const addPoints = (item, increment = 1) => {
    points += increment;   
    pointsH3.innerHTML = `Pont: ${points}`;
    animations.push(new MyAnimation(item.x, item.y, 30, 30, item.pointsWorth, item.special));    
};

//Create a new item at a random postion with cloud max, min coords
function spawn(cloud) {
      
    x = Math.floor(Math.random() * (cloud.x + cloud.width - cloud.x)) + cloud.x ;// -110
    //console.log("canvas szélessség: "+ canvas.width + ", x: " + x);
    y = 35 * 2;
    let randomItem = getRandomItemType();
    width = parseInt(randomItem.width);
    height = parseInt(randomItem.height);    
    fallSpeed = parseInt(randomItem.fallSpeed);
    pointsWorth = parseInt(randomItem.pointsWorth);
    special = {};
    if(Object.keys(randomItem.special).length > 0) {
        special = randomItem.special;
    }
    imgPath = randomItem.img;


    createdItem = new Item(x, y, width, height, 2, pointsWorth, imgPath, special);
    canBeCreated = true;

    items.forEach(e=> {
        if(collison(e, createdItem)) {
            canBeCreated = false;
        }
    });

    //The creation
    if(x > 0 && x < canvas.width - 60 && canBeCreated) {
        items.push(createdItem);
    }
    
};

var moveCloudLeft = false, moveCloudRight = false;
setInterval(()=> {

    if(randomizer('bool')) {
        if(cloud.x > 0 + 10) {
            moveCloudLeft = randomizer('bool');
        } else {
            moveCloudRight = true;
        }
    } else {
        if(cloud.x < canvas.width - cloud.width - 10) {
            moveCloudRight = randomizer('bool');
        } else {
            moveCloudLeft = true;
        }
    }

}, 2000);