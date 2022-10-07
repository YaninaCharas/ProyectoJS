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

// const nombre = prompt("Ingrese su Nombre");
// const apellido = prompt("Ingrese su Apellido");
// const telefono = prompt("Ingrese su Telefono");
let iterar = "SI";
while (iterar==="SI"){
    let codigoPostal = parseInt(prompt("Ingrese su Codigo Postal"));
    if ((codigoPostal>=1000)&&(codigoPostal<=1600)){
        alert("Bienvenid@ "+nombre+" podemos llegar a tu zona, el costo del delivery es de $"+calcularCostoDelivery(codigoPostal));
        iterar="NO";
    }
    else{
        iterar = prompt(nombre+" Lo lamentamos pero No llega el Delivery a tu Zona,escribi Seguir si queres ingresar otro Codigo Postal o escribi Salir ");
        while ((iterar == "")||((iterar!="Seguir")&&(iterar!="Salir"))){
            iterar = prompt(nombre+" Lo lamentamos pero No llega el Delivery a tu Zona,escribi Seguir si queres ingresar otro Codigo Postal o escribi Salir ");
        }
        if (iterar == "Seguir"){
            iterar ="SI"
        }
        else{
            iterar = "NO"
        }
        
    }
}
