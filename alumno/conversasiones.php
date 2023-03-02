<?php session_start() ?>
<?php if(!$_SESSION){header("Location: ../shared/login");} ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversaciones | International English</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" 
	integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
	crossorigin="anonymous">
	<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
	<link rel="stylesheet" href="../shared/css/header.css">
	<link rel="stylesheet" href="../shared/css/styles.css">
    <link rel="icon" href="../shared/assets/img/imagotipo.ico" />
	<title>International English | Conversaciones </title>
</head>
<body class="cuerpo">
        <div class="container-fluid px-0">
			<?php require '../shared/header.php'?>
        </div>
		<div class="row titulo centrado">
			<h1>Conversaciones</h1>
		</div>
		
		<div class="contenedor contenedor--grande  contenedor--minimo contenedor--sombra animate__animated animate__fadeIn">
			<div id="contenedor_categoria" class ="d-flex justify-content-center flex-wrap py-2">
			</div>
			
			<div class="container-fluid">
				<div class="row">
					<div class="col">
						<div id="Nombres" class="d-flex justify-content-center flex-wrap py-1"></div>
					</div>
				</div>
				<div class="row justify-content-center">
					<div class="col text-center py-1" id="colbuttons" style="display: none; " >
						<button class="btn btn-primary mt-1" id="anterior">Anterior</button>
						<button class="btn btn-primary mt-1" id="speak" >Reproducir</button>
						<button class="btn btn-primary mt-1" id="siguiente">Siguiente</button>
					</div>
				</div>
				<div id="Iframe-Liason-Sheet" class="center-block-horiz pb-3">
       				<div class="responsive-wrapper responsive-wrapper-wxh-760x1200" id="Documento" style="display: none;">
         				
       				</div>
     			</div>
			</div>
		</div>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    <script src="js/conversasiones.js"></script>
</body>
</html>
