class FliaProductos {
    constructor (fliaProducto, producto, activo) {

        this.fliaProducto = fliaProducto;
        this.producto = producto;
        this.activo = true;
    }
}
const listaFliaProductos = [];
listaFliaProductos.push(new FliaProductos("Tintoreria", "Desmanchado, lavado y Planchado", true));
listaFliaProductos.push(new FliaProductos("Lavado y Secado", "Prendas de Casa", true));
listaFliaProductos.push(new FliaProductos("Solo Planchado", "Prendas de vestir", true));
listaFliaProductos.push(new FliaProductos("Productos", "Adicionales", true));


class Productos {
    constructor (producto, descripcion, precio) {
        this.producto = producto;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
const listaProductos = [];
listaProductos.push(new Productos("Desmanchado, Lavado y Planchado","Camisa", 420));
listaProductos.push(new Productos("Desmanchado, Lavado y Planchado","Remera", 420));
listaProductos.push(new Productos("Desmanchado, Lavado y Planchado","Pantalon", 850));
listaProductos.push(new Productos("Desmanchado, Lavado y Planchado","Vestido", 850));
listaProductos.push(new Productos("Prendas de Casa","Valet", 990));
listaProductos.push(new Productos("Prendas de Casa","Acolchado 1 Plaza",1350));
listaProductos.push(new Productos("Prendas de Casa","Acolchado 2 Plazas", 1950));
listaProductos.push(new Productos("Prendas de Casa","Acolchado King Size", 2450));
listaProductos.push(new Productos("Prendas de Casa","Plumon 1 Plaza", 2350));
listaProductos.push(new Productos("Prendas de Casa","Plumon 2 Plazas", 2950));
listaProductos.push(new Productos("Prendas de Casa","Plumon King Size", 3450));
listaProductos.push(new Productos("Prendas de vestir","Camisa", 320));
listaProductos.push(new Productos("Prendas de vestir","Remera", 320));
listaProductos.push(new Productos("Prendas de vestir","Pantalon", 650));
listaProductos.push(new Productos("Prendas de vestir", "Vestido", 650));
listaProductos.push(new Productos("Adicionales", "Sanitizante", 350));
listaProductos.push(new Productos("Adicionales", "Plancha Plus", 450));
listaProductos.push(new Productos("Adicionales", "Blanqueador", 520));
listaProductos.push(new Productos("Adicionales", "Perfumina", 1200));

class Pedidos {
    constructor (celular, producto, cantidad, precio, tipoEntrega) {
        this.celular = celular;
        this.producto = producto;
        this.cantidad = cantidad;
        this.precio = precio;
        this.tipoEntrega = tipoEntrega;
        this.activo = true
    }
    verificar (celular) {
        if((this.celular) === celular){
            console.log(`Pedido Existente ${this.celular} ${this.producto} ${this.cantidad} $${this.precio} ${this.tipoEntrega}`);
        } else {
            console.log(`Pedido inexistente ${this.celular} `);
        }
    }

    desactivar (celular) {
        if(((this.celular) === celular)&&(this.activo)) {
            this.activo = false;
            console.log(`Pedido dado de baja correctamente: ${this.celular} Estado: ${this.activo}`);
        } else {
            console.log(`Pedido Inexistente ${this.celular}`);
        }
    }

}
const listaPedidos = [];
listaPedidos.push(new Pedidos(1134317751,"Vestido",1, 650, "D"));
listaPedidos.push(new Pedidos(1147761102,"Camisa",1, 420, "L"));
listaPedidos.push(new Pedidos(1144445555,"Plumon 1 Plaza",1, 2350, "D"));
listaPedidos.push(new Pedidos(1148551234,"Perfumina",2, 2400, "L"));

listaPedidos[0].verificar(1134317751);
listaPedidos[1].verificar(1147761102);
listaPedidos[2].verificar(1148551238);
listaPedidos[2].desactivar(1147761102);
listaPedidos[0].desactivar(1134317751);


class TipoEntregas {
    constructor (tipoEntrega, descripcion) {
        this.tipoEntrega = tipoEntrega;
        this.descripcion = descripcion;
    }
}
const listaTipoEntrega = [];
listaTipoEntrega.push(new TipoEntregas("D","Delivery"));
listaTipoEntrega.push(new TipoEntregas("L","Local"));

//La Clave unica es el celular
class Clientes {
    constructor (nombre, apellido, celular, codigoPostal,email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this.codigoPostal = codigoPostal,
        this.email = email
        this.activo = true;
    }
    verificar (celular) {
        if((this.celular) === celular){
            console.log(`Cliente Existente ${this.nombre} ${this.apellido} ${celular}`);
        } else {
            console.log(`Cliente inexistente ${this.nombre} ${this.apellido} ${celular}`);
        }
    }

    desactivar (celular) {
        if(((this.celular) === celular)&&(this.activo)) {
            this.activo = false;
            console.log(`Cliente dado de baja correctamente Nombre y Apellido: ${this.nombre} ${this.apellido} Telefono/Celular ${this.celular} Email ${this.email} Estado ${this.activo}`);
        } else {
            console.log(`Cliente Inexistente o Inactivo ${this.nombre} ${this.apellido} Telefono/Celular ${this.celular} Email ${this.email} Estado ${this.activo}`);
        }
    }
}

function registrar(codigoPostal){
    const listaClientes = [];
    listaClientes.push(new Clientes
        (prompt("Ingrese su nombre: "),
        prompt("Ingrese su apellido: "),
        parseInt(prompt("Ingrese su telefono o Celular: ")),
        codigoPostal,
        prompt("Ingrese su email: "))
        );

        listaClientes.forEach( (cliente) => {
    
            console.log(
                `Cliente:
                Celular Cliente: ${cliente.celular}
                Nombre y Apellido: ${cliente.nombre} ${cliente.apellido}
                Email: ${cliente.email}
                Codigo Postal: ${cliente.codigoPostal}
                \n----------------------------------`);               
        });
}

/********************DEFINICION DE OBJETOS */

function calcularCostoDelivery(codigoPostal){
    if ((codigoPostal>1000)&&(codigoPostal<=1400)){
        costo = 600;
    }
    else{
        costo = 1200;
    }
    return(costo)
}
 
let iterar = "SI";
while (iterar==="SI"){
    let codigoPostal = parseInt(prompt("Ingrese su Codigo Postal"));
    if ((codigoPostal>=1000)&&(codigoPostal<=1600)){
        alert("Bienvenid@ podemos llegar a tu zona, el costo del delivery es de $"+calcularCostoDelivery(codigoPostal));
        const listaClientes = [];
        iterar="NO";
        registrar(codigoPostal)
        //Aca deberia dar de alta el cliente
    }
    else{
        iterar = prompt(" Lo lamentamos pero No llega el Delivery a tu Zona,escribi Seguir si queres ingresar otro Codigo Postal o escribi Salir ");
            while ((iterar === "")||((iterar!="Seguir")&&(iterar!="Salir"))){
            iterar = prompt('Lo lamentamos pero No llega el Delivery a tu Zona,escribi Seguir si queres ingresar otro Codigo Postal o escribi Salir ');
        }
        if (iterar == "Seguir"){
            iterar ="SI"
        }
        else{
            iterar = "NO"
        }
        
    }
}
/******** Listado de Datos */
console.log("Lista de Productos:\n ");

listaProductos.forEach((producto) => {

    console.log(
        `
        Nombre: ${producto.producto}
        Descripcion: ${producto.descripcion}
        Precio: $${producto.precio}
        \n----------------------------------`);
});

console.log("Lista de Pedidos:\n ");

listaPedidos.forEach((pedidos) => {

    console.log(
        `
        Celular Cliente: ${pedidos.celular}
        Descripcion: ${pedidos.producto}
        Cantidad: ${pedidos.cantidad}
        Precio: $${pedidos.precio}
        Entrega: ${pedidos.tipoEntrega}
        \n----------------------------------`);
});

