<?php 
     header("Access-Control-Allow-Origin: *");
     header("Content-type: application/json; charset=utf-8");
     include '../db.php';
     try {
    
        $users = array();
        foreach($dbh->query('SELECT * from books') as $row){
            array_push($users, array(
                'bName' => $row['bName'],
                'aName' => $row['aName'],
                'code' => $row['code'],
            ));
        }
        echo json_encode($users);
      $dbh = null;
    } catch (PDOException $e) {
        print "Error!: " .$e->getMessage() . "<br>";
        die();
    // attempt to retry the connection after some timeout for example
}
?>