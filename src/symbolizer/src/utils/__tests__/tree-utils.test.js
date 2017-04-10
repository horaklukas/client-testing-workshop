import utils from '../tree-utils';

describe('Symbol preview utils', () => {
    const data = {
      0: [
        {id: 1, title: '100', value: {symbolId: null, dimension: null}},
        {id: 2, title: '200', value: {symbolId: 'S200', dimension: 'A'}}
      ],
      1: [
        {id: 3, title: '110', value: {symbolId: 'S110', dimension: 'B'}},
        {id: 4, title: '120', value: {symbolId: null, dimension: null}},
        {id: 6, title: '130', value: {symbolId: '  ', dimension: null}}
      ],
      2: [
        {id: 11, title: '1100', value: {symbolId: 'S1110', dimension: 'F'}}
      ],
      4: [{id: 5, title: '121', value: {symbolId: 'S121', dimension: 'C'}}],
      6: [
        {id: 7, title: '122', value: {symbolId: 'L122', dimension: null}},
        {id: 9, title: '150', value: {symbolId: 'S150', dimension: 'G'}}
      ],
      7: [{id: 8, title: '140', value: {symbolId: 'S140', dimension: 'D'}}],
      9: [{id: 10, title: '160', value: {symbolId: 'S121', dimension: 'E'}}],
      11: [{id: 12, title: '1200', value: {symbolId: 'S1200', dimension: 'H'}}]
    };

  describe('method getPathToLevelByName', () => {
    it('should find and return path to deeply nested level', () => {
      expect(utils.getPathToLevelByName('122', data)).toEqual([
        {
          id: 1,
          title: '100'
        }, {
          id: 6,
          title: '130'
        }, {
          id: 7,
          title: '122'
        }
      ]);
    });

    xit('should find path to previous level if passed name of leaf', () => {
      // TO TEST
    });

    xit('should return empty path if level not found', () => {
      // TO TEST
    });
  });

  describe('getPathToLevelBySymbolIdAndName', () => {
    xit('should find and return path to deeply nested symbol', () => {
      // TO TEST
    });

    xit('should include levels that have non empty symbol id', () => {
      // TO TEST
    });

    xit('should compare also by name to distinguish symbols with same id', () => {
      // TO TEST
    });

    xit('should find path to previous level if passed symbol id of level', () => {
      // TO TEST
    });

    xit('should return empty path if object with symbol id not found', () => {
      // TO TEST
    });
    xit('should return empty path if object with required id has wrong name', () => {
      // TO TEST
    });
  });
});
