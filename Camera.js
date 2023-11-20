class Camera
{
    // fov - deg

    constructor (parent, relativePosition, relativeRotation, fov, clipping)
    {
        MainCamera = this;
        
        this.parent = parent;
        this.relativePosition = relativePosition;
        this.relativeRotation = relativeRotation;
        this.fov = fov;
        this.fovDist = 2 / fov;
        this.clipping = clipping;
        this.position = Vector3.zero;
        this.rotation = Vector3.zero;

        Updatable.push(this);
    }

    Update()
    {
        this.position = Vector3.Sum(this.parent.position, this.relativePosition);
        this.rotation = Vector3.Sum(this.parent.rotation, this.relativeRotation);
    }
}