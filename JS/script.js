/***************VARIABLES */

//localStorage.clear();

const listaFliaProductos = [];
const listaProductos = [];
const listaPedidos = [];
const listaTipoEntrega = [];
const reservas = obtenerReservas();
const pedidos = obtenerPedidos();
const carrito = document.getElementById("idCarrito");
let productoSeleccionado = [];
let productoPedido = "";
let categoriaPedido = "";
let precioPedido = 0;
let precioTotalPedido = 0;
let descripcionPedido = "";
let cantidadPedido = 0;
let imagenPedido = "";
let contador = 0;
let idPedido = 0;
let item = 0;
const dateHoy = new Date();
let cadena =""
let primera = true;
let tipoEntrega = "";
let hayPedido = false;

const select1 = document.getElementById(`comboFliaProductos`);
const select2 = document.getElementById(`comboProductos`);
const formDeReserva = document.getElementById("reserva");
const formDePedido = document.getElementById("pedido");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputCelular = document.getElementById("celular");
const inputEmail = document.getElementById("email");
const inputFecha = document.getElementById("fecha")
const inputCodigoPostal = document.getElementById("codigoPostal");

select1.addEventListener("change",validarSeleccion);
select2.addEventListener("change",validarSeleccion);

if (primera){
    obtenerPedidos();
    agregarCarrito();
    primera = false;
}

