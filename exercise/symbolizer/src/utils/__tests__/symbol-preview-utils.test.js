import utils from '../symbol-preview-utils';

describe('Symbol preview utils', () => {
  describe('method parseSymbolFromApp6Data', () => {
    const testApp6Data = [
      '/usr/share/fonts/truetype/milstan.ttf',
      '2', 'ffff00', '97', '77',
      'Font family:MILSTD2525AIR',
      'Font alias:Milair'
    ];
    const parsed = utils.parseSymbolFromApp6Data(testApp6Data);
    const code2char = (code) => String.fromCharCode(code);

    it('should parse font path from string and get correct font name', () => {
      expect(parsed).toHaveProperty('font', 'MILSTD2525AIR');
    });
    it('should parse color from string', () => {
      expect(parsed).toHaveProperty('color', 'ffff00');
    });
    it('should parse next count of charcodes and convert them to string', () => {
      let requiredString = code2char('97') + code2char('77') + '\0';

      expect(parsed).toHaveProperty('chars', requiredString);

      const secondApp6Str = ['/usr/share/fonts/truetype/milstan.ttf', '5', 'ffff00', '92', '75', '68', '99', '115', 'Font family:MILSTD2525AIR'];
      requiredString = code2char('92') + code2char('75') + code2char('68') + code2char('99') + code2char('115') + '\0';

      expect(utils.parseSymbolFromApp6Data(secondApp6Str)).toHaveProperty('chars', requiredString);
    });

    it('should parse font alias from string', () => {
      expect(parsed).toHaveProperty('fontAlias', 'Milair');
    });
  });
  describe('method getDefenceSymbolByPriority', () => {
    it('should make defence symbol from small symbols when symbol not defined', () => {
      const priority = 6;
      const expectedDefenceSymbol = String.fromCharCode(96 + priority);

      expect(utils.getDefenceSymbolByPriority(priority, '')).toEqual(expectedDefenceSymbol);
      expect(utils.getDefenceSymbolByPriority(priority)).toEqual(expectedDefenceSymbol);
    });
    it('should make defence symbol from large symbols when symbol is defined', () => {
      const priority = 3;

      expect(utils.getDefenceSymbolByPriority(priority, 'CS')).toEqual(String.fromCharCode(64 + priority));
    });
  });
  describe('isSymbolIdEmpty', () => {
    it('should return true when symbolId has only white space characters', () => {
      expect(utils.isSymbolIdEmpty('     ')).toBe(true);
      expect(utils.isSymbolIdEmpty('')).toBe(true);
    });
    it('should return true when symbolId equal to ------', () => {
      expect(utils.isSymbolIdEmpty('------')).toBe(true);
    });
    it('should return false when symbolId is valid non-empty string', () => {
      expect(utils.isSymbolIdEmpty('adS')).toBe(false);
    });
  });
});