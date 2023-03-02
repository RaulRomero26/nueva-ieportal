var categoriasglobales;
var texto_actual="";
var total_objetos=[];


var frase_actual=0;
var tamano=0;
var synth = window.speechSynthesis;
var texto_array = [];

var allVoices = [];
var bandera=0;

function MostrarNombres(id_c) {
  //console.log(id_c);
  synth.cancel()
  bandera=1;
  var x = document.getElementById("Nombres");
  var y = document.getElementById("Documento");
  y.style.display = "none";
  x.innerHTML = '';
  console.log(categoriasglobales[id_c].Categoria);
  var parametros = {
            'buscar_id': categoriasglobales[id_c].Categoria
          };
  //console.log('PARAMETROS',parametros);
  $.ajax({
    data: parametros, //ajuntamos los parametros con los datos
    url: "ajax/sacardatos.php", //url de donde obtener los datos
    dataType: 'json', //tipo de datos retornados
    type: 'post' //enviar variables como post
  }).done(function (data){
      var json_string = JSON.stringify(data);
      var obj = $.parseJSON(json_string);
      //console.log('SUBCATEGORIAS',obj)
	  total_objetos=[];
      for (var i in obj){
          console.log('OBJETOS: ', obj)
		  texto= obj[i]['texto']
		  var objeto = new Object();
		  objeto.id=obj[i]['id'];
		  objeto.texto=obj[i]['texto'];
		  objeto.url=obj[i]['url'];
		  console.log(objeto)
		  total_objetos.push(objeto);
          x.innerHTML += "<button type='button' id="+obj[i]['url']+" onclick=MostrarDocumentos(this.id) class='categoria categoria--subcategoria animate__animated animate__fadeIn'>"// ACA OCUPO SI O SI MANDARLE LA CONVERSACION EN TEXTO
                          +obj[i]['nombre']+
                          "</button>";
      }
    });
   }
   
 function MostrarDocumentos(id_c1) {// ACA OCUPO SI O SI RECIBIR LA CONVERSACION EN TEXTO
  //console.log(id_c1); // ACA OCUPO SI O SI IMPRIMIR EL ID Y CONVERSACION 
  synth.cancel()
  bandera=1;
  var x = document.getElementById("Documento");
  //console.log(total_objetos);
  resultado= total_objetos.find(objetos => objetos.url === id_c1 );
  //console.log(resultado);
  texto_actual=resultado.texto;
  x.innerHTML = '';
  x.style.display = "block";
  x.innerHTML += `<iframe 
                      src='https://docs.google.com/viewer?srcid=${id_c1}&pid=explorer&efh=false&a=v&chrome=false&embedded=true#view=fith' 
                      >
                  </iframe>`;
  var z = document.getElementById("colbuttons");
  z.style.display = 'block';
  }

  
  document.addEventListener("DOMContentLoaded", function(event) {
  
    
    allVoicesObtained.then(voices => allVoices=voices);
    console.log('voces',allVoices)
    //console.log("primero que se ejecuta");
    var z = document.getElementById("colbuttons");
    z.style.display = 'none';
    $.ajax({
      url: "ajax/conconv.php", //url de donde obtener los datos
      type: 'post',
      dataType: 'json', //tipo de datos retornados
      success: function (data){
        //console.log("termino");
        var json_string = JSON.stringify(data);
        var obj = $.parseJSON(json_string);
        categoriasglobales=obj;
        //console.log('CATEGORIAS',categoriasglobales);
        var conte = document.getElementById('contenedor_categoria');
        conte.innerHTML = `<ul >`;
        for (let i in obj) {
          conte.innerHTML +=`<li style="list-style:none;">
          <a id=${i} onclick="MostrarNombres(this.id)" class='categoria'> ${obj[i].Categoria} </a>`;
        }
    conte.innerHTML +=	`</ul>`;
  },
  error: function (error) {
    //console.log(error);
  }
});

var x = document.getElementById("speak");
x.addEventListener("click",generarAudio);
var y = document.getElementById('anterior');
y.addEventListener("click",restar);
var z = document.getElementById('siguiente');
z.addEventListener("click",sumar);
})
function restar(){
	if (frase_actual!=0)
		frase_actual--;
}
function sumar(){
	if (frase_actual<tamano)
		frase_actual++;
}


function generarAudio(e){
    console.log(e.target.id)
	synth.cancel()
	bandera=0;
	hablar(0)
}

 async function hablar(fraseinicio){
  console.log("hablar",fraseinicio);
    frasedondeinicio = fraseinicio
    texto_array= texto_actual.split('_');
    console.log(texto_array);
	tamano=texto_array.length;
    var idxv = 0;
	frase_actual=fraseinicio;
	console.log("tamano total",texto_array.length);
    while (frase_actual<texto_array.length && bandera==0){
		console.log('frase actual',frase_actual)
		if(idxv == 0)
			idxv=1;
		else
			idxv=0;
      await getNextAudio(texto_array[frase_actual],idxv);//speechSynthesis.speak(oracion);
	  frase_actual++;
	  if (bandera==1)
		  break;
    }
	console.log("termino");
 }
async function getNextAudio(oracion,idxv){
	console.log('ORACION',oracion);
  if(oracion.includes('...')){oracion = 'Next Conversation'}

  if(oracion==""){oracion = 'Pause'}

    let audio = new SpeechSynthesisUtterance(oracion);
	audio.lang = "en-US";
    audio.rate = 0.8;
	audioVoces = window.speechSynthesis.getVoices(); 
    console.log('voces en el generador: ',audioVoces);
    vocesingles =audioVoces.filter(function (audioVoces) { return audioVoces.lang == 'en-US'; }); 
    console.log('voces generador filtradas: ',vocesingles);
    audio.voice = vocesingles[4+idxv]; 
	synth.speak(audio);	
    return new Promise(resolve => {
        audio.onend = resolve;
    });
}
const allVoicesObtained = new Promise(function(resolve, reject) {
  let voices = window.speechSynthesis.getVoices();
  if (voices.length !== 0) {
    resolve(voices);
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", function() {
      voices = window.speechSynthesis.getVoices();
      resolve(voices);
    });
  }
});