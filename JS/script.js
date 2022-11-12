/***************VARIABLES */
const reservas = obtenerReservas();
const pedidos = obtenerPedidos();
const carrito = document.getElementById("idCarrito");
let productoSeleccionado = [];
let productoPedido, categoriaPedido , imagenPedido , descripcionPedido = "", cadena ="", tipoEntrega = "";
let precioPedido, precioTotalPedido , cantidadPedido , contador , idPedido, item = 0;
const dateHoy = luxon.DateTime.now();
let primera = true;
let hayPedido = false;
/******Variable que permite parametrizar el Importe Minimo de la compra */
let importeMinimo = 10000;

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


/****Inicializacion del Carrito si es que hay info en el Local Storage, y lo hace solo 1 vez al inicio */
if (primera){
    obtenerPedidos();
    agregarCarrito();
    primera = false;
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
/********Validacion de la seleccion del Servicio y de la categoria seleccionados */
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
                  <img alt="Producto" class="img-dely" src="../images/${valorSelect2}${i+1}.jpg">
                  <div class="descproducto">
                    ${productoSeleccionado[i].descripcion}
                  </div>`;
                  cad += `<p class="p-dely">Cantidad</p>
                  <input class="p-dely-input" type="number" id=idnumber${i+1} value=0 min=0 max=10>`
                  cad +=`<div class="descproducto">`;
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

/*******Inicializacion del LocalStorage */
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

/******validaciones de la fecha solicitada para el servicio */
function fechaDisponible(fecha){
    return !reservas.some ( (elemento) =>{
        return elemento.fecha === fecha;
    })
}

function fechaSeaMayorAHoy(fecha){

    const dateReserva = new Date(fecha);
    dateReserva.setMinutes(dateReserva.getMinutes() + dateReserva.getTimezoneOffset());

    if (dateReserva < dateHoy){
        return false;
    }
    return true;
}
 
/*******formatear celular */
const miCelular = document.getElementById("celular");
miCelular.addEventListener("change",() =>{
    const numeroCelular = miCelular.value;
    const numeroCelularLength = numeroCelular.length;
    
    switch (numeroCelularLength){
        case 11:
            miCelular.value = `(${numeroCelular.slice(0,3)}) ${numeroCelular.slice(3,7,)}-${numeroCelular.slice(7,11)}`;
            break;
        case 10:
            miCelular.value = `(${numeroCelular.slice(0,2)}) ${numeroCelular.slice(2,6,)}-${numeroCelular.slice(6,10)}`;
            break;
        case 8:
            miCelular.value = `${numeroCelular.slice(0,4)}-${numeroCelular.slice(4,8,)}`;
            break;
        case 7:
            miCelular.value = `${numeroCelular.slice(0,3)}-${numeroCelular.slice(3,7,)}`;
            break;
        default:
            break;
    return miCelular.value;
    }
});

/******************* Formulario de RESERVA */
formDeReserva.addEventListener("submit", (event) => {

    event.preventDefault()
    if (hayPedido){

        if (precioTotalPedido>importeMinimo){

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
            /************Cargo la reserva al local Storage */    
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
                        cad+= `<h6 class="mensajeDelivery">Podra traer sus prendas al local el dia</h6>`
                    }
                    cad +=` <h6> ${fecha}</h6>
                    </div>`
                document.getElementById("IdSeleccion").innerHTML=cad;
                setTimeout(() =>{
                Swal.fire({
                    title: `${cad}`,
                    text: "Queres Vaciar el Carrito?",
                    icon: 'success',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'SI',
                    denyButtonText: `NO`,
                    }).then((result) => {
                    if (result.isConfirmed) {
                        document.getElementById("idCarrito").innerHTML="";
                        localStorage.clear();
                        clearPedidos();
                        clearReservas();
                        Swal.fire('Carrito Vacio!', '', 'success')
                    }}),5500})
        /***************Inicializacion de Variables luego del push*/
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
                        text: 'La Fecha elegida debe ser Mayor al dia de Hoy!',})
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
                title: `Importe menor a $10.000`,
                text: `Agregar mas servicios a su Seleccion`,
              })
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: `Carrito Vacio`,
            text: `Debe seleccionar algun servicio`,
          })
        }
});

/*************Agrega los Items al carrito luego que selecciona el agregar al carrito del contenedor de servicios a seleccionar */
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
            precioPedido = parseInt(productoSeleccionado[contador].precio);
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

/*******Agrega los items seleccionados al carrito */
function agregarCarrito(){
    let auxtotal=0;
    document.getElementById("idCarrito").innerHTML="";
    document.getElementById("idtotalcarrito").innerHTML="";


    for (let i =0 ; i< pedidos.length; i++){
        if (i===0){
            cadena = document.createElement("span");
            cadena.innerHTML = `
            <div class="columnPedido">
            <div class="titulodesccripcion">Producto</div>
            <div class="titulocantidad">Cantidad</div>
            <div class="tituloprecio">Precio</div>
            <div class="tituloprecio">Total</div>
           </div> `;


            carrito.append(cadena);
        }
        if (pedidos[i].cantidad <=10){
            hayPedido = true;
            auxtotal= pedidos[i].precio*pedidos[i].cantidad;
            cadena = document.createElement("section");
            cadena.innerHTML = `
             <div class="columnPedido">
             <div class="descripcion">${pedidos[i].descripcion}</div>
             <div class="descripcion">${pedidos[i].categoria}</div>
             <img alt="Producto" class="img-pedido" src="../images/${pedidos[i].imagen}.jpg">
             <input class="inputCantidad" type="number" value=${pedidos[i].cantidad} min=0 max=10>
             <div class="precio">$${pedidos[i].precio} </div>
             <div class="preciototal">$${auxtotal} </div>
             <buton id="delete" class="btn btn-danger"></buton>
            </div> `;
            carrito.append(cadena);
        }
        else{
            pedidos[i].cantidad = 10;
            Swal.fire({
                icon: 'info',
                title: `Cuidado, cambiamos la cantidad!!!`,
                text: `Maximo permitido 10 unidades por servicio`,
              })
              hayPedido = true;
              auxtotal= pedidos[i].precio*pedidos[i].cantidad;
              cadena = document.createElement("section");
              cadena.innerHTML = `
               <div class="columnPedido">
               <div class="descripcion">${pedidos[i].descripcion}</div>
               <div class="descripcion">${pedidos[i].categoria}</div>
               <img alt="Producto" class="img-pedido" src="../images/${pedidos[i].imagen}.jpg">
               <input class="inputCantidad" type="number" value=${pedidos[i].cantidad} min=0 max=10>
               <div class="precio">$${pedidos[i].precio} </div>
               <div class="preciototal">$${auxtotal} </div>
               <buton id="delete" class="btn btn-danger"></buton>
              </div> `;
              carrito.append(cadena);
        }
        }

    agregarTotalPedido();
    updateNumberOfItems();
    removeItems();
};
 
/*********Si se agrego algun item a la seleccion inicial actualiza los items que tiene en el carrito y re calculo el total del pedido */
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

/*********Agrega el total del Pedido al final del contenedor de los items seleccionados en el carrito */
function agregarTotalPedido(){
    precioTotalPedido=0;
    pedidos.forEach(elemento => {
        precioTotalPedido = parseInt(precioTotalPedido) + parseInt(elemento.precio)*parseInt(elemento.cantidad);
    });
    let cad = `<h5>Total a Pagar $${precioTotalPedido}</h5>`
    if (precioTotalPedido<importeMinimo){
        cad += `<h6 class="h6-reserva">Le faltan $${importeMinimo-precioTotalPedido} Para Solicitar el servicio</h6>`
        cad += `<h6 class="h6-reserva">Valor minimo de $${importeMinimo}</h6>`
    }
    document.getElementById("idtotalcarrito").innerHTML=cad;
};


/**********elimina los items del carrito que se desean */
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
                let auxtotal = 0;
                let longItemAnterior = elemento.descripcion.length;
                let nuevoItemActual = itemActual.substring(0,longItemAnterior);

                if (elemento.descripcion !== nuevoItemActual){
                    auxtotal= elemento.precio*elemento.cantidad;
                    cadena = document.createElement("section");
                    cadena.innerHTML = `
                         <div class="columnPedido">
                         <div class="descripcion">${elemento.descripcion}</div>
                         <div class="descripcion">${elemento.categoria}</div>
                         <img alt="Producto" class="img-pedido" src="../images/${elemento.imagen}.jpg">
                         <input class="inputCantidad" type="number" value=${elemento.cantidad} min=0 max=10>
                         <div class="precio">$${elemento.precio} </div>
                         <div class="preciototal">$${auxtotal} </div>
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

/************Selecciona el tipo de entrega y verifica si llega con el Delivery a esa Zona */
function seleccionarEntrega(){
    let IdDelivery = document.getElementById("IdDelivery");
    let cad = ""

    tipoEntrega = comboEntrega.value
    if (tipoEntrega === "D"){
        const inputCodigoPostal = document.getElementById("codigoPostal");
        const valorInputCodigoPostal = parseInt(inputCodigoPostal.value);

        if ((valorInputCodigoPostal <1200) || (valorInputCodigoPostal>1800)){
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
