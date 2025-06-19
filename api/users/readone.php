<?php 
     header("Access-Control-Allow-Origin: *");
     header("Content-type: application/json; charset=utf-8");
     include '../db.php';
     try {
        $stmt = $dbh->prepare("SELECT * FROM books where code = ?");
        $stmt->execute([$_GET['code']]);
        foreach ($stmt as $row) {
          $books = array(
            'bName' => $row['bName'],
            'aName' => $row['aName'],
            'code' => $row['code'],
            'genre' => $row['genre'],
        );
        echo json_encode($books);
        break;
        }

      $dbh = null;
    } catch (PDOException $e) {
        print "Error!: " .$e->getMessage() . "<br>";
        die();
   
}
?>