<?php 
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
     header("Access-Control-Allow-Headers: Content-Type, Authorization");
     header("Content-type: application/json; charset=utf-8");
     include '../db.php';


$data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] !== 'DELETE'){
        echo json_encode(array("status" => "error"));
        die();
    }

     try {
       $stmt = $dbh->prepare("DELETE FROM books WHERE code=?");
       $stmt->bindParam(1, $data->code);

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