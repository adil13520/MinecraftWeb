class Enemy
{
    constructor (position)
    {
        new MeshCube(this, 0.2);

        this.position = position;

        Updatable.push(this);
    }

    Update()
    {

    }
}