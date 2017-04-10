<?php
// INSERT/UPDATE MILSTD SYMBOL

require './db_config.php';
require './symbols-model.php';
require './projection-codes.php';

$isActionInsert = $_GET['action'] == 'insert';
$isActionUpdate = $_GET['action'] == 'update';

if ($isActionInsert || $isActionUpdate ) { // provede se po odeslani formulare
  $model = new SymbolsModel($connection);

  $milstdString = $_GET['resultString'];
  $descr = substr($milstdString, 4, strlen($milstdString));
  $prio = isset($_GET['prio']) ? $_GET['prio'] : 0;
  $overlayId =  $_GET['overId'];

  $color = $_GET['color'];
  $font = $_GET['font'];
  $string = $_GET['string'];

  if ($isActionInsert) { //insert - vlozenibodu do databaze
    $x = $_GET['x'];
    $y = $_GET['y'];
    $projection = $_GET["p"];

    $point = "ST_GeometryFromText('MULTIPOINT ($x $y)', $projection)";

    if ($projection != ProjectionCodes::wgs84) {
       $point = "ST_Transform($point, ".ProjectionCodes::wgs84.")";
    }

    $symbolName = $model->getSymbolName($descr);
    # insert returns id of tobo object related to symbol
    $symbolObjectId = $model->insertSymbolPosition($point, $symbolName, $overlayId);

    $model->insertObjectValue($milstdString, $symbolObjectId, 'id');

    $model->insertObjectValue($prio, $symbolObjectId, 'prio', 'integer');

    // NEW PARAMS FOR MILSTD SYMBOLS

    $model->insertObjectValue('#'.$color, $symbolObjectId, 'color');

    $model->insertObjectValue($font, $symbolObjectId, 'font');

    $model->insertObjectValue($string, $symbolObjectId, 'string');

  } else if ($isActionUpdate) { //update - jen zmenime id u editovane znacky

    //vlozeni do tab geo_object_value_real
    $symbolObjectId = $_GET['id_obj'];

    $objectValueId = $model->getValueIdByObjectId($symbolObjectId, 'id');

    $model->updateObjectValue($milstdString, $objectValueId);

    $objectValueId = $model->getValueIdByObjectId($symbolObjectId, 'prio');
    $model->updateObjectValue($prio, $objectValueId, 'integer');

    // NEW PARAMS FOR MILSTD SYMBOLS

    $objectValueId = $model->getValueIdByObjectId($symbolObjectId, 'font');
    $model->updateObjectValue($font, $objectValueId);

    $objectValueId = $model->getValueIdByObjectId($symbolObjectId, 'color');
    $model->updateObjectValue('#'.$color, $objectValueId);

    $objectValueId = $model->getValueIdByObjectId($symbolObjectId, 'string');
    $model->updateObjectValue($string, $objectValueId);

    $model->updateObjectNameBySymbolName($descr, $symbolObjectId);
  }
}

?>
