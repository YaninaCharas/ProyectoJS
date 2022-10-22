/***************VARIABLES */
const fechaDeHoy = new Date();
const listaFliaProductos = [];
const listaProductos = [];
const listaPedidos = [];
const listaTipoEntrega = [];
const reservas = obtenerReservas();

const select1 = document.getElementById(`comboFliaProductos`);
const select2 = document.getElementById(`comboProductos`);
const formDeReserva = document.getElementById("reserva");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputCelular = document.getElementById("celular");
const inputEmail = document.getElementById("email");
const inputFecha = document.getElementById("fecha")
const inputCodigoPostal = document.getElementById("codigoPostal");
let idPedido = 0;

select1.addEventListener("change",validarSeleccion);
select2.addEventListener("change",validarSeleccion);

/****************FUNCIONES */
function validarSeleccion(){
    const valorSelect1 = select1.value;
    const valorSelect2 = select2.value;
    if(valorSelect1 && valorSelect2){
    
        console.log("****************Array Nuevo de seleccion*****************\n ")
        let productoSeleccionado = listaProductos.filter( (producto) => {
            if((producto.producto === valorSelect2)&&(producto.categoria === valorSelect1))
            { 
                return ( producto )
            }
        });
        let cad = ""
        console.log(productoSeleccionado.length)
        if (productoSeleccionado.length>0){
            console.log(productoSeleccionado);
            for (let i=0; i< productoSeleccionado.length; i++){
                if (i===0){
                cad = `
                    <section id="seleccion-dely" class="row-dely">
                    <div class="column-dely">
                      <img alt="Honey" class="img-dely" src="../images/${valorSelect2}${i+1}.jpg">
                      <p class="p-dely">Ingrese la Cantidad</p>
                      <input class="p-dely-input" type="number"id=idnumber${i+1} value=0>
                      <div>
                        <button class="btn-ok-dely">Agregar</button>
                       </div>
                    </div>
                    `;     
                }
                else{
                cad += `
                <div class="column-dely">
                  <img alt="Honey" class="img-dely" src="../images/${valorSelect2}${i+1}.jpg">
                  <p class="p-dely">Ingrese la Cantidad</p>
                  <input class="p-dely-input" type="number" id=idnumber${i+1} value=0>
                  <div>
                    <button class="btn-ok-dely">Agregar</button>
                   </div>
                </div>
                `;  
                }
        
        
              document.getElementById("IdSeleccion").innerHTML=cad;  
            }
        }
        else
        {
            cad = `
                <section id="seleccion-dely" class="row-dely">
                <div class="column-dely">
                <h2>No Hay Productos Para La Seleccion Realizada</h2>
                </div>
                `;     
                document.getElementById("IdSeleccion").innerText="No Hay Productos Para La Seleccion Realizada";
        }   
    }

    console.log("------------------------------------------------------");
}

function fechaDisponible(fecha){
    return !reservas.some ( (elemento) =>{
        return elemento.fecha === fecha;
    })
}

function obtenerReservas(){
    const reservasLS = localStorage.getItem("reservas");

    if (reservasLS !== null){
        return JSON.parse(reservasLS);
    }
    return [];
}
/**************INSTANCIAR ARRAYS */

listaFliaProductos.push(new FliaProductos("Tintoreria", "Desmanchado, lavado y Planchado", true));
listaFliaProductos.push(new FliaProductos("Casa", "Lavado y Secado", true));
listaFliaProductos.push(new FliaProductos("Planchado", "Solo Plancha de Prendas", true));
listaFliaProductos.push(new FliaProductos("Productos", "Adicionales", true));

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

listaProductos.push(new Productos("Lavado","Casa","Valet", 990));
listaProductos.push(new Productos("Lavado","Casa","Acolchado 1 Plaza",1350));
listaProductos.push(new Productos("Tintoreria","Mujer","Camisa", 320));
listaProductos.push(new Productos("Tintoreria","Mujer","Remera", 320));
listaProductos.push(new Productos("Tintoreria","Mujer","Pantalon", 1650));
listaProductos.push(new Productos("Tintoreria","Mujer", "Vestido", 1650));
listaProductos.push(new Productos("Tintoreria","Mujer", "Pollera", 1050));
listaProductos.push(new Productos("Tintoreria","Mujer", "Blusa", 1050));

listaProductos.push(new Productos("Planchado","Mujer","Camisa", 320));
listaProductos.push(new Productos("Planchado","Mujer","Remera", 320));
listaProductos.push(new Productos("Planchado","Mujer","Pantalon", 1650));
listaProductos.push(new Productos("Planchado","Mujer","Vestido", 1650));
listaProductos.push(new Productos("Planchado","Mujer","Pollera", 1150));
listaProductos.push(new Productos("Planchado","Mujer","Blusa", 1150));

listaProductos.push(new Productos("Lavado","Casa","Acolchado 2 Plazas", 1950));
listaProductos.push(new Productos("Lavado","Casa","Acolchado King Size", 2450));
listaProductos.push(new Productos("Lavado","Casa","Plumon 1 Plaza", 2350));
listaProductos.push(new Productos("Lavado","Casa","Plumon 2 Plazas", 2950));
listaProductos.push(new Productos("Lavado","Casa","Plumon King Size", 3450));

listaProductos.push(new Productos("Productos","Adicionales", "Sanitizante", 350));
listaProductos.push(new Productos("Productos","Adicionales", "Plancha Plus", 450));
listaProductos.push(new Productos("Productos","Adicionales", "Blanqueador", 520));
listaProductos.push(new Productos("Productos","Adicionales", "Perfumina", 1200));