/****************FUNCIONES */
function validarSeleccion(){
    const valorSelect1 = select1.value;
    const valorSelect2 = select2.value;

    if(valorSelect1 && valorSelect2){
    
//****************   Array Nuevo de seleccion*****************
            productoSeleccionado = listaProductos.filter( (producto) => {
            if((producto.producto === valorSelect2)&&(producto.categoria === valorSelect1))
            { 
                return ( producto )
            }
        });
        let cad = ""
  
        if (productoSeleccionado.length>0){

            for (let i=0; i< productoSeleccionado.length; i++){
                if (i===0){
                    cad = `
                    <section id="seleccion-dely" class="row-dely">`;
                }
                cad += `
                <div class="column-dely" id="idServicio">
                  <img alt="Producto" class="img-dely" src="../images/${valorSelect2}${i+1}.jpg">`;
                  cad += `<p class="p-dely">Ingrese la Cantidad</p>
                  <input class="p-dely-input" type="number" id=idnumber${i+1} value=0 min=0>`
                  cad +=`<div>`;
                  cad += `Precio Unitario $${productoSeleccionado[i]?.precio}`;
                  cad += `</div>
                </div>`;         
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


function obtenerPedidos(){
    const pedidosLS = localStorage.getItem("pedidos");

    if (pedidosLS !== null){
        return JSON.parse(pedidosLS);
    }
    return [];
}

function fechaSeaMayorAHoy(fecha){

    const dateReserva = new Date(fecha);

/*************Validar si la fecha elegida es Mayor a Hoy */
    if (dateReserva < dateHoy){
        return false;
    }
    return true;
}
 
/*******************RESERVA */
formDeReserva.addEventListener("submit", (event) => {

    event.preventDefault()
    if (hayPedido){
    /***********Obetenemos los valores del Input */
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const celular = inputCelular.value;
    const email = inputEmail.value;
    const fecha = inputFecha.value;
    const codigoPostal = parseInt(inputCodigoPostal.value);

    // Buscar el max de idPedido de Reservas y sumarle 1 
    idPedido=1000;

    seleccionarEntrega();

    if (fechaDisponible(fecha)){

        if (fechaSeaMayorAHoy(fecha)){

            reservas.push({
                idPedido : idPedido,
                nombre : nombre,
                apellido : apellido,
                celular : parseInt(celular),
                email : email,
                codigoPostal : parseInt(codigoPostal),
                fecha : fecha,
                importe : precioTotalPedido,
            });
/***************Cargo la reserva al local Storage */    
            localStorage.setItem("reservas", JSON.stringify(reservas));

/*********   Inicializar variables del carrito Cuando se cambia de pedido*/
            let cad = ``
            document.getElementById("idtotalcarrito").innerHTML=cad; 

/*********   Inicializar parametros de busca de producto y familia de producto  */
            cad=`<div>
                    <h6>Pedido Confirmado</h6>
                    <h4>Nro de Pedido: ${idPedido}</h4>
                    <h5>${inputNombre.value} Muchas Gracias</h5>`
                    if (tipoEntrega === "D"){
                cad +=` <h6>Se coordinara su retiro para el dia</6>` 
            }
            else{
                cad+= `<h6>Podra acercarse al local el dia</h6>`
            }
            cad +=` <h6> ${inputFecha.value}</h6>
                </div>`
//            cad = ""
            // document.getElementById("IdSeleccion").innerHTML=cad;
            // document.getElementById("idAgregarCarrito").innerHTML="";

/**********SE VERIFICA SI SE QUIERE VACIAR EL LOCAL STORAGE */
            Swal.fire({
               title: `${cad}`,
               text: "Queres Vaciar el Carrito?",
               icon: 'success',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'SI',
               denyButtonText: 'NO'
             }).then((result) => {
               if (result.isConfirmed) {
                document.getElementById("idCarrito").innerHTML="";
                localStorage.clear();
                Swal.fire('Carrito Vacio!', '', 'success')
               }
             })
/*********      Inicializacion de Variables */
            inputNombre.value = "";
            inputApellido.value = "";
            inputCelular.value = 0;
            inputEmail.value= "";
            inputFecha.value= "";
            inputCodigoPostal.value= 0;

        }  
        else{
            Swal.fire({
                icon: 'error',
                title: 'Elegir Otra Fecha',
                text: 'La Fecha elegida es Menor al dia de Hoy!',
              })
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Elegir Otra Fecha',
            text: `La Fecha elegida No esta disponible! ${fecha}`,
          })
        }  
    }
    else{
        Swal.fire({
            icon: 'error',
            title: `Carrito Vacio`,
            text: `No hay Servicios Seleccionados aun!`,
          })
    }
});


/******Cargar Items a Carrito */
formDePedido.addEventListener("submit", (event) => {

    event.preventDefault()
    cad = "";
    contador = 0;
    item = 0;
    let clases = document.getElementsByClassName("p-dely-input");
    // Obtener el numero de idPedidos, tengo que buscar al max numero asignado a reservas Id y sumarle uno.
        idPedido = 1000
    for (let i=0; i< clases.length; i++){
        hayPedido = true;
        cantidadPedido = clases[i].value;
        if (cantidadPedido >0){
            item++;
            categoriaPedido = productoSeleccionado[contador].categoria;
            productoPedido = productoSeleccionado[contador].producto;
            descripcionPedido = productoSeleccionado[contador].descripcion;
            precioPedido = parseInt(productoSeleccionado[contador].precio*cantidadPedido);
            imagenPedido = productoSeleccionado[contador].producto+(i+1);
  
             /***************Cargo El Pedido En el Carrito */    
              pedidos.push({
                  idPedido : idPedido,
                  item : item,
                  producto : productoPedido,
                  categoria : categoriaPedido,
                  descripcion : descripcionPedido,
                  cantidad : cantidadPedido,
                  precio : precioPedido,
                  imagen : imagenPedido,
              });
  /***************Cargo Los Items Del Pedido al local Storage */  

              localStorage.setItem("pedidos", JSON.stringify(pedidos));

          }

          contador++;
      }   
      agregarCarrito()
});

function agregarCarrito(){
/************Blanqueo el Carrito si tenia en el LocalStorage */
    
    document.getElementById("idCarrito").innerHTML="";
    document.getElementById("idtotalcarrito").innerHTML="";

    for (let i =0 ; i< pedidos.length; i++){
 /*****************Con Append */ 
        cadena = document.createElement("section");
        cadena.innerHTML = `
         <div class="columnPedido">
         ${pedidos[i].descripcion}
         <div> <img alt="Producto" class="imgPedido" src="../images/${pedidos[i].imagen}.jpg"></div>
         <div> Cantidad ${pedidos[i].cantidad} 
               Precio $${pedidos[i].precio} </div>
        </div> `;
        carrito.append(cadena);
        precioTotalPedido = precioTotalPedido + (pedidos[i].precio);
    }
    agregarTotalPedido()

};

function agregarTotalPedido(){
    let cad = `<h5>Total a Pagar $${precioTotalPedido}</h5>`
    document.getElementById("idtotalcarrito").innerHTML=cad;

};

function seleccionarEntrega(){
    let IdDelivery = document.getElementById("IdDelivery");
    let cad = ""

    tipoEntrega = comboEntrega.value
    if (tipoEntrega ===""){
        cad=`<h6>Tipo Entrega No especificado, debera traer las prendas al local</h6>` 
        IdDelivery.innerHTML=cad; 
    }
    if (tipoEntrega === "D"){
        const inputCodigoPostal = document.getElementById("codigoPostal");
        const valorInputCodigoPostal = parseInt(inputCodigoPostal.value);

        if (valorInputCodigoPostal <1200 || valorInputCodigoPostal>1800){
            cad=`<h6>No llegamos a su zona, debera traer las prendas al local</h6>`  
            comboEntrega.value = "L"
            IdDelivery.innerHTML=cad; 
        } 
    }
}


/**************INSTANCIAR ARRAYS */
listaFliaProductos.push(new FliaProductos("Tintoreria", "Desmanchado, lavado y Planchado", true));
listaFliaProductos.push(new FliaProductos("Casa", "Lavado y Secado", true));
listaFliaProductos.push(new FliaProductos("Planchado", "Solo Plancha de Prendas", true));
listaFliaProductos.push(new FliaProductos("Productos", "Adicionales", true));

listaProductos.push(new Productos("Tintoreria","Hombre","Traje", 1850));
listaProductos.push(new Productos("Tintoreria","Hombre","Camisa", 420));
listaProductos.push(new Productos("Tintoreria","Hombre","Corbata", 420));
listaProductos.push(new Productos("Tintoreria","Hombre","Remera", 420));
listaProductos.push(new Productos("Tintoreria","Hombre","Camperon", 2300));
listaProductos.push(new Productos("Tintoreria","Hombre","Campera de Plumas", 3300));
listaProductos.push(new Productos("Tintoreria","Hombre","Campera Con piel", 1950));
listaProductos.push(new Productos("Tintoreria","Hombre","Pantalon", 850));
listaProductos.push(new Productos("Tintoreria","Hombre","Piloto", 1950));
listaProductos.push(new Productos("Tintoreria","Hombre","Tapado", 3300));
listaProductos.push(new Productos("Tintoreria","Hombre","Camisa Doblada", 420));
listaProductos.push(new Productos("Tintoreria","Hombre","Abono 10 Camisas", 420));
listaProductos.push(new Productos("Tintoreria","Hombre","Campera Comun", 2420));
listaProductos.push(new Productos("Tintoreria","Hombre","Pantalon doblado", 1420));
listaProductos.push(new Productos("Tintoreria","Hombre","Pantalon", 1620));
listaProductos.push(new Productos("Tintoreria","Hombre","Ambo Medico", 2420));


listaProductos.push(new Productos("Planchado","Hombre","Traje", 1850));
listaProductos.push(new Productos("Planchado","Hombre","Camisa", 420));
listaProductos.push(new Productos("Planchado","Hombre","Corbata", 420));
listaProductos.push(new Productos("Planchado","Hombre","Remera", 420));
listaProductos.push(new Productos("Planchado","Hombre","Camperon", 2300));
listaProductos.push(new Productos("Planchado","Hombre","Campera de Plumas", 3300));
listaProductos.push(new Productos("Planchado","Hombre","Campera Con piel", 1950));
listaProductos.push(new Productos("Planchado","Hombre","Pantalon", 850));
listaProductos.push(new Productos("Planchado","Hombre","Piloto", 1950));
listaProductos.push(new Productos("Planchado","Hombre","Tapado", 3300));;

listaProductos.push(new Productos("Tintoreria","Mujer", "Vestido", 1650));
listaProductos.push(new Productos("Tintoreria","Mujer", "Ruana", 2650));
listaProductos.push(new Productos("Tintoreria","Mujer", "Sueter", 950));
listaProductos.push(new Productos("Tintoreria","Mujer", "Zapatillas", 1650));
listaProductos.push(new Productos("Tintoreria","Mujer", "Ambo Medico", 2250));
listaProductos.push(new Productos("Tintoreria","Mujer", "Blusa", 1050));
listaProductos.push(new Productos("Tintoreria","Mujer","Campera Plumas", 3320));
listaProductos.push(new Productos("Tintoreria","Mujer","Camperon", 3020));
listaProductos.push(new Productos("Tintoreria","Mujer", "Campera con Piel", 1250));

listaProductos.push(new Productos("Planchado","Mujer", "Vestido", 1650));
listaProductos.push(new Productos("Planchado","Mujer", "Ruana", 2650));
listaProductos.push(new Productos("Planchado","Mujer", "Sueter", 950));
listaProductos.push(new Productos("Planchado","Mujer", "Zapatillas", 1650));
listaProductos.push(new Productos("Planchado","Mujer", "Ambo Medico", 2250));
listaProductos.push(new Productos("Planchado","Mujer", "Blusa", 1050));
listaProductos.push(new Productos("Planchado","Mujer","Campera Plumas", 3320));
listaProductos.push(new Productos("Planchado","Mujer","Camperon", 3020));
listaProductos.push(new Productos("Planchado","Mujer", "Campera con Piel", 1250));

listaProductos.push(new Productos("Lavado","Casa","Valet", 990));
listaProductos.push(new Productos("Lavado","Casa","Juego de Sabanas",2350));
listaProductos.push(new Productos("Lavado","Casa","Plumon 1 plaza", 2950));
listaProductos.push(new Productos("Lavado","Casa","Frazada 1 plaza", 2450));
listaProductos.push(new Productos("Lavado","Casa","Mantel Grande", 1750));
listaProductos.push(new Productos("Lavado","Casa","Servilletas", 550));
listaProductos.push(new Productos("Lavado","Casa","Cortinas", 1450));
listaProductos.push(new Productos("Lavado","Casa","Frazada 2 plazas", 2450));
listaProductos.push(new Productos("Lavado","Casa","Alfombras x metro", 1350));
listaProductos.push(new Productos("Lavado","Casa","Toallas", 990));


listaProductos.push(new Productos("Productos","Adicionales", "Perfumina", 350));
listaProductos.push(new Productos("Productos","Adicionales", "Sanitizante", 450));
listaProductos.push(new Productos("Productos","Adicionales", "Enjuague", 520));
listaProductos.push(new Productos("Productos","Adicionales", "Perchas", 1200));

listaTipoEntrega.push(new TipoEntregas("D","Delivery"));
listaTipoEntrega.push(new TipoEntregas("L","Local"));
