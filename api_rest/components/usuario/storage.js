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

module.exports = {
    insertar:insertar_usuario,
    obtener:obtener_usuario,
    listar:listar_todos
}