listaPedidos.push(new Pedidos(1,1134317751,"Camisa",1, 450, "D"));
listaPedidos.push(new Pedidos(1,1134317751,"Remera",1, 420, "D"));
listaPedidos.push(new Pedidos(1,1134317751,"Campera",1, 1850, "D"));
listaPedidos.push(new Pedidos(1,1134317751,"Vestido",2, 1300, "D"));
listaPedidos.push(new Pedidos(2,1147761102,"Camisa",1, 420, "L"));
listaPedidos.push(new Pedidos(3,1144445555,"Plumon 1 Plaza",1, 2350, "D"));
listaPedidos.push(new Pedidos(4,1148551234,"Perfumina",2, 1200, "L"));

listaTipoEntrega.push(new TipoEntregas("D","Delivery"));
listaTipoEntrega.push(new TipoEntregas("L","Local"));

// listaPedidos[0].verificar(1134317751);
// listaPedidos[1].verificar(1147761102);
// listaPedidos[2].verificar(1148551238);
// listaPedidos[2].desactivar(1147761102);
// listaPedidos[0].desactivar(1134317751);

 
/*******************RESERVA */
formDeReserva.addEventListener("submit", (event) => {

    event.preventDefault()

    idPedido++
    /***********Obetenemos los valores del Input */
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const celular = inputCelular.value;
    const email = inputEmail.value;
    const fecha = inputFecha.value;
    const codigoPostal = parseInt(inputCodigoPostal.value);

    if (fechaDisponible(fecha)){
        if (fecha >= fechaDeHoy)
        {
        reservas.push({
            idPedido : idPedido,
            nombre : nombre,
            apellido : apellido,
            celular : parseInt(celular),
            email : email,
            codigoPostal : parseInt(codigoPostal),
            fecha : fecha,
        });
        }
        else
        {
            alert(`La Fecha debe ser mayor al dia de Hoy ${fecha}`)
            inputFecha = fechaDeHoy;
        }
    
        /***************Cargo la reserva al local Storage */
    
        localStorage.setItem("reservas", JSON.stringify(reservas));
        alert("Se realizo la Confirmacion");
        inputNombre.value = "";
        inputApellido.value = "";
        inputCelular.value = 0;
        inputEmail.value= "";
        inputFecha.value= "";
        inputCodigoPostal.value= 0;

    }
    else{
        alert(`Fecha no disponible, Ingrese otra ${fecha}`)
    }



});
// function seleccionarEntrega(){
//     let IdDelivery = document.getElementById("IdDelivery");
//     let cad = ""
//     const tipoEntrega = selectDelivery.value
//     if (tipoEntrega === "D"){
//         const inputCodigoPostal = document.getElementById("codigoPostal");
//         const valorInputCodigoPostal = parseInt(inputCodigoPostal.value);
//         console.log(valorInputCodigoPostal)
//         if (valorInputCodigoPostal >1200 && valorInputCodigoPostal<=1800){
//             cad=` `
//         }
//         else{
//             cad=`<h6></h6>No llegamos a su zona, debera traer las prendas al local</h6>`  
//             selectDelivery.value = "L"
//         }
//         IdDelivery.innerHTML=cad;  
//     }

// }


// function registrar(codigoPostal){
//     let ingreso=true;
//     nombre ="";
//     apellido ="";
//     celular =0;
//     email = "";
//     const listaClientes = [];
//     while (ingreso)
//     {
//         nombre = prompt("Ingrese su nombre: ");
//         apellido = prompt("Ingrese su apellido: ");
//         celular = parseInt(prompt("Ingrese su telefono o Celular: "));
//         email = prompt("Ingrese su email: ");
//         if ((nombre !=="")&&(apellido !=="")&&(celular !=="")&&(email!=="")){
//             ingreso=false
//         }
//         else{
//             alert("Debe ingresar toda la informacion solicitada")
//         }
//     }
    
//     listaClientes.push(new Clientes(
//         nombre,
//         apellido,
//         celular,
//         codigoPostal,
//         email)
//         );
//         listaClientes.forEach( (cliente) => {
    
//             console.log(
//                 `Cliente:
//                 Celular Cliente: ${cliente.celular}
//                 Nombre y Apellido: ${cliente.nombre} ${cliente.apellido}
//                 Email: ${cliente.email}
//                 Codigo Postal: ${cliente.codigoPostal}
//                 \n------------------------------------------------------`);               
//         });
// }
/******** LISTADOS  */
// console.log("Lista de Productos:\n ");

// listaProductos.forEach((producto) => {

//     console.log(
//         `
//         Nombre: ${producto.producto}
//         Descripcion: ${producto.descripcion}
//         Precio: $${producto.precio}
//         \n------------------------------------------------------`);
// });

// console.log("Lista de Pedidos:\n ");
// listaPedidos.forEach((pedidos) => {
//             console.log(
//                 `
//                 IdPedido: ${pedidos.idPedido}
//                 Celular Cliente: ${pedidos.celular}
//                 Descripcion: ${pedidos.producto}
//                 Cantidad: ${pedidos.cantidad}
//                 Precio: $${pedidos.precio}
//                 Entrega: ${pedidos.tipoEntrega}
//                 \n------------------------------------------------------`);
// });
// const totalPedido = listaPedidos.reduce((acc,item) =>{
// return acc = acc+(item.precio*item.cantidad)},0);

// console.log(`El total a pagar de Todos los pedidos es: ${totalPedido}`);


// console.log("---------Nuevo Array con Importe Total-------------------")
// const pedidosConImporteTotal = listaPedidos.map( (pedido) => {
//     const importeTotal = pedido.precio*pedido.cantidad;
//     pedido.importeTotal = importeTotal;
//     return pedido;
// })

// console.log(pedidosConImporteTotal)
// ;



