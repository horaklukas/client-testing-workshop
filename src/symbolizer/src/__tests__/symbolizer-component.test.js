import React from 'react';
import {shallow} from 'enzyme';
import Panel from '../symbolizer-component';

jest.mock('../utils/milstd-string');
jest.mock('../utils/symbol-preview-utils');
jest.mock('../utils/tree-utils');
jest.mock('../utils/symbol-requests');

import milstdstrMock from '../utils/milstd-string';
import previewUtilsMock from '../utils/symbol-preview-utils';
import treeUtilsMock from '../utils/tree-utils';
import requestMock from '../utils/symbol-requests';

import ValuSelector from '../value-selector';
import DefenceObject from '../defence-object';
import Tree from '../depth-tree/depth-tree';
import Levels from '../depth-tree/levels-nav';

describe('Symbolizer component', () => {
  beforeEach(() => {
    milstdstrMock.create.mockClear();
    milstdstrMock.parse.mockClear();
    //requestMock.getSymbolPreviewData.mockClear();
    //requestMock.getTreeData.mockClear();
    //requestMock.__resetAllData();
  });

  describe('(tree data)', () => {
    xit('should load default tree data when it wasnt passed at props', () => {
      // TO TEST
    });

    xit('should use supplied tree data if exists', () => {
      // TO TEST
    });

    xit('should use load tree data if no data supplied', () => {
      // TO TEST
    });
  });

  describe('(milstd string)', () => {
    xit('should parse milstd string when passed and set appropriate values', () => {
      // TO TEST
    });

    xit('should not try to parse milstd string when it was not passed', () => {
      // TO TEST
    });
  });

  describe('(symbol name)', () => {
    xit('should left default empty name if it wasnt supplied via props', () => {
      // TO TEST
    });

    xit('should use supplied symbol name if supplied via props', () => {
      // TO TEST
    });
  });

  describe('(defence object)', () => {
    xit('should set the defence object priority if supplied', () => {
      // TO TEST
    });

    xit('should set object not defended in default', () => {
      // TO TEST
    });
  });

  describe('(actual levels)', () => {
    beforeEach(() => {
      treeUtilsMock.getPathToLevelByName.mockReset();
      treeUtilsMock.getPathToLevelBySymbolIdAndName.mockReset();
    });

    xit('should set actual levels immedietlly if treeData supplied via props', () => {
      // TO TEST
    });

    xit('should set actual levels after treeData load if not supplied via props', () => {
      // getActualLevels is not public method
      const props = {
        treeData: {
          'faked': 'tree-data',
          'symbolName': 'BLA'
        }
      };

      const wrapper = shallow(<Panel {...props} />);
      const getLevelsSpy = jest.spyOn(wrapper, 'getActualLevels');

      expect(requestMock.getTreeData).toHaveBeenCalledTimes(1);
      expect(getLevelsSpy).not.toHaveBeenCalled();
      //this.gtdStub["yield"](data);
      expect(getLevelsSpy).toHaveBeenCalledTimes(1);
      expect(getLevelsSpy).toHaveBeenCalledWith(data);
    });

    xit('should try to find actual levels by symbol id of passed mistd string', () => {
      // TO TEST
    });

    xit('should try to find actual levels by name if category supplied', () => {
      const data = {
        'faked': 'tree-data2'
      };
      const levels = ['lvl1', 'lvl2'];
      const props = {
        category: 'War',
        treeData: data
      };

      treeUtilsMock.getPathToLevelBySymbolIdAndName.mockImplementation((id, name, dt) => {
        if(id === 'War' && name === data) {
          return levels;
        }
      });

      //this.treeUtilsMock.getPathToLevelByName.withArgs('War', data).returns(levels);
      const wrapper = shallow(<Panel {...props} />);

      expect(treeUtilsMock.getPathToLevelByName).not.toHaveBeenCalled();
      expect(wrapper.state('actualLevels')).toEqual(levels);
    });
  });

  describe('Definition Note', () => {
    xit('should been displayed in default', () => {
      // TO TEST
    });

    xit('should not been displayed when prop `note` is false', () => {
      // TO TEST
    });

    xit('should been displayed when prop `note` is true', () => {
      // TO TEST
    });
  });

  describe('Controls', () => {
    xit('should display Update button if objectId and onUpdate prop is defined', () => {
     // TO TEST
    });

    xit('should not display Update button if objectId or onUpdate isnt defined', () => {
      // TO TEST
    });

    xit('shoul call onUpdate callback when clicked update button', () => {
      // TO TEST
    });
  });

  describe('Levels navigation', () => {
    xit('should been displayed when there are more than one level in data', () => {
      // TO TEST
    });

    xit('should not been displayed when tree data are not available', () => {
      // TO TEST
    });

    xit('should not been displayed when there is only one level', () => {
      // TO TEST
    });
  });

  describe('Selectors', () => {
    xit('should been displayed when selectOnly not defined', () => {
      // TO TEST
    });

    xit('should been displayed when selectOnly is false', () => {
      // TO TEST
    });

    xit('should not been displayed when selectOnly is true', () => {
      // TO TEST
    });
  });

  xdescribe('method changeSymbol', () => {
    beforeAll(() => {
      //sinon.spy(this.wdw, 'setSymbolState');
    });

    beforeEach(() => {
      //this.wdw.setSymbolState.reset();
      this.gspdThen.reset();
      previewUtilsMock.isSymbolIdEmpty.mockReset();
      previewUtilsMock.isSymbolIdEmpty.withArgs('').returns(true);
      previewUtilsMock.isSymbolIdEmpty.withArgs('------').returns(true);
    });

    it('should trim empty characters when setting new symbol id', () => {
      this.wdw.changeSymbol({
        symbolId: '  A ',
        dimension: 'B'
      });
      expect(this.wdw.setSymbolState).to.been.calledOnce;
      expect(this.wdw.setSymbolState.lastCall.args[0]).to.have.property('symbolId', 'A');
      this.wdw.changeSymbol({
        symbolId: '    ',
        dimension: 'B'
      });
      expect(this.wdw.setSymbolState).to.been.calledTwice;
      expect(this.wdw.setSymbolState.lastCall.args[0]).to.have.property('symbolId', '');
    });

    it('should perform preview update when symbol id isnt empty', () => {
      this.wdw.changeSymbol({
        symbolId: ' AB',
        dimension: 'B'
      });
      this.requestMock.getSymbolPreviewData.should.been.calledOnce;
    });

    it('should not perfrom preview update when symbol id is empty', () => {
      this.wdw.changeSymbol({
        symbolId: '    ',
        dimension: 'B'
      });
      expect(this.requestMock.getSymbolPreviewData, 'empty string').to.not.been.called;
      this.wdw.changeSymbol({
        symbolId: '------',
        dimension: 'B'
      });
      expect(this.requestMock.getSymbolPreviewData, 'only dashes').to.not.been.called;
    });

    it('should set empty symbol when symbolId is null', () => {
      this.wdw.changeSymbol({
        symbolId: null,
        dimension: 'B'
      });
      this.wdw.setSymbolState.should.been.calledOnce;
      this.wdw.setSymbolState.lastCall.args[0].should.have.property('symbolId', '');
    });

    it('should call onSymbolSelect callback when valid symbol selected', () => {
      var cb;
      cb = sinon.spy();
      this.wdw.setProps({
        onSymbolSelect: cb
      });
      this.wdw.changeSymbol({
        symbolId: 'PF--------',
        dimension: 'B'
      });
      this.gspdThen["yield"]('bla|bla|bla');
      cb.should.been.calledOnce;
      expect(cb.lastCall.args[0]).to.have.keys(['symbol', 'milstdString', 'name', 'defenceObject']);
    });
  });
});
