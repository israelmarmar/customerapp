<?php
require_once '../login/config.php';

session_start();


if(!empty($_SESSION['username'])){

 if(empty(trim($_GET['id']))){

 $sql = "SELECT * FROM customer";

 $result = mysqli_query($link, $sql) or die(mysqli_error());

	if (mysqli_num_rows($result) > 0) {
    // output data of each row
    header("Content-type: application/json; charset=utf-8");


    $rows=array();
    while($r = mysqli_fetch_assoc($result)) {

        $rows[]=array_map('htmlentities',$r);

    }

    print json_encode($rows);


   	} else {
    echo "0 results";
	}

 }else{
    $sql = "SELECT * FROM customer WHERE id=" . $_GET['id'];

    $result = mysqli_query($link, $sql) or die(mysqli_error());

    $rows=array();
    while($r = mysqli_fetch_assoc($result)) {

        $rows[]=array_map('htmlentities',$r);

    }

    if (count($rows)>0)
    print json_encode($rows[0]);
    else{
    http_response_code(404);
    echo "Not found. " ;    
    }

 }
}else{
http_response_code(401);
echo "Access denied. " ;
}

mysqli_close($conn);
?>