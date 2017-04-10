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
    xit('should make defence symbol from small symbols when symbol not defined', () => {
      // TO TEST
    });
    xit('should make defence symbol from large symbols when symbol is defined', () => {
      // TO TEST
    });
  });
  describe('isSymbolIdEmpty', () => {
    xit('should return true when symbolId has only white space characters', () => {
      // TO TEST
    });
    xit('should return true when symbolId equal to ------', () => {
      // TO TEST
    });
    xit('should return false when symbolId is valid non-empty string', () => {
      // TO TEST
    });
  });
});