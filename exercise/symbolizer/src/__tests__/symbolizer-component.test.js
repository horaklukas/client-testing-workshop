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
    requestMock.getSymbolPreviewData.mockClear();
    requestMock.getTreeData.mockClear();
    requestMock.__resetAllData();
  });

  describe('(tree data)', () => {
    it('should load default tree data when it wasnt passed at props', () => {
      const wrapper = shallow(<Panel />);

      expect(requestMock.getTreeData).toHaveBeenCalledTimes(1);
    });
  
    it('should use supplied tree data if exists', () => {
      const data = {
        'faked': 'tree-data'
      };
      const wrapper = shallow(<Panel treeData={data} />);

      expect(requestMock.getTreeData).toHaveBeenCalledTimes(0);
      expect(wrapper.state('treeData')).toEqual(data);
    });
  
    it('should use load tree data if no data supplied', () => {
      const data = {
        'faked': 'tree-data'
      };
      requestMock.__setTreeData(data);
      requestMock.__setSymbolPreviewData("FAKE PREVIEW");

      const wrapper = shallow(<Panel />);

      expect(requestMock.getTreeData).toHaveBeenCalledTimes(1);
      expect(wrapper.state('treeData')).toEqual(data);
    });
  });

  describe('(milstd string)', () => {
    it('should parse milstd string when passed and set appropriate values', () => {
      const props = {
        milstdString: 'MSMFDE'
      };
      
      milstdstrMock.parse.mockImplementation((string) => {
        if(string === props.milstdString) {
          return {
            scheme: 'M',
            affiliation: 'S',
            dimension: 'M',
            status: 'F',
            symbolId: 'DE'
          };
        }
      });

      const wrapper = shallow(<Panel {...props} />);
      expect(milstdstrMock.parse).toHaveBeenCalledTimes(1);
      expect(wrapper.state('affiliation')).toEqual('S');
      expect(wrapper.state('dimension')).toEqual('M');
      expect(wrapper.state('status')).toEqual('F');
      expect(wrapper.state('symbolId')).toEqual('DE');
      expect(wrapper.state('scheme')).toEqual('M');
    });

    it('should not try to parse milstd string when it was not passed', () => {
      const props = {};

      const wrapper = shallow(<Panel {...props} />);
      expect(milstdstrMock.parse).not.toHaveBeenCalled();
    });
  });

  describe('(symbol name)', () => {
    it('should left default empty name if it wasnt supplied via props', () => {
      const props = {};

      const wrapper = shallow(<Panel {...props} />);
      expect(wrapper.state('symbolName')).toEqual('');
    });

    it('should use supplied symbol name if supplied via props', () => {
      const props = {
        symbolName: 'Affiliation'
      };

      const wrapper = shallow(<Panel {...props} />);
      expect(wrapper.state('symbolName')).toEqual('Affiliation');
    });
  });

  describe('(defence object)', () => {
    it('should set the defence object priority if supplied', () => {
      const props = {
        priority: 5
      };
      
      const wrapper = shallow(<Panel {...props} />);
      const dobject = wrapper.find(DefenceObject);
      
      expect(wrapper.state('defence')).toEqual(true);
      expect(wrapper.state('defencePriority')).toEqual(5);
      expect(dobject.prop('checked')).toEqual(true);
      expect(dobject.prop('priority')).toEqual(5);
    });
  
    it('should set object not defended in default', () => {
      const wrapper = shallow(<Panel />)
      const dobject = wrapper.find(DefenceObject);

      expect(wrapper.state('defence')).toEqual(false);
      expect(dobject.prop('checked')).toEqual(false);
    });
  });

  describe('(actual levels)', () => {
    beforeEach(() => {
      treeUtilsMock.getPathToLevelByName.mockReset();
      treeUtilsMock.getPathToLevelBySymbolIdAndName.mockReset();
    });
   
    it('should set actual levels immedietlly if treeData supplied via props', () => {
      const props = {
        treeData: {
          'faked': 'tree-data'
        }
      };

      const wrapper = shallow(<Panel {...props} />);

      expect(requestMock.getTreeData).not.toHaveBeenCalled();
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
   
    it('should try to find actual levels by symbol id of passed mistd string', () => {
      const data = {
        'faked': 'tree-data1'
      };
      const levels = ['lvl', 'lvll', 'lvlll'];
      const props = {
        milstdString: 'EP---FPG',
        category: 'War',
        treeData: data,
        symbolName: 'RBS'
      };

      milstdstrMock.parse.mockImplementation((str) => {
        if(str === 'EP---FPG') {
         return {symbolId: 'FPG'};
        }
      });
      treeUtilsMock.getPathToLevelBySymbolIdAndName.mockImplementation((id, name, dt) => {
        if(id === 'FPG' && name === 'RBS' && dt === data) {
          return levels;
        }
      });
      previewUtilsMock.isSymbolIdEmpty.mockImplementation((data) => {
        if(data === 'FPG') {
          return false;
        }
      });
      
      const wrapper = shallow(<Panel {...props} />);

      expect(treeUtilsMock.getPathToLevelByName).not.toHaveBeenCalled();
      expect(treeUtilsMock.getPathToLevelBySymbolIdAndName).toHaveBeenCalledTimes(1);
      expect(wrapper.state('actualLevels')).toEqual(levels);
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
    it('should been displayed in default', () => {
      const wrapper = shallow(<Panel />);

      expect(wrapper.find('.def-note').length).toEqual(1);
    });

    it('should not been displayed when prop `note` is false', () => {
      const props = {
        note: false
      };
      const wrapper = shallow(<Panel {...props} />);

      expect(wrapper.find('.def-note').length).toEqual(0);
    });

    it('should been displayed when prop `note` is true', () => {
      const props = {
        note: true
      };
      const wrapper = shallow(<Panel {...props} />);

      expect(wrapper.find('.def-note').length).toEqual(1);
    });
  });

  describe('Controls', () => {
    it('should display Update button if objectId and onUpdate prop is defined', () => {
      const props = {
        objectId: 0,
        onUpdate: jest.fn()
      };
      const wrapper = shallow(<Panel {...props} />);

      const updateBtn = wrapper.find('.btn');
      expect(updateBtn.props()).toHaveProperty('onClick');
    });

    it('should not display Update button if objectId or onUpdate isnt defined', () => {
      const props = {
        objectId: null
      };
      const wrapper = shallow(<Panel {...props} />);

      let updateBtn = wrapper.find('.btn');
      
      expect(updateBtn.length).toEqual(0);
      
      wrapper.setProps({
        objectId: 3,
        onUpdate: null
      });
      updateBtn = wrapper.find('.btn');
      
      expect(updateBtn.length).toEqual(0);
    });

    it('shoul call onUpdate callback when clicked update button', () => {
      const spy = jest.fn();
      const props = {
        objectId: 13,
        onUpdate: spy
      };

      const wrapper = shallow(<Panel {...props} />);
      const updateBtn = wrapper.find('.btn');
      updateBtn.simulate('click');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(13, expect.any(Object));
    });
  });

  describe('Levels navigation', () => {
    it('should been displayed when there are more than one level in data', () => {
      const props = {
        treeData: {
          0: ['faked-first-level'],
          1: ['faked-second-level']
        }
      };

      const wrapper = shallow(<Panel {...props} />);

      expect(wrapper.find(Levels).length).toEqual(1);
    });

    it('should not been displayed when tree data are not available', () => {
      const props = {};

      const wrapper = shallow(<Panel {...props} />);

      expect(wrapper.find(Levels).length).toEqual(0);
    });

    it('should not been displayed when there is only one level', () => {
      const props = {
        treeData: {
          0: ['faked-level-data']
        }
      };

      const wrapper = shallow(<Panel {...props} />);

      expect(wrapper.find(Levels).length).toEqual(0);
    });
  });

  describe('Selectors', () => {
    it('should been displayed when selectOnly not defined', () => {
      const props = {
        selectOnly: null,
      };
      const wrapper = shallow(<Panel {...props} />);

      expect(wrapper.find(ValuSelector).length).toEqual(2);
      expect(wrapper.find(DefenceObject).length).toEqual(1);
    });

    it('should been displayed when selectOnly is false', () => {
      const props = {
        selectOnly: false
      };
      const wrapper = shallow(<Panel {...props} />);

      expect(wrapper.find(ValuSelector).length).toEqual(2);
      expect(wrapper.find(DefenceObject).length).toEqual(1);
    });

    it('should not been displayed when selectOnly is true', () => {
      const props = {
        selectOnly: true
      };
      const wrapper = shallow(<Panel {...props} />);

      expect(wrapper.find(ValuSelector).length).toEqual(0);
      expect(wrapper.find(DefenceObject).length).toEqual(0);
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
