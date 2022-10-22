class Clientes {
    constructor (nombre, apellido, celular, codigoPostal,email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.celular = celular;
        this.codigoPostal = codigoPostal;
        this.email = email;
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
