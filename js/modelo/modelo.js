
var Modelo = function() {
  var datosEnLocalStorage = JSON.parse(localStorage.getItem('encuestas'));
  if (datosEnLocalStorage == null) {
    this.preguntas = [];
  } else {
    this.preguntas = datosEnLocalStorage;
  }
  this.ultimoId = 0;

  
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todoBorrado = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoGuardado = new Evento(this);
};

Modelo.prototype = {
  
  obtenerUltimoId: function() {
    
    var cantPreguntas = this.preguntas.length;
    var ultimoId;
    if (cantPreguntas == 0) {
      ultimoId = 0;
    } else {
      ultimoId = this.preguntas[cantPreguntas-1].id
    }
    return ultimoId;
  },

  
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function(id){
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function(id,nuevaPregunta){
    var indiceElementoAEditar;
    const elementoId = (element) => element.id == id;
    indiceElementoAEditar = this.preguntas.findIndex(elementoId);
    console.log(indiceElementoAEditar);

    this.preguntas[indiceElementoAEditar].textoPregunta = nuevaPregunta;
    this.guardar(); 
    this.preguntaEditada.notificar();
    },
    
    borrarTodasLasPreguntas: function() { 
      this.preguntas = [];
      this.guardar();  
      this.todoBorrado.notificar();
    },  
    agregarVoto: function(id,respuestaSeleccionada) { 
      var indicePregunta;
      const elementoId = (element) => element.id == id;
      indicePregunta = this.preguntas.findIndex(elementoId);
      console.log(indicePregunta);
  
      let posiblesRespuestas = this.preguntas[indicePregunta].cantidadPorRespuesta;
  
      var indiceRespuestaVotada = posiblesRespuestas.findIndex(respuestas => respuestas.textoRespuesta == respuestaSeleccionada)
      let votos = this.preguntas[indicePregunta].cantidadPorRespuesta[indiceRespuestaVotada].cantidad;
  
      votos++;
      this.preguntas[indicePregunta].cantidadPorRespuesta[indiceRespuestaVotada].cantidad=votos;
  
      this.guardar();  
      this.votoGuardado.notificar();
    },  
  
  guardar: function(){
    localStorage.setItem('encuestas', JSON.stringify(this.preguntas));
  },
};
