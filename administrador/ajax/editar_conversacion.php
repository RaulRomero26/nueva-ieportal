<?php
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($mysql, "utf8");
	$id_c=filter_input(INPUT_POST, 'id_conversacion');
	$nombre=filter_input(INPUT_POST, 'nombre');
	$archivo=filter_input(INPUT_POST, 'archivo');
	if((strpos($archivo, "docs.google.com")!==false) or (strpos($archivo, "drive.google.com")!==false) ){
		$aux=explode("/",$archivo);
		$archivo=$aux[5];
	}
	$instruccion="update conversaciones set Nombre='$nombre', Ruta='$archivo' where ID_conv='$id_c'";
		
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
		$errors []= "Lo siento, hay un problema con la base de datos intente con uno nuevo";
    }
	else{
		 $messages[] = "La conversación se ha editado correctamente";
	}
	
	if (isset($errors)){
			
			?>
			<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					<?php
						foreach ($errors as $error) {
								echo $error;
								?>
								<br>
								<?php
							}
						?>
			</div>
			<?php
			}
			if (isset($messages)){
				
				?>
				<div class="alert alert-success" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<?php
							foreach ($messages as $message) {
									echo $message;
									?>
								<br>
								<?php
								}
							?>
				</div>
				<?php
			}