<?php

require "./db_config.php";

/**
 * A - letecke
 * G - pozemni
 * O - operations_other
 * S - special_operations_forces
 * I - ground unit installation)
 *
 * @param {string} font Its value of column `font` in `topo_def_mils` table. It
 *  isnt probably a font, but some case of pseudo battle dimension.
 * @return {string} real battle dimension value
 */
function getDimensionCharByFont($font) {
  switch($font) {
    case 'A': case 'SA':
      return 'A'; break;

    case 'U': case 'E': case 'G': case 'I': case 'SG':
      return 'G'; break;

    case 'O':
      return 'O'; break;

    case 'N': case 'SE': case 'SM':
      return 'S'; break;

    case 'T':
      return 'I'; break;

    case 'L':
      return 'L'; break;

    case 'V':
      return 'V'; break;

    case 'S':
      return 'F'; break;

    case 'SU': case 'SS':
      return 'U'; break;

    case 'SP':
      return 'P'; break;
  }
}
/**
 * @param {string} font
 * @return {string} MIL-STD-2525 coding scheme
 */
function getSchemeCharByFont($font) {
  switch($font) {
    case 'U': case 'E': case 'G': case 'I': case 'S':
    case 'N': case 'SE': case 'SU': case 'A':
      return 'S'; break;

    case 'L': case 'V': case 'O': case 'T':
      return 'O'; break;

    case 'SA': case 'SP': case 'SG': case 'SM': case 'SS':
      return 'I'; break;
  }
}

try {
  if($connection === false) {
    throw new Exception('Database not connected');
  }

  $result = pg_query ($connection, "SELECT * FROM topo_def_mils ORDER BY tdm_id_pk;");

  if($result === false) {
    throw new Exception('Query error');
  }
} catch (Exception $e) {
  $protocol = $_SERVER["SERVER_PROTOCOL"];
  $msg = $e->getMessage();

  header("$protocol 503 Service Temporarily Unavailable - $msg");
  exit;
}

$resultTree = array();

while ($row = pg_fetch_array($result)) {
  $parentId = empty($row['tdm_pid']) ? 0 : $row['tdm_pid'];

  $resultTree[$parentId][] = array(
    'id' => $row['tdm_id_pk'],
    'title' => $row['tdm_descr'],
    'value' => array(
      'symbolId' => $row['tdm_id'] !== NULL ? $row['tdm_id'] : '',
      'dimension' => getDimensionCharByFont($row['tdm_font']),
      'scheme' => getSchemeCharByFont($row['tdm_font'])
    )
  );
}

exit(json_encode($resultTree));

?>