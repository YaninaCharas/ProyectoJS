// class categoriaServicio {
//     constructor (tipo,fliaProducto) {
//         this.tipo = tipo;
//         this.activo = true;
//     }
// }
// const listaCategServicio = [];
// listaCategServicio.push(new categoriaServicio("Hombre", true));
// listaCategServicio.push(new categoriaServicio("Mujer", true));
// listaCategServicio.push(new categoriaServicio("Casa", true));
// listaCategServicio.push(new categoriaServicio("Productos", true));

// listaCategServicio.push(new categoriaServicio("Hombre","Lavado y Secado", true));
// listaCategServicio.push(new categoriaServicio("Mujer","Lavado y Secado", true));
// listaCategServicio.push(new categoriaServicio("Casa","Lavado y Secado", true));
// listaCategServicio.push(new categoriaServicio("Productos","Lavado y Secado", true));

// listaCategServicio.push(new categoriaServicio("Hombre","Prendas de Casa", true));
// listaCategServicio.push(new categoriaServicio("Mujer","Prendas de Casa", true));
// listaCategServicio.push(new categoriaServicio("Casa","Prendas de Casa", true));
// listaCategServicio.push(new categoriaServicio("Productos","Prendas de Casa", true));



class FliaProductos {
    constructor (fliaProducto, producto, activo) {

        this.fliaProducto = fliaProducto;
        this.producto = producto;
        this.activo = true;
    }
}
const listaFliaProductos = [];
listaFliaProductos.push(new FliaProductos("Tintoreria", "Desmanchado, lavado y Planchado", true));
listaFliaProductos.push(new FliaProductos("Casa", "Lavado y Secado", true));
listaFliaProductos.push(new FliaProductos("Planchado", "Solo Plancha de Prendas", true));
listaFliaProductos.push(new FliaProductos("Productos", "Adicionales", true));


