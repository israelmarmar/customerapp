<?php
// Include config file
require_once 'config.php';
// Define variables and initialize with empty values

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

     // Check if username is empty
    if(empty(trim($_POST["username"]))){
        http_response_code(400);
        echo 'Please enter username.';
    } else{
        $username = trim($_POST["username"]);
    }
 
    // Check if password is empty
    if(empty(trim($_POST['password']))){
        $password_err = 'Please enter your password.';
    } else{
        $password = trim($_POST['password']);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){

        // Prepare a select statement
        $sql = "SELECT username, password FROM users WHERE username = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){

            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){

                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){

                        if(password_verify($password, $hashed_password)){
                            /* Password is correct, so start a new session and
                            save the username to the session */

                            session_start();
                            http_response_code(200);
                            $_SESSION['username'] = $username;      
                            $body->username = $username;
                            $body=json_encode($body);
                            echo $body;
                        } else{

                            // Display an error message if password is not valid
                            http_response_code(400);
                            echo 'The password you entered was not valid.';
                            
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    http_response_code(400);
                    echo 'No account found with that username.';
                    
                }
            } else{
                http_response_code(400);
                echo "Oops! Something went wrong. Please try again later.";
                
            }
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);
}else{
    http_response_code(401);
    echo "Access denied. " ;
    
}
?>