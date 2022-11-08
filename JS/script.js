/***************VARIABLES */

//localStorage.clear();

const reservas = obtenerReservas();
const pedidos = obtenerPedidos();
const carrito = document.getElementById("idCarrito");
let productoSeleccionado = [];
let productoPedido, categoriaPedido , imagenPedido , descripcionPedido = "", cadena ="", tipoEntrega = "";
let precioPedido, precioTotalPedido , cantidadPedido , contador , idPedido, item = 0;
const dateHoy = luxon.DateTime.now();
let primera = true;
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

function clearStorage(){
    localStorage.clear();
}

function clearPedidos(){
    precioTotalPedido = 0;
    for (let i =0; i<=pedidos.length;i++){
        pedidos.shift();
        IdDelivery.innerHTML=""; 
    }
}
function clearReservas(){
    for (let i =0; i<=reservas.length;i++){
        reservas.shift();
        IdDelivery.innerHTML=""; 
    }
}

function validarSeleccion(){
    const valorSelect1 = select1.value;
    const valorSelect2 = select2.value;

    if(valorSelect1 && valorSelect2){
        fetch('../json/productos.json')
            .then((response)=>{
            return(response).json();
         }).then ((listaProductos) => {
            productoSeleccionado = listaProductos.filter( (producto) => {
            if((producto.producto === valorSelect2)&&(producto.categoria === valorSelect1))
            { 
                return ( producto );
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
                  <img alt="Producto" class="img-dely" src="../images/${valorSelect2}${i+1}.jpg">${productoSeleccionado[i].descripcion}`;
                  cad += `<p class="p-dely">Cantidad</p>
                  <input class="p-dely-input" type="number" id=idnumber${i+1} value=0 min=0>`
                  cad +=`<div>`;
                  cad += `C/U $${productoSeleccionado[i]?.precio}`;
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
    
    });
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

        idPedido = 1000;

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
                importe : parseInt(precioTotalPedido),
            });
/***************Cargo la reserva al local Storage */    
                localStorage.setItem("pedidos", JSON.stringify(pedidos));
                localStorage.setItem("reservas", JSON.stringify(reservas));

                let cad = ``
                document.getElementById("idtotalcarrito").innerHTML=cad; 
                cad=`<div>
                    <h6>Pedido Confirmado</h6>
                    <h4>Nro de Pedido: ${idPedido}</h4>
                    <h5>${inputNombre.value} Muchas Gracias</h5>`
                    if (tipoEntrega === "D"){
                        cad +=` <h6>Se coordinara su retiro para el dia</6>` 
                    }
                    else{
                        cad+= `<h6 class="mensajeDelivery">Tenga en Cuenta que Podra acercarse al local el dia</h6>`
                    }
                    cad +=` <h6> ${fecha}</h6>
                </div>`
                document.getElementById("IdSeleccion").innerHTML=cad;
                setTimeout(() =>{
                Swal.fire({
                    title: `${cad}`,
                    text: "Queres Vaciar el Carrito?",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'SI',
                    denyButtonText: 'NO' }).then((result) => {
                    if (result.isConfirmed) {
                         document.getElementById("idCarrito").innerHTML="";
                        localStorage.clear();
                        clearPedidos();
                        clearReservas();
                        Swal.fire('Carrito Vacio!', '', 'success')
                    }}),5500})
/***************Inicializacion de Variables */
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
                text: 'La Fecha elegida es Menor al dia de Hoy!',})
            }}   
        else{
        Swal.fire({
            icon: 'error',
            title: 'Elegir Otra Fecha',
            text: `La Fecha elegida No esta disponible! ${fecha}`,})
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

formDePedido.addEventListener("submit", (event) => {
    event.preventDefault()
    cad = "";
    contador = 0;
    item = 0;
    let clases = document.getElementsByClassName("p-dely-input");
/************** Obtener el numero de idPedidos, tengo que buscar al max numero asignado a reservas Id y sumarle uno.*/
    idPedido = 1000

    for (let i=0; i< clases.length; i++){
        hayPedido = true;
        cantidadPedido = clases[i].value;
        if (cantidadPedido >0){
/******Ver si ya existe ese item en el carrito */            
            for (let z=0;z<pedidos.length;z++){
                if(productoSeleccionado[contador].descripcion === pedidos[z].descripcion){
                    cantidadPedido = parseInt(cantidadPedido) + pedidos[z].cantidad;
                    pedidos.splice(z,1)
                }             
            }
            item++;
            categoriaPedido = productoSeleccionado[contador].categoria;
            productoPedido = productoSeleccionado[contador].producto;
            descripcionPedido = productoSeleccionado[contador].descripcion;
            precioPedido = parseInt(productoSeleccionado[contador].precio*cantidadPedido);
            imagenPedido = productoSeleccionado[contador].producto+(i+1);
/***************Cargo Los Items del Pedido */    
              pedidos.push({
                  idPedido : idPedido,
                  item : item,
                  producto : productoPedido,
                  categoria : categoriaPedido,
                  descripcion : descripcionPedido,
                  cantidad : parseInt(cantidadPedido),
                  precio : parseInt(precioPedido),
                  imagen : imagenPedido,
              });

          }
          contador++;
      }  
      agregarCarrito()      
});

function agregarCarrito(){
    
    document.getElementById("idCarrito").innerHTML="";
    document.getElementById("idtotalcarrito").innerHTML="";

    for (let i =0 ; i< pedidos.length; i++){
        hayPedido = true;
        cadena = document.createElement("section");
        cadena.innerHTML = `
         <div class="columnPedido">
         <div class="descripcion">${pedidos[i].descripcion}</div>
         <img alt="Producto" class="imgPedido" src="../images/${pedidos[i].imagen}.jpg">
         <input class="inputCantidad" type="number" value=${pedidos[i].cantidad} min=0>
         <div class="precio">  Precio $${pedidos[i].precio} </div>
         <buton id="delete" class="btn btn-danger"></buton>
        </div> `;

        carrito.append(cadena);
    }
    agregarTotalPedido();
    updateNumberOfItems();
    removeItems();
};
 
function updateNumberOfItems(){
    let inputNumber = document.querySelectorAll('.inputCantidad');
    inputNumber = [...inputNumber]

    inputNumber.forEach(item =>{
        item.addEventListener('click', event=>{
            let itemActual= event.target.parentElement.parentElement.childNodes[1].innerText;

            pedidos.forEach(elemento => {

                let longItemAnterior = elemento.descripcion.length;
                let itemCantidadActual = parseInt(event.target.value);

                let itemAnterior = elemento.descripcion;
                let nuevoItemActual = itemActual.substring(0,longItemAnterior);

                if (elemento.descripcion === nuevoItemActual){
                   elemento.cantidad = itemCantidadActual;
                    agregarTotalPedido();
                }
            });
        });
    });
}
function agregarTotalPedido(){
    precioTotalPedido=0;
    pedidos.forEach(elemento => {
        precioTotalPedido = parseInt(precioTotalPedido) + parseInt(elemento.precio);
    });
    let cad = `<h5>Total a Pagar $${precioTotalPedido}</h5>`
    document.getElementById("idtotalcarrito").innerHTML=cad;
};

function removeItems(){
    let contador = 0;
    let indice = 0;
    let elementoABorrar = "";
    let removeBtns = document.querySelectorAll('.btn-danger');
    removeBtns = [...removeBtns];

    removeBtns.forEach(btn => {
        btn.addEventListener(`click`,event =>{
            document.getElementById("idCarrito").innerHTML="";
            document.getElementById("idtotalcarrito").innerHTML="";

            let itemActual= event.target.parentElement.childNodes[1].innerText;

            pedidos.forEach(elemento => {

                contador++;
                let longItemAnterior = elemento.descripcion.length;
                let nuevoItemActual = itemActual.substring(0,longItemAnterior);

                if (elemento.descripcion !== nuevoItemActual){

                        cadena = document.createElement("section");
                        cadena.innerHTML = `
                         <div class="columnPedido">
                         <div class="descripcion">${elemento.descripcion}</div>
                         <img alt="Producto" class="imgPedido" src="../images/${elemento.imagen}.jpg">
                         <input class="inputCantidad" type="number" value=${elemento.cantidad} min=0>
                         <div class="precio">Precio $${elemento.precio} </div>
                         <buton id="delete" class="btn btn-danger"></buton>
                        </div> `;

                        carrito.append(cadena); 
                        removeItems();  
                        updateNumberOfItems();
                        agregarTotalPedido();             
           
                }
                else{
                    indice = contador-1;
                    elementoABorrar = pedidos[indice].descripcion;
                }

            });
            if (pedidos[indice].descripcion === elementoABorrar){
                pedidos.splice(indice,1)
                updateNumberOfItems();
                agregarTotalPedido();
            }
        });

    });

}

function seleccionarEntrega(){
    let IdDelivery = document.getElementById("IdDelivery");
    let cad = ""

    tipoEntrega = comboEntrega.value
    if (tipoEntrega === "D"){
        const inputCodigoPostal = document.getElementById("codigoPostal");
        const valorInputCodigoPostal = parseInt(inputCodigoPostal.value);

        if (valorInputCodigoPostal <1200 || valorInputCodigoPostal>1800){
            comboEntrega.value = "L"
            tipoEntrega = "L"
            cad=`<h6>No llegamos a su zona, debera traer las prendas al local</h6>`
            IdDelivery.innerHTML=cad; 
            Swal.fire({
                icon: 'info',
                title: `No llegamos a su zona!!`,
                text: `Debera traer las prendas al local`,
              })
        } 
    }
    else{
        cad=`<h6>Tipo de Entrega no especificado, Debera traer las prendas al local</h6>` 
        IdDelivery.innerHTML=cad; 
    }
}