class Productos {
    constructor (categoria,producto, descripcion, precio) {
        this.categoria = categoria;
        this.producto = producto;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
const listaProductos = [];
listaProductos.push(new Productos("Tintoreria","Hombre","Camisa", 420));
listaProductos.push(new Productos("Tintoreria","Hombre","Traje", 1850));
listaProductos.push(new Productos("Tintoreria","Hombre","Remera", 420));
listaProductos.push(new Productos("Tintoreria","Hombre","Corbata", 420));
listaProductos.push(new Productos("Tintoreria","Hombre","Pantalon", 850));
listaProductos.push(new Productos("Tintoreria","Hombre","Campera", 1950));
listaProductos.push(new Productos("Tintoreria","Hombre","Camperon", 2300));
listaProductos.push(new Productos("Tintoreria","Hombre","Campera de Plumas", 3300));
listaProductos.push(new Productos("Tintoreria","Hombre","Tapado", 3300));

listaProductos.push(new Productos("Planchado","Hombre","Camisa", 420));
listaProductos.push(new Productos("Planchado","Hombre","Traje", 1850));
listaProductos.push(new Productos("Planchado","Hombre","Remera", 420));
listaProductos.push(new Productos("Planchado","Hombre","Corbata", 420));
listaProductos.push(new Productos("Planchado","Hombre","Pantalon", 850));
listaProductos.push(new Productos("Planchado","Hombre","Campera", 1950));
listaProductos.push(new Productos("Planchado","Hombre","Camperon", 2300));
listaProductos.push(new Productos("Planchado","Hombre","Campera de Plumas", 3300));
listaProductos.push(new Productos("Planchado","Hombre","Tapado", 3300));

listaProductos.push(new Productos("Casa","Prendas de Casa","Valet", 990));
listaProductos.push(new Productos("Casa","Prendas de Casa","Acolchado 1 Plaza",1350));
listaProductos.push(new Productos("Casa","Prendas de Casa","Acolchado 2 Plazas", 1950));
listaProductos.push(new Productos("Casa","Prendas de Casa","Acolchado King Size", 2450));
listaProductos.push(new Productos("Casa","Prendas de Casa","Plumon 1 Plaza", 2350));
listaProductos.push(new Productos("Casa","Prendas de Casa","Plumon 2 Plazas", 2950));
listaProductos.push(new Productos("Casa","Prendas de Casa","Plumon King Size", 3450));

listaProductos.push(new Productos("Tintoreria","Mujer","Camisa", 320));
listaProductos.push(new Productos("Tintoreria","Mujer","Remera", 320));
listaProductos.push(new Productos("Tintoreria","Mujer","Pantalon", 1650));
listaProductos.push(new Productos("Tintoreria","Mujer", "Vestido", 1650));
listaProductos.push(new Productos("Tintoreria","Mujer", "Pollera", 1050));

listaProductos.push(new Productos("Planchado","Mujer","Camisa", 320));
listaProductos.push(new Productos("Planchado","Mujer","Remera", 320));
listaProductos.push(new Productos("Planchado","Mujer","Pantalon", 1650));
listaProductos.push(new Productos("Planchado","Mujer","Vestido", 1650));
listaProductos.push(new Productos("Planchado","Mujer","Pollera", 1150));

listaProductos.push(new Productos("Productos","Adicionales", "Sanitizante", 350));
listaProductos.push(new Productos("Productos","Adicionales", "Plancha Plus", 450));
listaProductos.push(new Productos("Productos","Adicionales", "Blanqueador", 520));
listaProductos.push(new Productos("Productos","Adicionales", "Perfumina", 1200));

class Pedidos {
    constructor (numero,celular, producto, cantidad, precio, tipoEntrega) {
        this.idPedido = numero;
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
listaPedidos.push(new Pedidos(1,1134317751,"Camisa",1, 450, "D"));
listaPedidos.push(new Pedidos(1,1134317751,"Remera",1, 420, "D"));
listaPedidos.push(new Pedidos(1,1134317751,"Campera",1, 1850, "D"));
listaPedidos.push(new Pedidos(1,1134317751,"Vestido",2, 1300, "D"));
listaPedidos.push(new Pedidos(2,1147761102,"Camisa",1, 420, "L"));
listaPedidos.push(new Pedidos(3,1144445555,"Plumon 1 Plaza",1, 2350, "D"));
listaPedidos.push(new Pedidos(4,1148551234,"Perfumina",2, 1200, "L"));

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
    let ingreso=true;
    nombre ="";
    apellido ="";
    celular =0;
    email = "";
    const listaClientes = [];
    while (ingreso)
    {
        nombre = prompt("Ingrese su nombre: ");
        apellido = prompt("Ingrese su apellido: ");
        celular = parseInt(prompt("Ingrese su telefono o Celular: "));
        email = prompt("Ingrese su email: ");
        if ((nombre !=="")&&(apellido !=="")&&(celular !=="")&&(email!=="")){
            ingreso=false
        }
        else{
            alert("Debe ingresar toda la informacion solicitada")
        }
    }
    listaClientes.push(new Clientes(
        nombre,
        apellido,
        celular,
        codigoPostal,
        email)
        );
        listaClientes.forEach( (cliente) => {
    
            console.log(
                `Cliente:
                Celular Cliente: ${cliente.celular}
                Nombre y Apellido: ${cliente.nombre} ${cliente.apellido}
                Email: ${cliente.email}
                Codigo Postal: ${cliente.codigoPostal}
                \n------------------------------------------------------`);               
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
 //       alert("Bienvenid@ podemos llegar a tu zona, el costo del delivery es de $"+calcularCostoDelivery(codigoPostal));
        const listaClientes = [];
        iterar="NO";
        registrar(codigoPostal)
        alert(`Hola ${nombre}! el costo del delivery es de $`+calcularCostoDelivery(codigoPostal));
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
        \n------------------------------------------------------`);
});

console.log("Array Nuevo de Productos seleccionados\n ")
const newProducts = listaProductos.filter( (producto) => {
    if (producto.producto === "Desmanchado, Lavado y Planchado")
    {
        return(producto);
    }
});
console.log(newProducts);
console.log("------------------------------------------------------");

console.log("Lista de Pedidos:\n ");
listaPedidos.forEach((pedidos) => {
            console.log(
                `
                IdPedido: ${pedidos.idPedido}
                Celular Cliente: ${pedidos.celular}
                Descripcion: ${pedidos.producto}
                Cantidad: ${pedidos.cantidad}
                Precio: $${pedidos.precio}
                Entrega: ${pedidos.tipoEntrega}
                \n------------------------------------------------------`);
});
const totalPedido = listaPedidos.reduce((acc,item) =>{
return acc = acc+(item.precio*item.cantidad)},0);

console.log(`El total a pagar de Todos los pedidos es: ${totalPedido}`);


console.log("---------Nuevo Array con Importe Total-------------------")
const pedidosConImporteTotal = listaPedidos.map( (pedido) => {
    const importeTotal = pedido.precio*pedido.cantidad;
    pedido.importeTotal = importeTotal;
    return pedido;
})

console.log(pedidosConImporteTotal)
;




