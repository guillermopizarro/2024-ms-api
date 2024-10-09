var usuario_seleccionado = null;

/**
 * Funcion utilizada para obtener todos los usurios desde el backend
 * @returns lista de usuarios
 */
function listar() {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            }
        };

        fetch('/usuario', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

/**
 * Funcion utilizada para actualizar el listado de usuarios
 */
function listar_usuarios() {    
    listar()
        .then( (response) => {
            console.log(response);
            if (response && Array.isArray(response.body) && response.body.length > 0) {
                poblar_tabla(response.body)
            } else {
                mostrar_no_data();
            }
        } )
        .catch( (error) => {
            console.log("lista_usuarios - ERROR", error);
            alert('Error al obtener la informacion de usuario.');
            mostrar_no_data();
        } )
}

/**
 * Funcion uitlizada para mostrar el mensaje "SIN USUARIOS REGISTRADOS"
 */
function mostrar_no_data() {
    var listado = document.getElementById("listado_usuario");
    listado.parentNode.removeChild(listado);
    var div = document.createElement("div");
    div.id = "listado_usuario";
    div.className = "hit-the-floor";
    div.innerHTML = "<text> SIN USUARIOS REGISTRADOS </text>"
    document.body.appendChild(div)
}

/**
 * Funcion utilizada para crear la tabla dinamicamente
 * @param {*} usuarios listado de usuarios 
 */
function poblar_tabla(usuarios) {
    var listado = document.getElementById("listado_usuario");
    listado.parentNode.removeChild(listado);
    if (listado) {
        var div = document.createElement("div");
        div.id = "listado_usuario";
        div.className = "listado_usuario"
        
        var tabla = document.createElement("table"); 
        tabla.appendChild(agregar_cabecera_tabla());
        tabla.appendChild(agregar_detalle_tabla(usuarios));        

        div.appendChild(tabla);
        document.body.appendChild(div)
    };    
}

/**
 * Funcion que crea celdas de tipo texto 
 * @param {*} texto_celda texto incluido enla celca
 * @param {*} tipo tipo de celda: th / td
 * @returns 
 */
function crear_celda(texto_celda, tipo) {
    var celda = document.createElement(tipo);
    var texto = document.createTextNode(texto_celda);
    celda.appendChild(texto);
    return celda;
}

/**
 * Funcion uitlizada para crear la cabecera de la tabala
 * @returns cabecera de la tabla
 */
function agregar_cabecera_tabla(){
    var cabecera = document.createElement("thead");
    var fila = document.createElement("tr");    
    
    fila.appendChild(crear_celda("ID", "th"));
    fila.appendChild(crear_celda("NOMBRE", "th"));
    fila.appendChild(crear_celda("APELLIDO", "th"));
    fila.appendChild(crear_celda("FECHA REGISTRO", "th"));
    fila.appendChild(crear_celda("FECHA ACTUALIZACION", "th"));
    fila.appendChild(crear_celda("", "th"));
    fila.appendChild(crear_celda("", "th"));    
    
    cabecera.appendChild(fila);    
    return cabecera
}

/**
 * Crea el detalle de la tabla de usuarios
 * @param {*} usuarios informacion de usuarios (Array[])
 * @returns 
 */
function agregar_detalle_tabla(usuarios) {
    var body = document.createElement("tbody");    
    
    usuarios.forEach(usuario => {
        var fila = document.createElement("tr");
        fila.appendChild(crear_celda(usuario["_id"], "td"));
        fila.appendChild(crear_celda(usuario["nombre"], "td"));
        fila.appendChild(crear_celda(usuario["apellido"], "td"));
        fila.appendChild(crear_celda(usuario["fecha_registro"], "td"));
        fila.appendChild(crear_celda(usuario["fecha_actualizacion"], "td"));
        
        var celda_modificar = document.createElement("td");
        var boton_modificar = document.createElement("button");        
        boton_modificar.id = `btn_actualizar_${usuario["_id"]}`;
        boton_modificar.textContent = "ACTUALIZAR"
        boton_modificar.onclick = () => actualizar_usuario(usuario);
        celda_modificar.appendChild(boton_modificar);
        fila.appendChild(celda_modificar);

        var celda_eliminar = document.createElement("td");
        var boton_eliminar = document.createElement("button");        
        boton_eliminar.id = `btn_eliminar_${usuario["_id"]}`;
        boton_eliminar.textContent = "ELIMINAR"
        boton_eliminar.onclick = () => eliminar_usuario(usuario);
        celda_eliminar.appendChild(boton_eliminar);
        fila.appendChild(celda_eliminar);
        
                        
        body.appendChild(fila);    
    });    
        
    return body
}

/**
 * Handler del evento click del botón Actualizar
 * @param {*} usuario recibe el usuario a ser actualizado
 */
function actualizar_usuario(usuario) {    
    usuario_seleccionado = usuario;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById("form_usuario").style.display  = "block";
}

/**
 * Funcion utilizada para invocar la eliminacion de usuario en backend 
 * @param {*} usuario usuario a ser eliminado
 * @returns 
 */
function eliminar(usuario) {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            }, 
            body: JSON.stringify(usuario)
        };

        fetch('/usuario', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

/**
 * Handler del evento click del botón Eliminar
 * @param {*} usuario recibe el usuario a ser eliminado
 */
function eliminar_usuario(usuario) {
    var nomnbre_completo = ` ${usuario["nombre"]} ${usuario["apellido"]}`
    if (!confirm(`Esta seguro que desea eliminar el usuario \n\t ID: ${usuario["_id"]} \n\t NOMBRE: ${nomnbre_completo}` )) {
        return;
    }

    eliminar(usuario)
        .then( (response) => {
            alert("Usuario eliminado con éxito");
            listar_usuarios();
        } )
        .catch( (error) => {
            console.log("eliminar_usuario - ERROR", error);
            alert('Error al eliminar el usuario de usuario.');
        } )    
}

/**
 * Visualiza el formulario de usuario
 */
function crear_usuario() {
    document.getElementById("form_usuario").style.display  = "block";
}

/**
 * Oculat el formulario de usuario
 */
function cancelar_form() {
    document.getElementById('nombre').value = "" ;
    document.getElementById('apellido').value = "";
    document.getElementById("form_usuario").style.display  = "none";
}

/**
 * Handler del boton guardar 
 */
function guardar_usuario() {
    if (document.getElementById('nombre').value === "" || 
        document.getElementById('apellido').value ===""){
        alert("Por favor rellene ambos campos");
        return;
    }

    var mensaje = "Usuario actualizado con éxito";
    var accion =  "MODIFICAR";    
    var usuario = usuario_seleccionado;
    
    if (usuario_seleccionado === null) {
        var mensaje = "Usuario creado con éxito";
        var accion =  "CREAR";    
        var usuario = {};            
    } 
        
    usuario.nombre = document.getElementById('nombre').value;
    usuario.apellido = document.getElementById('apellido').value ;

    guardar(usuario, accion)
        .then( (response) => {
            alert(mensaje);
            listar_usuarios();
        } )
        .catch( (error) => {
            console.log("guardar_usuario - ERROR", error);
            alert('Error al guardar el usuario.');
        } );
    
    usuario_seleccionado = null;
    cancelar_form();
}

/**
 * Guarda o actualiza la informacion de un usuario
 * @param {*} usuario informacion a ser persistida
 * @param {*} accion CREAR para nuevo usuario / MODIFICAR para un usuario existente
 *  * @returns 
 */
function guardar(usuario, accion) {
    var metodo =  (accion === "CREAR") ? "POST" : "PUT"; 
    return new Promise((resolve, reject) => {
        const request_options = {
            method: metodo,
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            }, 
            body: JSON.stringify(usuario)
        };
        console.log("request_options", request_options);

        if (metodo === "PUT"){
            fetch(`/usuario/${usuario["_id"]}`, request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
        } else {
            fetch('/usuario', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
        }
    })
}
