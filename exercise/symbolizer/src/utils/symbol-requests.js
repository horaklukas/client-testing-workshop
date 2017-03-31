import 'whatwg-fetch';
import config from './config';

export default {
  getTreeData: function() {
    return fetch({
      url: config.ajaxRequestBaseUrlPath + "/get-tree-data.php",
      dataType: 'json'
    });
  },
  getSymbolPreviewData: function(milstdString) {
    return fetch({
      url: config.ajaxRequestBaseUrlPath + "/preview.php",
      data: {
        sidc: milstdString
      },
      dataType: 'json'
    });
  },
  getSymbolDefencePriority: function(objectId) {
    return fetch({
      url: config.ajaxRequestBaseUrlPath + "/get-symbol-defence-priority.php",
      data: {
        objectId: objectId
      },
      dataType: 'json'
    });
  },
  saveSymbol: function(params) {
    return fetch({
      url: config.ajaxRequestBaseUrlPath + "/milstd_db.php",
      data: params,
      cache: false,
      dataType: 'html'
    });
  }
};