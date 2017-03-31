import utils from '../milstd-string';

describe('milstdString utils', () => {
  describe('method parse', () => {
    it('should parse all items from milstd string correctly', () => {
      expect(utils.parse('SPAPMF-----BENG')).toEqual({
        scheme: 'S',
        affiliation: 'P',
        dimension: 'A',
        status: 'P',
        symbolId: 'MF----',
        modifier: '-B',
        country: 'EN',
        order: 'G'
      });
    });
  });
});