var globalvideos;
document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero que se ejecuta");
	//console.log('Segundo ajaax');
    $.ajax({
        url: "../alumno/ajax/avideos.php", //url de donde obtener los datos
        type: 'post',
        dataType: 'json', //tipo de datos retornados
        success: function (data){
          //console.log("termino");
          var json_string = JSON.stringify(data);
          var obj = $.parseJSON(json_string);
          console.log(obj);
          globalvideos=obj;
          var conte = document.getElementById('contenido');
          conte.innerHTML = "";
          for (let video in obj) {
               conte.innerHTML += ` 
               <a id=${obj[video].id} class="tema animate__animated animate__fadeIn " data-toggle="modal" data-target="#exampleModal">
				  <div class="card border-primary text-center mt-1 mb-2 mx-2" style="max-width: 350px">
                    <div class="card-body">
                        <h5 class="card-title">${obj[video].titulo}</h5>
					     <img class="card-img" src="../alumno/assets/img/Videos/youtube-logo-2.webp">
					</div>
				  </div>
				</a>
               `;
            }

          
        },
        error: function (error) {
          //console.log(error);
        }
      });

	})

    $('#exampleModal').on('show.bs.modal', function (event) {
       
         var disparador = $(event.relatedTarget) // Button that triggered the modal
         //console.log(disparador[0].id);
         var idvideo = disparador[0].id
        titulomodal = document.getElementById('exampleModalLabel');
        titulomodal.innerHTML ='';
        titulomodal.innerHTML+=`${globalvideos[idvideo-1].titulo}`
        cuerpomodal = document.getElementById('modal-body')
        cuerpomodal.innerHTML ='';
        cuerpomodal.innerHTML+=`
        <iframe width="470" height="315"
        src=${globalvideos[idvideo-1].enlace}>
        </iframe>`

      })