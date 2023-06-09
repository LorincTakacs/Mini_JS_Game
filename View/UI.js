const 
    timeH3 = document.querySelector(".time h3"),
    timeBadge = document.querySelector(".badge.time"),
    
    lvlUI = document.querySelector(".lvl h3");

var time = 60;

const countDown = () => {    
    timeH3.innerHTML = `Idő: ${time}`;    
    if(time > 0) {
        time--;        
    } else {

        if(document.getElementById("soundEffects").checked)  {
            let endSound = loaded.sounds.endGameAudio;
            endSound.volume = document.getElementById("effectVolume").value * 0.01;
            endSound.play();
        }
        loaded.sounds.gameAudio.pause();

        menu.toggle();
        endGameData();
        gameOver = true;
        pause = true;
    }

    if(time > 30) {
        timeBadge.classList.remove("bg-warning");
        timeBadge.classList.remove("bg-danger");     
        if(!timeBadge.classList.contains("bg-success")) {
            timeBadge.classList.add("bg-success");
        }
    }
        
    if(time < 30) {
        timeBadge.classList.remove("bg-danger");
        timeBadge.classList.remove("bg-success");
        timeBadge.classList.add("bg-warning");
    }

    if(time < 10) {
        timeBadge.classList.remove("bg-success");
        timeBadge.classList.remove("bg-warning");
        timeBadge.classList.add("bg-danger");
    }

};

//From here its completly about the menu settings
var returnBtn =  document.querySelector(".return"),
    title = document.querySelector(".modal-title"),
    settingsBox = document.querySelector(".settings"),
    helpBtn = document.querySelector(".help"),
    helpBox = document.getElementById("helpBox"),
    settingsBtn = document.getElementById("settingsBtn"),
    endGameBox = document.getElementById("endGameBox");

const openSettings = () => {    
    returnBtn.classList.remove("d-none");

    settingsBox.classList.remove("d-none");
    helpBtn.classList.add("d-none");
    title.innerHTML = `Beállítások`;    

    settingsBtn.classList.add("d-none");
};

const showHelp = () => {    
    helpBox.classList.remove("d-none");
    returnBtn.classList.remove("d-none");

    helpBtn.classList.add("d-none");
    settingsBtn.classList.add("d-none");
    title.innerHTML = `Segítség`;

    itemTypes.forEach(e => {
        document.querySelector("tbody").innerHTML += `
        <tr>
            <th scope="row">${e.name}</th>
            <td>${e.pointsWorth} pont</td>
        </tr>
        `;
    });    

};

const endGameData = () => {
    helpBox.classList.add("d-none");
    settingsBox.classList.add("d-none");
    helpBtn.classList.add("d-none");    
    settingsBtn.classList.add("d-none");

    returnBtn.classList.remove("d-none");
    endGameBox.classList.remove("d-none");
    title.innerHTML = `Játék vége!`;



    endGameBox.innerHTML = `
    <p>Elért eredmények:</p>
    <table class="table">
        <thead>
        <tr>                    
            <th scope="col">Szint</th>
            <th scope="col">Játék Pont</th>
            <th scope="col">Verseny Pont</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">${lvl}. szint</th>
                <td>${points} pont</td>
                <td>${racePoints()} pont</td>
            </tr>       
        </tbody>
    </table>
    `;

};

const returnMenu = () => {
    returnBtn.classList.add("d-none");
    helpBox.classList.add("d-none");
    settingsBox.classList.add("d-none");
    endGameBox.classList.add("d-none");

    
    helpBtn.classList.remove("d-none");    
    settingsBtn.classList.remove("d-none");
    title.innerHTML = `Energy Run | Főmenü`;
};

const racePoints = () => {    

    /*
    120 felett - 10 pont
    110 - 119 - 9 pont
    100 - 109 - 8 pont
    90 - 99 - 7 pont
    80 - 89 - 6 pont
    70 - 79 - 5 pont
    60 - 69 - 4 pont
    50 - 59 - 3 pont
    40 - 49 - 2 pont
    30 - 39 - 1 pont
    */
   
    let num = 0;

    if(points > 29) {
        num = (points - 30) * 0.1;
        return (Math.floor(num + 1) > 10) ? 10 : Math.floor(num + 1);
    } else {        
        return num;
    }

};