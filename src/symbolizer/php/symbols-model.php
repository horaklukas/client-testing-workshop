<?php
class SymbolsModel {
  private $connection;

  function __construct($connection) {
    $this->connection = $connection;
  }

  function __destruct() {
    pg_close($this->connection);
  }

  public function insertSymbolPosition($positionPoint, $symbolName, $overlayId) {
    $query = "INSERT INTO topo_objects(to_tp_id_fk, to_shape_type, to_name, to_identity) VALUES ('$overlayId', 'mil_point', '$symbolName', 'f')";
    $result = $this->query($query);

    $query = "SELECT to_id_pk FROM topo_objects where to_tp_id_fk = $overlayId ORDER BY to_id_pk DESC LIMIT 1";
    $objectId = $this->getSelectQueryResult($query);

    $query = "INSERT INTO topo_object_points(top_point, top_to_id_fk, top_visible) VALUES ($positionPoint, $objectId, 'TRUE')";
    $result = $this->query($query);
    return $objectId;
  }

  public function getValueIdByObjectId($objectId, $valueName = null) {
    $query = "SELECT tov_id_pk FROM topo_object_values where tov_to_id_fk = $objectId";
    $query .= $valueName !== null ? "AND tov_abbr = 'symbol_$valueName'" : '';

    return $this->getSelectQueryResult($query);
  }

  public function updateObjectValue($value, $objectId, $valueType = 'varchar') {
    $names = $this->getValueTableNamesByType($valueType);

    $value = pg_escape_string($value);

    // TODO - dont use quotes when valueType is integer
    $query = "UPDATE $names->table SET $names->column = '{$value}' WHERE $names->fkColumn = '$objectId'";
    $result = $this->query($query);
  }

  public function insertObjectValue($value, $objectId, $valueName, $valueType = 'varchar') {
    $names = $this->getValueTableNamesByType($valueType);

    $insertQuery = "INSERT INTO topo_object_values(tov_abbr, tov_edit_order, tov_to_id_fk) VALUES ('symbol_$valueName', '1', $objectId) RETURNING tov_id_pk";
    $valueId = $this->getSelectQueryResult($insertQuery);

    $value = pg_escape_string($value);

    $insertQuery = "INSERT INTO $names->table($names->column, $names->fkColumn) VALUES ('{$value}', $valueId)";
    $result = $this->query($insertQuery);
  }

  public function updateObjectNameBySymbolName($symbolId, $objectId) {
    $symbolName = $this->getSymbolName($symbolId);

    $query = "UPDATE topo_objects SET to_name = '$symbolName' WHERE to_id_pk = '$objectId'";

    $result = $this->query($query);
  }

  public function getSymbolName($symbolId) {
    $query = "SELECT tdm_descr FROM topo_def_mils WHERE tdm_id = '$symbolId'";
    return $this->getSelectQueryResult($query);
  }

  public function getObjectValue($valueId, $valueType = 'varchar') {
    $names = $this->getValueTableNamesByType($valueType);

    $query = "SELECT $names->table FROM $names->column WHERE $names->fkColumn = '$valueId'";

    return $this->getSelectQueryResult($query);
  }

  /**
   * Returns name of value table and its columns by value type
   */
  private function getValueTableNamesByType($type) {
    $tableName = 'topo_object_value_'.$type.'s';
    $firstTypeChar = $type[0];

    switch($type) {
      case 'varchar': $dataType = 'string'; break;
      case 'integer': $dataType = 'number'; break;
    }

    $columnName = 'tov'.$firstTypeChar.'_'.$dataType.'_'.$type;
    $fkColumnName = 'tov'.$firstTypeChar.'_tov_id_fk';

    return new ValueTableNames($tableName, $columnName, $fkColumnName);
  }

  private function getSelectQueryResult($query) {
    $result = $this->query($query);
    $row = pg_fetch_row($result);

    return pg_num_rows($result) > 0 ? $row[0] : null;
  }

  private function query($query) {
    return pg_query($this->connection, $query);
  }
}

final class ValueTableNames {
  public $table;
  public $column;
  public $fkColumn;

  function __construct($table, $column, $fkColumn) {
    $this->table = $table;
    $this->column = $column;
    $this->fkColumn = $fkColumn;
  }
}

?>
