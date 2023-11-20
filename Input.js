class KeyboardKey
{
    static A = "KeyA";
    static D = "KeyD";
    static W = "KeyW";
    static S = "KeyS";
    static Q = "KeyQ";
    static E = "KeyE";
    static Enter = "Enter";
    static ArrowLeft  = "ArrowLeft";
    static ArrowRight = "ArrowRight";
    static ShiftLeft = "ShiftLeft";
}

class Input
{
    static mouseSensitivity = 0.008;
    static mouseDeltaX;
    static mouseDeltaY;

    static _pressedKeys = [];

    static GetKey(inputKey)
    {
        for (let key of this._pressedKeys)
            if (key == inputKey)
                return true;
        
        return false;
    }

    static GetAxisRow(axis)
    {
        axis = axis.toLowerCase();

        if (axis == "horizontal")
            return this.GetKey(KeyboardKey.D) - this.GetKey(KeyboardKey.A);
        else if (axis == "vertical")
            return this.GetKey(KeyboardKey.W) - this.GetKey(KeyboardKey.S);
    }

    static GetAxis(axis)
    {
        axis = axis.toLowerCase();

        let result = 0;

        if (axis == "horizontal")
            result = this.mouseDeltaX;
        else if (axis == "vertical")
            result = this.mouseDeltaY;

        return result * this.mouseSensitivity;
    }

    static Init()
    {
        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0;

        document.onkeydown = (key) => {
            if (this._pressedKeys.indexOf(key.code) == -1)
                this._pressedKeys.push(key.code);
        };

        document.onkeyup = (key) => {
            let result = [];

            for (let pressedKey of this._pressedKeys)
                if (pressedKey != key.code)
                    result.push(pressedKey);
            
            this._pressedKeys = result;
        };

        document.onmousemove = (event) => {
            this.mouseDeltaX += event.movementX;
            this.mouseDeltaY += event.movementY; 
        }
    }
}