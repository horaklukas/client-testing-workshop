const getFontName = (fontPath = '') => {
  const fontAlias = fontPath.substring(fontPath.lastIndexOf("/") + 1, fontPath.length);
  let fontName;

  switch (fontAlias) {
    case 'milstgen.ttf':
      fontName = 'MILSTD2525GROUNDEquipment';
      break;
    case 'milstotw.ttf':
      fontName = 'MILSTD2525OTW';
      break;
    case 'milstsof.ttf':
      fontName = 'MILSTD2525SOF';
      break;
    case 'milstgin.ttf':
      fontName = 'MILSTD2525GIN';
      break;
    case 'milstgun.ttf':
      fontName = 'MILSTD2525GROUNDUnits';
      break;
    case 'milstsea.ttf':
      fontName = 'MILSTD2525SEA';
      break;
    case 'milstsubsea.ttf':
      fontName = 'MILSTD2525SEASU';
      break;
    case 'milstsisp.ttf':
      fontName = 'MILSTD2525SISP';
      break;
    default:
      fontName = "MILSTD2525AIR"
      break;
  }

  return fontName;
};

export default {
  parseSymbolFromApp6Data: (params) => {
    const fontName = getFontName(params[0]);
    const charsCount = parseInt(params[1]);
    const color = params[2];

    const lastParamIdx = params.length - 1;
    const [label, fontAlias] = params[lastParamIdx].split(':');

    let characters = '';

    let i = 3;
    let j = 3;
    for (let ref = charsCount + 3; 3 <= ref ? j <= ref : j >= ref; i = 3 <= ref ? ++j : --j) {
      characters += String.fromCharCode(params[i]);
    }

    return {
      font: fontName,
      fontAlias: fontAlias,
      color: color,
      chars: characters
    };
  },

  getFontName,

  getDefenceSymbolByPriority: (priority, symbolId = '') => {
    // 96 = start of small symbols (letters), 64 = start of large symbols (letters)
    // small symbols are used when no symbol is selected
    const symbolCode = symbolId === '' ? 96 : 64

    return String.fromCharCode(symbolCode + priority);
  },

  isSymbolIdEmpty: (symbolId) => {
    symbolId = symbolId.toString().trim();
    return symbolId === '' || symbolId === '------';
  }
}
