/***************VARIABLES */

//localStorage.clear();

const listaFliaProductos = [];
const listaProductos = [];
const listaPedidos = [];
const listaTipoEntrega = [];
const reservas = obtenerReservas();
const pedidosItems = obtenerPedidos();
let productoSeleccionado = [];
let productoPedido = "";
let categoriaPedido = "";
let precioPedido = 0;
let precioTotalItemPedido = 0;
let precioTotalPedido = 0;
let descripcionPedido = "";
let cantidadPedido = 0;
let contador = 0;
const dateHoy = new Date();

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
let idPedido = 0;

select1.addEventListener("change",validarSeleccion);
select2.addEventListener("change",validarSeleccion);


/****************FUNCIONES */
function validarSeleccion(){
    const valorSelect1 = select1.value;
    const valorSelect2 = select2.value;
    if(valorSelect1 && valorSelect2){
    
        console.log("****************Array Nuevo de seleccion*****************\n ")
            productoSeleccionado = listaProductos.filter( (producto) => {
            if((producto.producto === valorSelect2)&&(producto.categoria === valorSelect1))
            { 
                return ( producto )
            }
        });
        let cad = ""
        console.log(productoSeleccionado)

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
                  <input class="p-dely-input" type="number" id=idnumber${i+1} value=0>`
                  cad +=`<div>`;
                  cad += `Precio Unitario $${productoSeleccionado[i].precio}`;
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
    const pedidosLS = localStorage.getItem("pedidosItems");

    if (pedidosLS !== null){
        return JSON.parse(pedidosLS);
    }
    return [];
}

function fechaSeaMayorAHoy(fecha){

    const dateReserva = new Date( fecha);

    /*************Validar si la fecha elegida es Mayor a Hoy */
    if (dateReserva < dateHoy){
        return false;
    }
    else if (dateReserva = dateHoy){
            return true;
        }
    return true;
}
 
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

        if (fechaSeaMayorAHoy(fecha)){
            
            reservas.push({
                idPedido : idPedido,
                nombre : nombre,
                apellido : apellido,
                celular : parseInt(celular),
                email : email,
                codigoPostal : parseInt(codigoPostal),
                fecha : fecha,
            });
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
            alert(`Esta Fecha es Menor al dia de Hoy`)
        }
    }
    else{
            
            alert(`Fecha no disponible, Ingrese otra ${fecha}`)
        }  
});


/******Cargar Items a Carrito */
formDePedido.addEventListener("submit", (event) => {

    event.preventDefault()
    cad = "";
    let clases = document.getElementsByClassName("p-dely-input");
    // console.log(productoSeleccionado);
    for (let i=0; i< clases.length; i++){
        if (i===0){
            cad = `
            <section id="seleccionPedidosItems" class="row-dely">`;
        }
        cantidadPedido = clases[i].value;
        if (cantidadPedido >0){
            idPedido++;
            categoriaPedido = productoSeleccionado[contador].categoria;
            productoPedido = productoSeleccionado[contador].producto;
            descripcionPedido = productoSeleccionado[contador].descripcion;
            precioPedido = parseInt(productoSeleccionado[contador].precio*cantidadPedido);


              /***Mostrar en Pantalla los solicitados dato */
              cad=`
              <div class="columnPedido">`;
              cad +=`${productoSeleccionado[contador].descripcion}`;
              cad+= `<img alt="Producto" class="imgPedido" src="../images/${productoPedido}${contador+1}.jpg">`;
              cad +=`Cantidad   ${cantidadPedido}`;
              cad +=`<div>`;
              cad += `Precio $${precioPedido}`;
              cad += `</div>
              </div>`;    
  
             /***************Cargo la reserva En el Carrito */    
              pedidosItems.push({
                  idPedido : idPedido,
                  producto : productoPedido,
                  categoria : categoriaPedido,
                  descripcion : descripcionPedido,
                  cantidad : cantidadPedido,
                  precio : parseInt(productoSeleccionado[contador]),
              });
  
              document.getElementById("idCarrito").innerHTML=cad;  

  /***************Cargo la reserva al local Storage */    
              localStorage.setItem("pedidosItems", JSON.stringify(pedidosItems));
              alert("Se realizo la carga");
          }
          contador++;
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

listaProductos.push(new Productos("Lavado","Casa","Valet", 990));
listaProductos.push(new Productos("Lavado","Casa","Acolchado 1 Plaza",1350));

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

listaProductos.push(new Productos("Lavado","Casa","Acolchado 2 Plazas", 1950));
listaProductos.push(new Productos("Lavado","Casa","Acolchado King Size", 2450));
listaProductos.push(new Productos("Lavado","Casa","Plumon 1 Plaza", 2350));
listaProductos.push(new Productos("Lavado","Casa","Plumon 2 Plazas", 2950));
listaProductos.push(new Productos("Lavado","Casa","Plumon King Size", 3450));

listaProductos.push(new Productos("Productos","Adicionales", "Sanitizante", 350));
listaProductos.push(new Productos("Productos","Adicionales", "Plancha Plus", 450));
listaProductos.push(new Productos("Productos","Adicionales", "Blanqueador", 520));
listaProductos.push(new Productos("Productos","Adicionales", "Perfumina", 1200));

// listaPedidos.push(new Pedidos(1,1134317751,"Camisa",1, 450, "D"));
// listaPedidos.push(new Pedidos(1,1134317751,"Remera",1, 420, "D"));
// listaPedidos.push(new Pedidos(1,1134317751,"Campera",1, 1850, "D"));
// listaPedidos.push(new Pedidos(1,1134317751,"Vestido",2, 1300, "D"));
// listaPedidos.push(new Pedidos(2,1147761102,"Camisa",1, 420, "L"));
// listaPedidos.push(new Pedidos(3,1144445555,"Plumon 1 Plaza",1, 2350, "D"));
// listaPedidos.push(new Pedidos(4,1148551234,"Perfumina",2, 1200, "L"));

listaTipoEntrega.push(new TipoEntregas("D","Delivery"));
listaTipoEntrega.push(new TipoEntregas("L","Local"));
