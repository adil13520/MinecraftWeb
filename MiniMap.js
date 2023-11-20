class MiniMap
{
    constructor (mapArea, spriteSize)
    {
        if (MainCamera != undefined)
            this.position = MainCamera.parent.position;

        this.mapArea = mapArea;
        this.spriteWidth = spriteSize;
        this.spriteHeight = spriteSize / windowAspectRatio;

        this.displayedElementsRadius = 7;
        
        new Sprite(new Vector2(-1, -1), SpriteType.Rect, "white", 4, [this.spriteWidth, this.spriteHeight]);
        new Sprite(new Vector2(this.spriteWidth / 2 - 1, this.spriteHeight / 2 - 1), SpriteType.Circle, "blue", 0, 
                               [this.displayedElementsRadius]);

        this.displayedElements = [];

        this.cameraViewRadius = 0.1;

        Updatable.push(this);
    }

    Update()
    {
        for (let element of this.displayedElements)
            element.Destruct();

        this.position = MainCamera.parent.position;

        if (MainCamera != undefined)
        {
            let firstCameraViewPoint = new Vector2(this.spriteWidth / 2 - 1 + this.cameraViewRadius * Math.cos(-MainCamera.rotation.y - MainCamera.fov / 2),
                                               this.spriteHeight / 2 - 1 - this.cameraViewRadius * Math.sin(-MainCamera.rotation.y - MainCamera.fov / 2) / windowAspectRatio);
            let secondCameraViewPoint = new Vector2(this.spriteWidth / 2 - 1 + this.cameraViewRadius * Math.cos(MainCamera.fov / 2 - MainCamera.rotation.y),
                                               this.spriteHeight / 2 - 1 - this.cameraViewRadius * Math.sin(MainCamera.fov / 2 - MainCamera.rotation.y) / windowAspectRatio);

            this.displayedElements.push(new Sprite(new Vector2(this.spriteWidth / 2 - 1, this.spriteHeight / 2 - 1),
                        SpriteType.Line, "", 3, [firstCameraViewPoint]));
            this.displayedElements.push(new Sprite(new Vector2(this.spriteWidth / 2 - 1, this.spriteHeight / 2 - 1),
                        SpriteType.Line, "", 3, [secondCameraViewPoint]));
        }

        for (let mesh of Meshes)
        {
            let relativePosition = Vector3.Subtract(mesh.parent.position, this.position);

            if (Math.abs(relativePosition.x / this.mapArea) <= 0.49 && Math.abs(relativePosition.z / this.mapArea) <= 0.49)
            {
                let spritePosition = new Vector2(relativePosition.x / this.mapArea * this.spriteWidth - 1 + this.spriteWidth / 2, 
                                             relativePosition.z / this.mapArea * this.spriteHeight - 1 + this.spriteHeight / 2);

                this.displayedElements.push(new Sprite(spritePosition, SpriteType.Circle, "black", 0, 
                                                    [this.displayedElementsRadius]));
            }
        }
    }
}