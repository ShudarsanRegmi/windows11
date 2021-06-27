const container = document.getElementById("container");
const desktop = document.getElementById("desktop");
const taskbar = document.getElementById("taskbar");
const apps = document.getElementsByClassName("app");
const appNames = document.getElementsByClassName("games");
const mainMenu = document.getElementById("mainMenu");
const windowIcon = document.getElementsByClassName("taskbarIcons")[0];
const startMenu = document.getElementById("startMenu");
const powerOptionMenu = document.getElementById("powerOptionMenu");
const powerBtn = document.getElementById("powerOptions");
const powerOnDiv = document.getElementById("powerOnDiv");
const powerOnBtn = document.getElementById("powerOnBtn");
const bootDiv = document.getElementById("bootDiv");
// Adding context menu
desktop.addEventListener("contextmenu", event => {
        event.preventDefault();
        desktopHeight = window.innerHeight;
        desktopWidth = window.innerWidth;
        // height of menus
        x = event.offsetX + "px";
        y = event.offsetY + "px";
        mainMenu.style.display = "block";
        spaceBelow = desktopHeight - event.offsetY;
        if (spaceBelow < 300) {
            y = desktopHeight - 345 + "px";
        }
        spaceRight = desktopWidth - event.offsetX;
        if (spaceRight < 255) {
            x = desktopWidth - 255 + "px";
        }
        console.log("desktopHeight = ", desktopHeight)
        console.log("space below = ", spaceBelow);
        console.log("y position", y)
        mainMenu.style.top = y;
        mainMenu.style.left = x;
    })
    // Hiding context meinu on clicking on desktop
desktop.addEventListener("click", event => {
        mainMenu.style.display = "none";
    })
    // poping up window icon

// opening and closing start menu
startToggle = 0;
windowIcon.addEventListener("click", event => {
        // startMenu.style.visibility is giving ""....why??
        if (startToggle % 2 == 0) {
            startMenu.style.visibility = "visible";
            startMenu.style.bottom = "50px";
        } else {
            startMenu.style.bottom = "-600px";
            startMenu.style.visibility = "hidden";

        }
        startToggle++;
    })
    // power menu
powerOptionMenu.style.display = "none";
powerBtn.addEventListener("click", event => {
    console.log(powerOptionMenu.style.display)
    if (powerOptionMenu.style.display == "none") {
        powerOptionMenu.style.display = "block"
    } else {
        powerOptionMenu.style.display = "none";
    }
})
document.getElementById("sleepOption").addEventListener("click", event => {
    sleep();
})
document.getElementById("shutDownOption").addEventListener("click", event => {
    shutDown();
})
document.getElementById("restartOption").addEventListener("click", reboot)

function sleep() {
    console.log("sleeping..")
    let sleepDiv = document.createElement("div");
    sleepDiv.style.height = "100vh";
    sleepDiv.style.width = "100vw";
    sleepDiv.style.zIndex = "200";
    sleepDiv.style.backgroundColor = "#000";
    sleepDiv.style.position = "fixed";
    sleepDiv.style.top = 0;
    sleepDiv.style.left = 0;
    sleepDiv.style.cursor = "none";
    document.body.appendChild(sleepDiv)
    sleepDiv.addEventListener("mousemove", event => {
        wakeUp(sleepDiv)
    })
}


function wakeUp(sleepDiv) {
    sleepDiv.style.display = "none";
    document.body.removeChild(sleepDiv)
}

function shutDown() {

    // playing audio
    // let shutDownAudio = new Audio("./audios/startup.webm");
    // shutDownAudio.play();
    const shutDownVideo = document.getElementById("shutDownVideo");
    const shutDownDiv = document.getElementById("shutDownDiv");
    shutDownDiv.style.display = "block";
    shutDownVideo.currentTime = 0;
    shutDownVideo.load();
    shutDownVideo.play();
    shutDownVideo.addEventListener("ended", event => {
        shutDownDiv.style.display = "none";
        // make the power on button display again
        powerOnDiv.style.display = "flex";
    })
}

powerOnBtn.addEventListener("click", boot)

function boot() {
    console.log("booting");
    const bootingAudio = new Audio("./audios/startup.webm")
    const bootingVideo = document.getElementById("bootingVideo");
    bootingVideo.requestFullscreen();
    // bootingVideo.controls = false;  // i don't know why the video have controls
    powerOnDiv.style.display = "none";
    bootDiv.style.display = "block";
    bootingVideo.currentTime = 0;
    bootingVideo.load();
    bootingVideo.play();
    // after booting completed
    bootingVideo.addEventListener("ended", () => {
        console.log("booting finished");
        bootingAudio.play();
        bootingVideo.style.display = "none";
        bootDiv.style.display = "none";

    })
}

function reboot() {
    shutDown();
    // powerOnDiv.style.display = "none";
    boot();
}