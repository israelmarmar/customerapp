<?php
// Initialize the session
session_start();
 
// Unset all of the session variables


$_SESSION = array();
 
// Destroy the session.
session_destroy();

 http_response_code(200);   
 $body->message = "destroyed!";
 $body=json_encode($body);
 echo $body;
exit;
?>