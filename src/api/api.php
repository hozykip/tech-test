<?php

$servername = "localhost";
$username = "root";
$password = "";

try {
  $conn = new PDO("mysql:host=$servername;dbname=tech-test", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  die ("Connection failed: " . $e->getMessage());
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
//header('Access-Control-Allow-Origin: POST');

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $sql = "SELECT * FROM tutorials";

    $stmt = $conn->prepare($sql);
    try{
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);

    }catch(PDOException $e){
        die($e->getMessage());
    }
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){

    $json = file_get_contents('php://input');

    $data = json_decode($json);

    $title = $data->title;
    $description = $data->description;
    $published = $data->published;

    $id = null;

    if(isset($data->id)){
        $id = $data->id;
        //update
        $sql = "UPDATE tutorials SET title = '$title', description = '$description', published = $published WHERE id = $id";
        //die($sql);
    }else{
        //create
        $sql = "INSERT INTO tutorials (title, description, published) VALUES ('$title', '$description', $published)";
    }

    $stmt = $conn->prepare($sql);
    try{
        $stmt->execute();

        $insertId = $id != null ? $id : $conn->lastInsertId();

        $result = [
            "id" => $insertId,
            "title" => $title,
            "description" => $description,
            "published" => $published
        ];

        echo json_encode($result);

    }catch(PDOException $e){
        die($e->getMessage());
    }
}


if($_SERVER['REQUEST_METHOD'] === 'DELETE'){

    $json = file_get_contents('php://input');

    $data = json_decode($json);

    $id = $data->id;


    $sql = "DELETE FROM tutorials WHERE id = $id";

    $stmt = $conn->prepare($sql);
    try{
        $stmt->execute();

        $insertId = $conn->lastInsertId();

        $result = [
            "id" => $insertId,
            "title" => $title,
            "description" => $description,
            "published" => $published
        ];
        //header('Access-Control-Allow-Origin: *');
        echo json_encode($result);

    }catch(PDOException $e){
        die($e->getMessage());
    }
}
