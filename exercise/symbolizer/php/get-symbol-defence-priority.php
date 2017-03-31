<?php
  require './db_config.php';
  require './symbols-model.php';

  $model = new SymbolsModel($connection);

  $objectId = $_GET['objectId'];

  $valueId = $model->getValueIdByObjectId($symbolObjectId, 'prio');
  $priority = $model->getObjectValue($valueId, 'integer');

  echo json_encode(array('priority' => $priority));
?>