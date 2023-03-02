<?php 
function Conectarse() 
{ 
    if(!$link = mysqli_connect("localhost", "root", "", "ieintern_adminieportal")){
      echo "Error conectando a la base de datos."; 
      exit(); 
    }
    return $link; 
} 
?>
