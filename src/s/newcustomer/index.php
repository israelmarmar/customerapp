<?php
require_once '../login/config.php';

session_start();

if(!empty($_SESSION['username'])){

	if(!empty(trim($_GET['firstname']))){


		$first_name = mysqli_real_escape_string($link, $_GET['firstname']);
		$last_name = mysqli_real_escape_string($link, $_GET['lastname']);
		$email = mysqli_real_escape_string($link, $_GET['email']);
		$city = mysqli_real_escape_string($link, $_GET['city']);
		$address = mysqli_real_escape_string($link, $_GET['address']);

		$sql = "insert into 'customer' (name, lastname, email, city, address) values 
		('$first_name', '$last_name', '$email', '$city', '$address')";


	$result = mysqli_query($link, $sql) or die(mysqli_error());

	http_response_code(200);
	echo "Customer added successful";
  

	}else{
		http_response_code(400);
		echo "No data. " ;       
	}




}else{
	http_response_code(401);
	echo "Access denied. " ;
}


?>