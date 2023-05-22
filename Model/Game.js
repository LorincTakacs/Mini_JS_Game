class Game {
    constructor(time, points, entities) {
        this.time = time;
        this.points = points;
        this.entities = entities;

        this.increaseLevelAudio = loaded.sounds.increaseLevelAudio;
        this.increaseLevelAudio.volume = 1;
    }

    reset() {
        //Reset time
        time = this.time;
        timeH3.innerHTML = `Idő: ${time}`;
        timeBadge.classList.remove("bg-warning");
        timeBadge.classList.remove("bg-danger");
        timeBadge.classList.add("bg-success");
        //Reset lvl UI
        lvl = 1;
        lvlUI.innerHTML = `Szint: ${lvl}`;
        //REset the maximum item number
        maxItemNumber = 3;
        //Reset points
        points = this.points;
        pointsH3.innerHTML = `Pont: ${points}`;
        //Reset the lvl limit
        pointTolvlUp = 40;
        //Reset player
        player.x = this.entities.player.x;
        player.y = this.entities.player.y;
        //Reset cloud
        cloud.x = this.entities.cloud.x;
        cloud.speed = this.entities.cloud.speed;
        //Reset - Empty out the items
        items = [];
        //Reset animations
        animations = [];
    }

    increaseLevel() {
        //Lejátszom a szint lépés hangot
        if(document.getElementById("soundEffects").checked) {
            this.increaseLevelAudio.volume = document.getElementById("effectVolume").value * 0.01;
            this.increaseLevelAudio.play();
        }
        
        time += 10; //Kap plus időt
        cloud.speed += 1; // növelem a felhő sebességét
        maxItemNumber += (window.innerWidth > 1200) ? 2 : 1; //maximum spawnolható item
        lvl++;
        lvlUI.innerHTML = `Szint: ${lvl}`;
    }

}

var menu = new bootstrap.Modal(document.getElementById('menu'), {
    backdrop: false,
});

const setMenu = () => {
    menu.toggle()
};

const setMap = () => {
    
    let backgroundImage = new Image();
    let image = new Image();
    let tileSize = 40;

    backgroundImage.src = "./Assets/images/tiles/mountains.png";
    backgroundImage.addEventListener("load", () => {
        tileCtx.drawImage(backgroundImage, 0,0, canvas.width, canvas.height);        
        image.src = "./Assets/images/tiles/tile29.png";

        numberOfTiles = Math.floor(canvas.width / tileSize);

        let x = 0;
        image.addEventListener("load", () => {        
            for(let i = 0; i <  numberOfTiles; i++) {
                tileCtx.drawImage(image, x, canvas.height - tileSize, tileSize, tileSize);
                x += tileSize;
            }
        });
    });

    //let tileSize = 40;
    
    //numberOfTiles = Math.floor(canvas.width / tileSize);
    
    //I have to wait for the image to load in
    /*
    let x = 0;
    image.addEventListener("load", () => {        
        for(let i = 0; i <  numberOfTiles; i++) {
            tileCtx.drawImage(image, x, canvas.height - tileSize, tileSize, tileSize);
            x += tileSize;
        }
    });
    */
}

const setPlatform = () => {
    let viewPortWidth = window.innerWidth;
    let viewPortHeight = window.innerHeight;        
    
    if(viewPortWidth <= 1300) {                
        console.log("méretező lefutott", "méretezés típusa felbontás: csökkentés is");    
        
        //So, its like X/divider * rate
        let rate = 0.75;

        canvas.width = canvas.width * rate;

        cloud.width = cloud.width * rate;
        cloud.height = cloud.height * rate;

        player.width = player.width * rate;
        player.height = player.height * rate;

        itemTypes.forEach(e => {
            e.width = e.width * rate;
            e.height = e.width;
        });

        cloud.speed = 1;

        //Disable pinch-zoom and swipe
        let container = document.body;
        let modalContainer = document.querySelector(".modal");
        let contentContainer = document.querySelector(".box");
        let btnContainer = document.querySelectorAll(".box .row");


        let hammer = new Hammer(container);
        let hammerModal = new Hammer(modalContainer);
        let hammerContent = new Hammer(contentContainer);        

        //For the body
        hammer.get('pinch').set({enable: false});
        hammer.get('swipe').set({enable: false});

        //For the modal
        hammerModal.get('pinch').set({enable: false});
        hammerModal.get('swipe').set({enable: false});

        //For the content 
        hammerContent.get('pinch').set({enable: false});
        hammerContent.get('swipe').set({enable: false});

        btnContainer.forEach(e => {
            e.addEventListener("touchstart", function(event){
                if(event.touches.length > 1) {
                    event.preventDefault();
                }
            });
        });

    } else {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
    }

    if(viewPortHeight <= 700) {    

        console.log("méretező lefutott", "méretezés típusa: skálázás");
        document.querySelector(".box").classList.add("smallHeight");
    }

};


//I control the preload/load system inorder optimize the performance
const preLoad = () => {    

    //TODO: loading animation starts?
    console.log("loading started");

    let loadedItems = {
        sounds: {
            collectedAudio: new Audio("./Assets/AudioFiles/Collected_ver2.wav"),
            badCollectedAudio: new Audio("./Assets/AudioFiles/BadCollected.wav"),
            endGameAudio: new Audio("./Assets/AudioFiles/GameEnd.wav"),
            increaseLevelAudio: new Audio("./Assets/AudioFiles/IncreaseLevelAudio.wav"),
            gameAudio: new Audio("./Assets/AudioFiles/Game.wav")
        },
        images: {
            cabel: new Image(),
            lamp: new Image(),
            electricPanel: new Image(),
            exitDoor: new Image(),
            lightSwitch: new Image(),
            lightbulb: new Image(),
            plug: new Image(),
            solarCell: new Image(),
            tape: new Image()
        }        
    };   
    
    //adding the source files
    loadedItems.images.cabel.src = "./Assets/images/items/cable_small.png";
    loadedItems.images.lamp.src = "./Assets/images/items/lamp_small.png";
    loadedItems.images.electricPanel.src = "./Assets/images/items/electric-panel_small.png";
    loadedItems.images.exitDoor.src = "./Assets/images/items/exit-door_small.png";
    loadedItems.images.lightSwitch.src = "./Assets/images/items/light-switch_small.png";
    loadedItems.images.lightbulb.src = "./Assets/images/items/lightbulb_small.png";
    loadedItems.images.plug.src = "./Assets/images/items/plug_small.png";
    loadedItems.images.solarCell.src = "./Assets/images/items/solar-cell_small.png";
    loadedItems.images.tape.src = "./Assets/images/items/tape_small.png";    

    //Draw the tiles on the background offcanvas
    setMap();
    
    //When everything is loaded
    window.addEventListener("load", () => {
        console.log("Minden betöltött");        
        

        //Set the platform if its smaller, resize
        setPlatform();            

        document.querySelector(".modal-title").innerHTML += ` | Width: ${window.innerWidth}`;
        document.querySelector(".modal-title").innerHTML += ` | Height: ${window.innerHeight}`;

        //Set everything to basic
        game.reset();

        //Stop the game, while its not started
        pause = true;

        //Opening the menu
        setMenu();

        console.log("loading ended");
        
        //Start the game-loop        
        loop();
    });

    return loadedItems;
};