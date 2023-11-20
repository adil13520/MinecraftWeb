class Vector3
{
    constructor (x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get zero()
    {
        return new Vector3(0, 0, 0);
    }

    static Sum(vec1, vec2)
    {
        return new Vector3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
    }

    static Subtract(vec1, vec2)
    {
        return new Vector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
    }

    static Multiply(vec, value)
    {
        return new Vector3(vec.x * value, vec.y * value, vec.z * value);
    }

    static Divide(vec, value)
    {
        return new Vector3(vec.x / value, vec.y / value, vec.z / value);
    }
}

class Mesh
{
    constructor (parent, triangles)
    {
        this.parent = parent;
        this.triangles = triangles;

        Meshes.push(this);
    }

    Destruct ()
    {
        let result = [];

        for (let mesh of Meshes)
            if (mesh != this)
                result.push(mesh);

        Meshes = result;
    }
}

class MeshCube extends Mesh 
{
    constructor (parent, size)
    {
        let triangles = [
            // front
            new Triangle([new Vector3(-0.5, -0.5, 0.5), new Vector3(-0.5, 0.5, 0.5), new Vector3(0.5, -0.5, 0.5)]),
            new Triangle([new Vector3(0.5, -0.5, 0.5), new Vector3(-0.5, 0.5, 0.5), new Vector3(0.5, 0.5, 0.5)]),
            // left
            new Triangle([new Vector3(-0.5, 0.5, -0.5), new Vector3(-0.5, -0.5, -0.5), new Vector3(-0.5, 0.5, 0.5)]),
            new Triangle([new Vector3(-0.5, 0.5, 0.5), new Vector3(-0.5, -0.5, -0.5), new Vector3(-0.5, -0.5, 0.5)]),
            // back
            new Triangle([new Vector3(-0.5, 0.5, -0.5), new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, 0.5, -0.5)]),
            new Triangle([new Vector3(0.5, 0.5, -0.5), new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, -0.5, -0.5)]),
            // right
            new Triangle([new Vector3(0.5, 0.5, 0.5), new Vector3(0.5, -0.5, 0.5), new Vector3(0.5, 0.5, -0.5)]),
            new Triangle([new Vector3(0.5, 0.5, -0.5), new Vector3(0.5, -0.5, -0.5), new Vector3(0.5, -0.5, 0.5)]),
            // top
            new Triangle([new Vector3(-0.5, -0.5, 0.5), new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, -0.5, 0.5)]),
            new Triangle([new Vector3(0.5, -0.5, 0.5), new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, -0.5, -0.5)]),
            // bottom
            new Triangle([new Vector3(-0.5, 0.5, 0.5), new Vector3(-0.5, 0.5, -0.5), new Vector3(0.5, 0.5, -0.5)]),
            new Triangle([new Vector3(0.5, 0.5, -0.5), new Vector3(0.5, 0.5, 0.5), new Vector3(-0.5, 0.5, 0.5)]),
        ];

        for (let i = 0; i < triangles.length; ++i)
            for (let j = 0; j < 3; ++j)
                triangles[i].verts[j] = Vector3.Multiply(triangles[i].verts[j], size);

        super(parent, triangles);
    }
}

class Triangle
{
    constructor (verts)
    {
        this.verts = verts;
    }
}