const findValueAtTreeAndGetPathToRoot = (key, value, tree, decideFnc) => {
  let path = []
  let completed = false

  let foundBy = {id: null};
  foundBy[key] = value;

  while(completed === false) {
    let found = false;
    let levelId;

    for(levelId in tree) {
      let level = tree[levelId];

      for(let j = 0; j < level.length; j++) {
        let obj = level[j];
        let idEquals = obj.id.toString() === foundBy.id;
        let result = decideFnc(obj, foundBy, idEquals);

        switch(result) {
          // found, add to path
          case true:
            path.unshift({
              id: obj.id,
              title: obj.title
            });
            break;

          // found but dont add to path
          case false:
            // nothing
            break;

          // not found
          case null:
           continue;
        }

        found = true;
        break;
      }

      if (found) {
        break;
      }
    }
    if (!found) {
      completed = true
    } else {
      foundBy = {id: levelId.toString()};
      foundBy[key] = null;
    }
  }

  return path;
}

export default {
  getPathToLevelByName: (name, tree) => {
    const KEY = 'title'

    const decideFnc = (obj, foundBy, idEquals) => {
      if(obj[KEY] === foundBy[KEY] || idEquals) {
        // dont add to path if found but isnt really level at tree, but only leaf
        return tree[obj.id] != null;
      } else {
        return null;
      }
    };

    findValueAtTreeAndGetPathToRoot(KEY, name, tree, decideFnc);
  },

  getPathToLevelBySymbolIdAndName: (symbolId, name, tree) => {
    const KEY = 'symbolId';
    const KEY2 = 'title';

    const decideFnc = (obj, foundBy, idEquals) => {
      const symbolIdEquals = obj.value[KEY] != null && obj.value[KEY] === foundBy[KEY];
      const nameEquals = obj[KEY2] === name;

      // if found correct symbol id (with corresponding name), do nothing, first
      // path crumb will be added at next loop iteration
      return symbolIdEquals && nameEquals ? false : (idEquals ? true : null);
    };

    findValueAtTreeAndGetPathToRoot(KEY, symbolId, tree, decideFnc);
  },
  findValueAtTreeAndGetPathToRoot
}