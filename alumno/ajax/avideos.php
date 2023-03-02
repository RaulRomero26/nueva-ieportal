<?php
				include '../../shared/conexionle.php';
				$mysql=Conectarse(); 
				if (!$mysql) { 
				die('Not connected : ' . mysql_error()); 
				echo mysql_error();
				}
				mysqli_set_charset($mysql, "utf8");
				$consulta_n=$mysql->query("SELECT * FROM videos"); //session nivel 
				$cont=0; 
				$obj=array();
                $obj2=array();
				while ($fila = $consulta_n->fetch_array()){
					$obj['id']=$fila['id'];
					$obj['titulo']=$fila['titulo'];
					$obj['enlace']=$fila['enlace'];
					array_push($obj2,$obj);
				}
				echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
			?>		