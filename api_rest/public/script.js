let filaSeleccionada = null; // Variable para almacenar la fila seleccionada para modificar

function guardar() {

    let nombre_ = document.getElementById('nombre').value
    let apellido_ = document.getElementById('apellido').value
  
    let data = { nombre:nombre_, apellido:apellido_ }

    if (nombre_ === "" || apellido_ ===""){
        alert("Por favor rellene ambos campos");
        return;
    }

    if (filaSeleccionada){
        //Modificar usuario existente con datos modificados
        filaSeleccionada.cells[0].textContent = nombre_;
        filaSeleccionada.cells[1].textContent = apellido_;
        filaSeleccionada = null; // Reiniciar la fila seleccionada
    
    } else {
        // Crear una nueva fila en la tabla
        const tabla = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
        const nuevaFila = tabla.insertRow();

        // Insertar las celdas para nombre y apellido
        const celdaNombre = nuevaFila.insertCell(0);
        const celdaApellido = nuevaFila.insertCell(1);
        const celdaAcciones = nuevaFila.insertCell(2);

        // Asignar valores a las celdas
        celdaNombre.textContent = nombre_;
        celdaApellido.textContent = apellido_;

        // Crear boton "Modificar"
        const btnModificar = document.createElement('button');
        btnModificar.textContent = 'Modificar';
        btnModificar.onclick = () => editar_usuario(nuevaFila);

        // Añadir botón "Modificar" a la celda de acciones
        celdaAcciones.appendChild(btnModificar);
    }

    // Limpiar los campos de entrada
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/usuario', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function guardar_usuario() {
    guardar()
        .then( (response) => {
            alert('Registro exitoso.')
        } )
        .catch( (error) => {
            alert('Error al ingresar.')
        } )
}

function editar_usuario(fila){
    // Rellenar los campos con los datos de la fila seleccionada
    document.getElementById('nombre').value = fila.cells[0].textContent;
    document.getElementById('apellido').value = fila.cells[1].textContent;

    //Almacenar la fila seleccionada para modificarla despues
    filaSeleccionada = fila;
}

function cancelar_usuario(){
    //Limpiar campos de entrada
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    filaSeleccionada = null; // Reiniciar la fila seleccionada
}