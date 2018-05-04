<?php
require __DIR__ . '/vendor/autoload.php';
include_once('json.php');
use \Simple\json;
$name = $_POST['name'];
$lastName = $_POST["lastName"];

$jpg_image = imagecreatefromjpeg(dirname(__FILE__) . '/images/certificate_template.jpg');
// pick color for the text
  $color= imagecolorallocate($jpg_image, 0 , 0, 0);

  // Set font to the text
  $font = dirname(__FILE__) . '/arial.ttf';

  // Set text to be write on image
  $text = $name . " " . $lastName;

  // Write text on image
  imagettftext($jpg_image, 60, 0, 325, 600, $color, $font, $text);

$path = "certificates/".$name."_".$lastName.rand().".jpg";
imagejpeg($jpg_image, $path);

$json =  new json();
$object = new stdClass();
$object->url = 'http://localhost/pdfteste/'.$path;
$json->data = $object;
$json->send();

?>
