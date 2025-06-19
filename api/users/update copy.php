<?php 
     header("Access-Control-Allow-Origin: *");
     header("Content-type: application/json; charset=utf-8");
     include '../db.php';


$data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] !== 'PATCH'){
        echo json_encode(array("status" => "error"));
        die();
    }

     try {
       $stmt = $dbh->prepare("UPDATE books SET bName=?, aName=? WHERE code=?");
       $stmt->bindParam(1, $data->bName);
       $stmt->bindParam(2, $data->aName);
       $stmt->bindParam(3, $data->code);

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