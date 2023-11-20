class Player
{
    constructor (position, rotation, speed, rotationSpeed)
    {
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
        this.rotationSpeed = rotationSpeed;
        
        new Camera(this, Vector3.zero, Vector3.zero, Math.PI / 3, 0.001);

        Updatable.push(this);
    }

    Update()
    {
        let deltaX = new Vector3(Math.cos(this.rotation.y + Math.PI / 2) * Input.GetAxisRow("horizontal"), 0, 
                                Math.sin(this.rotation.y + Math.PI / 2) * Input.GetAxisRow("horizontal"));        

        let deltaZ = new Vector3(Math.cos(this.rotation.y) * Input.GetAxisRow("vertical"), 0, 
                                Math.sin(this.rotation.y) * Input.GetAxisRow("vertical"));

        let delta = Vector3.Sum(deltaX, deltaZ);

        if (delta.x != 0 && delta.z != 0)
            delta = Vector3.Multiply(delta, Math.sqrt(2) / 2);
        
        delta = Vector3.Multiply(delta, this.speed * finalDeltaTime * (Input.GetKey(KeyboardKey.ShiftLeft) + 1));

        let deltaY = -(Input.GetKey(KeyboardKey.E) - Input.GetKey(KeyboardKey.Q)) * (Input.GetKey(KeyboardKey.ShiftLeft) + 1) * 0.7 * finalDeltaTime;

        delta.y += deltaY;

        this.position = Vector3.Sum(this.position, delta);
        
        this.rotation = Vector3.Sum(this.rotation, new Vector3(Input.GetAxis("vertical") * this.rotationSpeed * finalDeltaTime, 
                            Input.GetAxis("horizontal") * this.rotationSpeed * finalDeltaTime, 0));

        this.rotation.y %= Math.PI * 2;

        if (this.rotation.y < 0)
            this.rotation.y += Math.PI * 2;
    }
}



