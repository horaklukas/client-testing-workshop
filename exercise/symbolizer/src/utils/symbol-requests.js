import 'whatwg-fetch';
import config from './config';

export default {
  getTreeData: function() {
    return fetch(config.ajaxRequestBaseUrlPath + "/get-tree-data")
      .then(response => response.json());
  },
  getSymbolPreviewData: function(milstdString) {
    return fetch(config.ajaxRequestBaseUrlPath + "/preview", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sidc: milstdString
      })
    })
    .then(response => response.json());
  },
  getSymbolDefencePriority: function(objectId) {
    return fetch(config.ajaxRequestBaseUrlPath + "/get-symbol-defence-priority", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        objectId: objectId
      })
    })
    .then(response => response.json());
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
