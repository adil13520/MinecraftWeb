let backgroundColor = "#fff";

let canvas = document.querySelector("#mainCanvas");

let windowAspectRatio = 0.5625;

let canvasWidth = 1920; 
let canvasHeight = canvasWidth * windowAspectRatio;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let drawer = canvas.getContext("2d");


function NormalizedToAbsolute(vector2)
{
    let x = (vector2.x + 1) * canvasWidth / 2;
    let y = (vector2.y + 1) * canvasHeight / 2;

    return new Vector2(Math.floor(x), Math.floor(y));
}

function AddLines(verts)
{
    let temp = [];

    for (let i = 0; i < verts.length; ++i)
        temp.push(NormalizedToAbsolute(verts[i]));

    drawer.moveTo(temp[0].x, temp[0].y);
    
    for (let i = 1; i < temp.length; ++i)
        drawer.lineTo(temp[i].x, temp[i].y);

    drawer.lineTo(temp[0].x, temp[0].y);
}

let fpsTracking = false;

let deltaTime = 0.01;
let finalStartTime;
let finalEndTime;
let renderDeltaTime = 0;
let renderStartTime;
let renderEndTime;

let FpsLogCooldown = 0.5;
let FpsLogCurrentCooldown = 0;

function Delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Update() {
    if (fpsTracking && FpsLogCurrentCooldown <= 0)
        console.log("Physics fps: " + (1 / deltaTime) + "; Physics deltaTime: " + (deltaTime));
    
    startDate = new Date();

    if (Input.GetKey(KeyboardKey.Enter))
        document.body.requestPointerLock();

    for (let obj of Updatable)
        obj.Update();
    // console.log(Input.GetAxis("vertical"));

    Input.mouseDeltaX = 0;
    Input.mouseDeltaY = 0;

    endDate = new Date();
    deltaTime = (endDate - startDate) / 1000;
}

async function Init() {
    Input.Init();

    // new MiniMap(10, 0.25);

    new Player(new Vector3(0, 0, 0), new Vector3(0, -Math.PI / 2, 0), 2, 10);
    
    for (let i = 0; i < 5; ++i)
        for (let j = 0; j < 300; ++j)
            new Enemy(new Vector3(0, i * -0.2, j * -0.2));

    while (true) {
        FpsLogCurrentCooldown -= finalDeltaTime;

        finalStartTime = new Date();

        await Update();

        renderStartTime = new Date();

        Render();
        
        renderEndTime = new Date();
        renderDeltaTime = (renderEndTime - renderStartTime) / 1000;

        await Delay(0);

        finalEndTime = new Date();
        finalDeltaTime = (finalEndTime - finalStartTime) / 1000;

        if (fpsTracking && FpsLogCurrentCooldown <= 0)
        {
            console.log("Render fps: " + (1 / renderDeltaTime) + "; Render deltaTime: " + renderDeltaTime);
            console.log("Final fps: " + (1 / finalDeltaTime) + "; Final deltaTime: " + finalDeltaTime + "\n\n");

            FpsLogCurrentCooldown = FpsLogCooldown;
        }
    }
}

Init();