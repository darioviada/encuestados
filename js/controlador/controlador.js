
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){
    this.modelo.borrarPregunta(id);
  },
  editarPregunta: function(id,nuevaPregunta) {
    this.modelo.editarPregunta(id,nuevaPregunta);
  }, 

  borrarTodasLasPreguntas: function() {
    this.modelo.borrarTodasLasPreguntas();
  },  
  agregarVoto: function(id,respuestaSeleccionada) {
    this.modelo.agregarVoto(id,respuestaSeleccionada);
  },  

};
