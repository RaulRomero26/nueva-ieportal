<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
if(filter_input(INPUT_POST, 'buscar_id')){
$num1=filter_input(INPUT_POST, 'buscar_id');
$consulta_n=$conn->query("SELECT temas.ID_tema, temas.Nombre,  registro_respuestas.Num_errores FROM temas INNER JOIN registro_respuestas 
                        ON temas.ID_tema=registro_respuestas.ID_tema AND registro_respuestas.ID_alumno='$num1' where temas.Habilitado=1 ORDER BY temas.ID_tema;"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['ID_tema']=(string)$fila['ID_tema'];
		   $obj['Nombre']=(string)$fila['Nombre'];
           $obj['resultados']=(string)$fila['Num_errores'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	
}

?>