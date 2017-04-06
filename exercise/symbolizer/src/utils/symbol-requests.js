import 'whatwg-fetch';
import config from './config';

export default {
  getTreeData: function() {
    return fetch(config.ajaxRequestBaseUrlPath + "/get-tree-data"/*, {
      dataType: 'json'
    }*/);
  },
  getSymbolPreviewData: function(milstdString) {
    return fetch(config.ajaxRequestBaseUrlPath + "/preview", {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sidc: milstdString
      })
    });
  },
  getSymbolDefencePriority: function(objectId) {
    return fetch(config.ajaxRequestBaseUrlPath + "/get-symbol-defence-priority", {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        objectId: objectId
      })
    });
  },
  saveSymbol: function(params) {
    return fetch(config.ajaxRequestBaseUrlPath + "/milstd_db", {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  }
};
