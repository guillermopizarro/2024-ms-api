const model = require('./model')

async function insertar_usuario(dato) {
    const resultado = await new model(dato)
    return resultado.save()
}

async function obtener_usuario(dato) {
     let filter = {}

     if (dato.apellido) {
        filter = { apellido: dato.apellido }
     }
     
     const resultado = await model.find( filter )
     return resultado
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

async function eliminar_usuario(dato) {    
    let usuario = {}
    if (dato._id) {
       usuario = { _id: dato._id }
    }

    const busqueda = await model.find( usuario )
    if(busqueda.length == 0)
    {
        return {error: 'no existe id'}
    }
    else{
        const resultado = await model.deleteOne(usuario)
        return resultado
    }
   
}

module.exports = {
    insertar:insertar_usuario,
    obtener:obtener_usuario,
    listar:listar_todos,
    eliminar:eliminar_usuario
}