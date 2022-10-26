class PedidosItems {
        constructor (numero, item,celular, producto, cantidad, precio, imagen, tipoEntrega) {
            this.idPedido = numero;
            this.idItems = item;
            this.celular = celular;
            this.producto = producto;
            this.cantidad = cantidad;
            this.precio = precio;
            this.imagen = imagen;
            this.tipoEntrega = tipoEntrega;
            this.activo = true;
}
    // verificar (celular) {
    //     if((this.celular) === celular){
    //         console.log(`Pedido Existente ${this.celular} ${this.producto} ${this.cantidad} $${this.precio} ${this.tipoEntrega}`);
    //     } else {
    //         console.log(`Pedido inexistente ${this.celular} `);
    //     }
    // }

    // desactivar (celular) {
    //     if(((this.celular) === celular)&&(this.activo)) {
    //         this.activo = false;
    //         console.log(`Pedido dado de baja correctamente: ${this.celular} Estado: ${this.activo}`);
    //     } else {
    //         console.log(`Pedido Inexistente ${this.celular}`);
    //     }
    // }

}