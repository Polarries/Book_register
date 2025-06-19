<?php 
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: Content-Type"); 
     header("Access-Control-Allow-Methods: POST");   
     header("Content-type: application/json; charset=utf-8");
     include '../db.php';


$data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] !== 'POST'){
        echo json_encode(array("status" => "error"));
        die();
    }

     try {
       $stmt = $dbh->prepare("INSERT INTO books (bName, aName, genre) VALUES (?, ?, ?)");
       $stmt->bindParam(1, $data->bName);
       $stmt->bindParam(2, $data->aName);
       $stmt->bindParam(3, $data->genre);

       if($stmt->execute()){
        echo json_encode(array("status" => "ok"));
       }
       else{
        echo json_encode(array("status" => "error"));
       }

      $dbh = null;
    } catch (PDOException $e) {
        print "Error!: " .$e->getMessage() . "<br>";
        die();
   
}
?>