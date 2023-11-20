function Render()
{
    drawer.clearRect(0, 0, canvasWidth, canvasHeight);

    if (drawer.fillStyle != backgroundColor)
        drawer.fillStyle = backgroundColor;
    
    drawer.fillRect(0, 0, canvasWidth, canvasHeight);

    drawer.lineWidth = 1;

    for (let mesh of Meshes)
    {
        drawer.beginPath();

        for (let triangle of mesh.triangles)
        {
            let success = true;

            let normalizedPoints = [];

            let vert;
            let projectedPoint;
            let inBounds = 0;

            for (let i = 0; i < 3; ++i)
            {
                vert = Vector3.Subtract(Vector3.Sum(triangle.verts[i], mesh.parent.position, MainCamera.parent.position), 
                                            MainCamera.position);   

                projectedPoint = ProjectPoint(vert);

                if (projectedPoint == undefined)
                    success = false;

                if (success)
                {
                    if (projectedPoint.x >= -1 && projectedPoint.x <= 1 && projectedPoint.y >= -1 && projectedPoint.y <= 1)
                        ++inBounds;

                    normalizedPoints.push(projectedPoint);
                }
            }

            if (success && inBounds > 0)
                AddLines(normalizedPoints);
        }

        drawer.closePath();
        drawer.stroke();
    }

    for (let sprite of Sprites)
    {
        drawer.beginPath();

        if (sprite.type == SpriteType.Rect)
        {
            AddLines(sprite.verts);
        }
        else if (sprite.type == SpriteType.Circle)
        {
            let tempPosition = NormalizedToAbsolute(sprite.position);

            drawer.arc(tempPosition.x, tempPosition.y, sprite.radius, 0, 2 * Math.PI);
        }
        else if (sprite.type == SpriteType.Line)
        {
            let tempPosition = NormalizedToAbsolute(sprite.position);
            let tempTarget = NormalizedToAbsolute(sprite.target);

            drawer.moveTo(tempPosition.x, tempPosition.y);
            drawer.lineTo(tempTarget.x, tempTarget.y);
        }

        drawer.closePath();

        if (sprite.fillColor != "transparent")
        {
            if (drawer.fillStyle != sprite.fillColor)
                drawer.fillStyle = sprite.fillColor;
            
            drawer.fill();
        }

        if (sprite.borderWidth > 0)
        {
            if (drawer.lineWidth != sprite.borderWidth)
                drawer.lineWidth = sprite.borderWidth;
            
            drawer.stroke();
        }
    }
}

function ProjectPoint(point)
{
    point = Vector3.Divide(point, 3);

    let distanceX = Math.sqrt(point.x * point.x + point.z * point.z);
    let distanceY = Math.sqrt(point.y * point.y + point.z * point.z);

    let angleX = 0;
    let angleY = 0;

    if (distanceX != 0)
        angleX = Math.asin(point.z / distanceX);

    if (distanceY != 0)
        angleY = Math.asin(point.z / distanceY);

    if (point.x < 0)
        angleX = Math.PI - angleX;

    if (point.y < 0)
        angleY = Math.PI - angleY;

    angleX -= MainCamera.rotation.y + Math.PI / 2;
    angleX = -angleX % (Math.PI * 2);

    angleY -= MainCamera.rotation.x;
    angleY = -angleY % (Math.PI * 2);

    let newPoint = new Vector3(Math.cos(angleX) * distanceX, point.y, 
                               Math.sin(angleX) * distanceX);    

    if (newPoint.z > MainCamera.clipping)
    {
        let normalizedX = newPoint.x * MainCamera.fovDist / newPoint.z;
        let normalizedY = newPoint.y * MainCamera.fovDist / newPoint.z / windowAspectRatio;

        return new Vector2(normalizedX, normalizedY);
    }

    return undefined;
}