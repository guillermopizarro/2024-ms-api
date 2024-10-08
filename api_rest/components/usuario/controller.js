const storage = require('./storage')

function insertar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato.nombre || !dato.apellido ) {
            reject( 'Los datos se encuentran incompletos.' )
        } else {
            resolve( storage.insertar( dato ) )
        }
    } )
}

function obtener_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato) {
            reject( 'No existen datos' )
        } else {
            resolve( storage.obtener( dato ) )
        }
    } )
}

function editar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
       
    } )
}

function eliminar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato._id) {
            reject('No existe el usuario que quiere eliminar')
        } else {
            resolve(storage.eliminar(dato))
        }
    } )
}

function listar_todos() {
    return new Promise((resolve, reject) => {
      storage.listar()
          .then(usuarios => {
              if (usuarios.length === 0) {
                  resolve('No hay usuarios registrados')
              } else {
                  resolve(usuarios)
              }
          })
          .catch(error => reject('Error al listar usuarios: ' + error))
  })
}

module.exports = {
    insertar_usuario,
    obtener_usuario, 
    listar_todos,
    eliminar_usuario
}