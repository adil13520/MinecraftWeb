class Vector2
{
    constructor (x, y)
    {
        this.x = x;
        this.y = y;
    }

    static get zero()
    {
        return new Vector2(0, 0);
    }

    static Subtract()
    {
        return new vec3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
    }
}

class SpriteType
{
    static Rect = 0;
    static Circle = 1; 
    static Line = 2;
}

class Sprite 
{
    // args: 
    //      Rect: xSize, ySize
    //      Circle: radius
    //      Line: target

    constructor (position, type, fillColor, borderWidth, args)
    {
        this.position = position;
        this.type = type;
        this.fillColor = fillColor;
        this.borderWidth = borderWidth;
        this.verts = undefined;

        if (type == SpriteType.Rect)
        {
            this.verts = [position, new Vector2(position.x + args[0], position.y),
                          new Vector2(position.x + args[0], position.y + args[1]),
                          new Vector2(position.x, position.y + args[1])];
        }
        else if (type == SpriteType.Circle)
        {
            this.radius = args[0];
        }
        else if (type == SpriteType.Line)
        {
            this.target = args[0];
        }

        Sprites.push(this);
    }

    Destruct ()
    {
        let result = [];

        for (let sprite of Sprites)
            if (sprite != this)
                result.push(sprite);

        Sprites = result;
    }
}