class FliaProductos {
    constructor (fliaProducto, producto, activo) {

        this.fliaProducto = fliaProducto;
        this.producto = producto;
        this.activo = true;
    }
}

class Productos {
    constructor (categoria,producto, descripcion, precio) {
        this.categoria = categoria;
        this.producto = producto;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
