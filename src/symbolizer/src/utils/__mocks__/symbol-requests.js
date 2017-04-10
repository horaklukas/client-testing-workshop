let treeData = null;
//let fetchCb = null;

let symbolPreview = null;
let defPriority = null;

export default {
  __resetAllData: () => {
    treeData = null;
    symbolPreview = null;
    defPriority = null;
  },

  __setTreeData: (data, fetchCb) => {
    treeData = data;
    fetchCb = fetchCb;
  },

  __setSymbolPreviewData: (preview) => {
    symbolPreview = preview;
  },

  __setSymbolDefencePriority: (priority) => {
    defPriority = priority;
  },

  getTreeData: jest.fn().mockImplementation(() => {
    /*return new Promise((resolve, reject) => {
      treeData && resolve(treeData) || reject();
    });*/
    return {
      then: (cb) => cb(treeData) 
    }
  }),

  getSymbolPreviewData: jest.fn().mockImplementation((milstdString) => {
    /*return new Promise((resolve, reject) => {
      symbolPreview && resolve(symbolPreview) || reject();
    });*/
    return {
      then: (cb) => cb(symbolPreview) 
    }
  }),
  getSymbolDefencePriority: jest.fn().mockImplementation((objectId) => {
    /*return new Promise((resolve, reject) => {
      defPriority && resolve(defPriority) || reject();
    });*/
    return {
      then: (cb) => cb(defPriority) 
    }
  }),

  saveSymbol: jest.fn()
};
