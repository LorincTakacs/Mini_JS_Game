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
            this.increaseLevelAudio.volume = document.getElementById("effectVolume").value / 100;
            this.increaseLevelAudio.play();
        }
        
        time += 10; //Kap plus időt
        cloud.speed += 1; // növelem a felhő sebességét
        maxItemNumber += 2; //maximum spawnolható item
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
    backgroundImage.src = "./Assets/images/tiles/mountains.png";
    backgroundImage.addEventListener("load", () => {
        tileCtx.drawImage(backgroundImage, 0,0, canvas.width, canvas.height);
    });


    let image = new Image();
    image.src = "./Assets/images/tiles/tile29.png";
    numberOfTiles = Math.floor(canvas.width / 40);
    
    //I have to wait for the image to load in
    image.addEventListener("load", () => {
        let x = 0;
        for(let i = 0; i <  numberOfTiles; i++) {
            tileCtx.drawImage(image, x, canvas.height - 40, 40, 40);
            x += 40;
        }
    });
    
}

const setPlatform = () => {
    let viewPortWidth = window.innerWidth;
    let viewPortHeight = window.innerHeight;        

    if(viewPortWidth <= 1200) {
        //Adding all the event listeners
        //configureTouches();

        console.log("méretező lefutott", "méretezés típusa felbontás: csökkentés is");    
        let rate = 3;

        canvas.width = canvas.width / 4 * rate;
        //canvas.height = canvas.height  / 5 * rate;

        cloud.width = cloud.width / 4 * rate;
        cloud.height = cloud.height / 4 * rate;

        player.width = player.width / 4 * rate;
        player.height = player.height / 4 * rate;

        itemTypes.forEach(e => {
            e.width = e.width / 4 * rate;
            e.height = e.width;
        });

        cloud.speed = 1;
        document.querySelector(".box").classList.add("smallHeight");      
    }

    if(viewPortHeight <= 700) {
        //Adding all the event listeners
        //configureTouches();

        console.log("méretező lefutott", "méretezés típusa: skálázás");
        document.querySelector(".box").classList.add("smallHeight");
        return;
    }

};


//I control the preload/load system inorder optimize the performance
const preLoad = () => {    

    let loadedItems = {
        sounds: {
            collectedAudio: new Audio("./Assets/AudioFiles/Collected_ver2.wav"),
            badCollectedAudio: new Audio("./Assets/AudioFiles/BadCollected.wav"),
            endGameAudio: new Audio("./Assets/AudioFiles/GameEnd.wav"),
            increaseLevelAudio: new Audio("./Assets/AudioFiles/IncreaseLevelAudio.wav"),
            gameAudio: new Audio("./Assets/AudioFiles/Game.wav")
        },
        images: {
            joystickBtn: "./Assets/images/Interface/resize.png",
            jumpBtn: "./Assets/images/Interface/rightArrow_v2.png",
            pauseBtn: "./Assets/images/Interface/pause_v2.png",
        }
    };

    //Draw the tiles on the background offcanvas
    setMap();
    
    //When everything is loaded
    window.addEventListener("load", () => {
        console.log("Minden betöltött");

        //Set the platform if its smaller, resize
        setPlatform();

        //Set everything to basic
        game.reset();

        //Stop the game, while its not started
        pause = true;

        //Opening the menu
        setMenu();
        
        //Start the game-loop        
        loop();
    });

    return loadedItems;
};


const setResolution = (res) => {

    if(res === "low" && !canvas.classList.contains("lowRes")) {
        canvas.width = canvas.width / 2;
        canvas.height = canvas.height / 2;

        tileCanvas.width = canvas.width;
        tileCanvas.height = canvas.height;
        canvas.classList.add("lowRes");
    }

    if(res === "high" && canvas.classList.contains("lowRes")) {        
        canvas.classList.remove("lowRes");
        canvas.width = 1000;
        canvas.height = 600;        
    }

};