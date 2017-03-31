xdescribe('Symbolizer component', () => {
  var Panel;
  Panel = null;
  beforeAll(() => {
    this.milstdstrMock = {
      create: sinon.stub(),
      parse: sinon.stub().returns({})
    };
    this.previewUtilsMock = {
      isSymbolIdEmpty: sinon.stub(),
      getFontName: sinon.stub(),
      parseSymbolFromApp6Data: sinon.stub(),
      getDefenceSymbolByPriority: sinon.stub()
    };
    this.treeUtilsMock = {
      getPathToLevelByName: sinon.stub(),
      getPathToLevelBySymbolIdAndName: sinon.stub()
    };
    this.gtdStub = sinon.stub();
    this.gspdThen = sinon.stub();
    this.requestMock = {
      getTreeData: sinon.stub().returns({
        then: this.gtdStub
      }),
      getSymbolPreviewData: sinon.stub().returns({
        then: this.gspdThen
      })
    };
    mockery.registerMock('./value-selector', mockComponent('vsMock'));
    mockery.registerMock('./defence-object', mockComponent('doMock'));
    mockery.registerMock('./depth-tree/depth-tree', mockComponent('treeMock'));
    mockery.registerMock('./depth-tree/levels-nav', mockComponent('levelsMock'));
    mockery.registerMock('./utils/milstd-string', this.milstdstrMock);
    mockery.registerMock('./utils/symbol-preview-utils', this.previewUtilsMock);
    mockery.registerMock('./utils/tree-utils', this.treeUtilsMock);
    mockery.registerMock('./utils/symbol-requests', this.requestMock);
    Panel = require('../../src/js/symbolizer-component');
    this.wdw = TestUtils.renderIntoDocument(React.createElement(Panel, {}));
    this.root = TestUtils.findRenderedDOMComponentWithClass(this.wdw, 'symbol-panel');
    this.previews = TestUtils.scryRenderedDOMComponentsWithClass(this.root, 'preview');
  });
  beforeEach(() => {
    this.milstdstrMock.create.reset();
    this.milstdstrMock.parse.reset();
    this.requestMock.getSymbolPreviewData.reset();
    this.requestMock.getTreeData.reset();
  });
  afterAll(() => {
    mockery.deregisterAll();
  });
  describe('(tree data)', () => {
    it('should load default tree data when it wasnt passed at props', () => {
      var wdw;
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, {}));
      this.requestMock.getTreeData.should.been.calledOnce;
    });
    it('should use supplied tree data if exists', () => {
      var data, wdw;
      data = {
        'faked': 'tree-data'
      };
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, {
        treeData: data
      }));
      this.requestMock.getTreeData.should.not.been.called;
      expect(wdw.state).to.have.property('treeData').that.eql(data);
    });
    it('should use load tree data if no data supplied', () => {
      var data, wdw;
      data = {
        'faked': 'tree-data'
      };
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, {}));
      this.requestMock.getTreeData.should.been.calledOnce;
      this.gtdStub["yield"](data);
      expect(wdw.state).to.have.property('treeData').that.eql(data);
    });
  });
  describe('(milstd string)', () => {
    it('should parse milstd string when passed and set appropriate values', () => {
      var props, wdw;
      props = {
        milstdString: 'MSMFDE'
      };
      this.milstdstrMock.parse.withArgs(props.milstdString).returns({
        scheme: 'M',
        affiliation: 'S',
        dimension: 'M',
        status: 'F',
        symbolId: 'DE'
      });
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      this.milstdstrMock.parse.should.been.calledOnce;
      expect(wdw.state).to.have.property('affiliation', 'S');
      expect(wdw.state).to.have.property('dimension', 'M');
      expect(wdw.state).to.have.property('status', 'F');
      expect(wdw.state).to.have.property('symbolId', 'DE');
      expect(wdw.state).to.have.property('scheme', 'M');
    });
    it('should not try to parse milstd string when it was not passed', () => {
      var props, wdw;
      props = {};
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      this.milstdstrMock.parse.should.not.been.called;
    });
  });
  describe('(symbol name)', () => {
    it('should left default empty name if it wasnt supplied via props', () => {
      var props, wdw;
      props = {};
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      expect(wdw.state).to.have.property('symbolName', '');
    });
    it('should use supplied symbol name if supplied via props', () => {
      var props, wdw;
      props = {
        symbolName: 'Affiliation'
      };
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      expect(wdw.state).to.have.property('symbolName', 'Affiliation');
    });
  });
  describe('(defence object)', () => {
    it('should set the defence object priority if supplied', () => {
      var dobject, props, wdw;
      props = {
        priority: 5
      };
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      dobject = TestUtils.findRenderedDOMComponentWithClass(wdw, 'doMock');
      expect(wdw.state).to.have.property('defence', true);
      expect(wdw.state).to.have.property('defencePriority', 5);
      expect(dobject.props).to.have.property('checked', true);
      expect(dobject.props).to.have.property('priority', 5);
    });
    it('should set object not defended in default', () => {
      var dobject, wdw;
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, {}));
      dobject = TestUtils.findRenderedDOMComponentWithClass(wdw, 'doMock');
      expect(wdw.state).to.have.property('defence', false);
      expect(dobject.props).to.have.property('checked', false);
    });
  });
  describe('(actual levels)', () => {
    beforeEach(() => {
      this.treeUtilsMock.getPathToLevelByName.reset();
      this.treeUtilsMock.getPathToLevelBySymbolIdAndName.reset();
    });
    it('should set actual levels immedietlly if treeData supplied via props', () => {
      var props, wdw;
      props = {
        treeData: {
          'faked': 'tree-data'
        }
      };
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      this.requestMock.getTreeData.should.not.been.called;
    });
    it('should set actual levels after treeData load if not supplied via props', () => {
      var data, wdw;
      data = {
        'faked': 'tree-data',
        'symbolName': 'BLA'
      };
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, {}));
      sinon.spy(wdw, 'getActualLevels');
      this.requestMock.getTreeData.should.been.calledOnce;
      wdw.getActualLevels.should.not.been.called;
      this.gtdStub["yield"](data);
      wdw.getActualLevels.should.been.calledOnce.and.calledWith(data);
    });
    it('should try to find actual levels by symbol id of passed mistd string', () => {
      var data, levels, props, wdw;
      data = {
        'faked': 'tree-data1'
      };
      levels = ['lvl', 'lvll', 'lvlll'];
      props = {
        milstdString: 'EP---FPG',
        category: 'War',
        treeData: data,
        symbolName: 'RBS'
      };
      this.milstdstrMock.parse.withArgs('EP---FPG').returns({
        symbolId: 'FPG'
      });
      this.treeUtilsMock.getPathToLevelBySymbolIdAndName.withArgs('FPG', 'RBS', data).returns(levels);
      this.previewUtilsMock.isSymbolIdEmpty.withArgs('FPG').returns(false);
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      this.treeUtilsMock.getPathToLevelByName.should.not.been.called;
      this.treeUtilsMock.getPathToLevelBySymbolIdAndName.should.been.calledOnce;
      expect(wdw.state.actualLevels).to.eql(levels);
    });
    it('should try to find actual levels by name if category supplied', () => {
      var data, levels, props, wdw;
      data = {
        'faked': 'tree-data2'
      };
      levels = ['lvl1', 'lvl2'];
      props = {
        category: 'War',
        treeData: data
      };
      this.treeUtilsMock.getPathToLevelByName.withArgs('War', data).returns(levels);
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      this.treeUtilsMock.getPathToLevelByName.should.been.calledOnce;
      expect(wdw.state.actualLevels).to.eql(levels);
    });
  });
  describe('Definition Note', () => {
    it('should been displayed in default', () => {
      var wdw;
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, {}));
      TestUtils.findRenderedDOMComponentWithClass(wdw, 'def-note');
    });
    it('should not been displayed when prop `note` is false', () => {
      var note;
      this.wdw.setProps({
        note: false
      });
      note = TestUtils.scryRenderedDOMComponentsWithClass(this.wdw, 'def-note');
      expect(note).to.have.length(0);
    });
    it('should been displayed when prop `note` is true', () => {
      this.wdw.setProps({
        note: true
      });
      TestUtils.findRenderedDOMComponentWithClass(this.wdw, 'def-note');
    });
  });
  describe('Controls', () => {
    it('should display Update button if objectId and onUpdate prop is defined', () => {
      var updateBtn;
      this.wdw.setProps({
        objectId: 0,
        onUpdate: sinon.spy()
      });
      updateBtn = TestUtils.findRenderedDOMComponentWithTag(this.wdw, 'button');
      expect(updateBtn.props).to.have.property('onClick');
    });
    it('should not display Update button if objectId or onUpdate isnt defined', () => {
      var updateBtn;
      this.wdw.setProps({
        objectId: null
      });
      updateBtn = TestUtils.scryRenderedDOMComponentsWithTag(this.wdw, 'button');
      expect(updateBtn, 'when objectId is null').to.have.length(0);
      this.wdw.setProps({
        objectId: 3,
        onUpdate: null
      });
      updateBtn = TestUtils.scryRenderedDOMComponentsWithTag(this.wdw, 'button');
      expect(updateBtn, 'when onUpdate is null').to.have.length(0);
    });
    it('shoul call onUpdate callback when clicked update button', () => {
      var spy, updateBtn;
      spy = sinon.spy();
      this.wdw.setProps({
        objectId: 13,
        onUpdate: spy
      });
      updateBtn = TestUtils.findRenderedDOMComponentWithTag(this.wdw, 'button');
      TestUtils.Simulate.click(updateBtn);
      expect(spy).to.been.calledOnce.and.calledWith(13);
      expect(spy.lastCall.args[1]).to.be.an('object');
    });
  });
  describe('Levels navigation', () => {
    it('should been displayed when there are more than one level in data', () => {
      var props, wdw;
      props = {
        treeData: {
          0: ['faked-first-level'],
          1: ['faked-second-level']
        }
      };
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      TestUtils.findRenderedDOMComponentWithClass(wdw, 'levelsMock');
    });
    it('should not been displayed when tree data are not available', () => {
      var levelsNav, props, wdw;
      props = {};
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      levelsNav = TestUtils.scryRenderedDOMComponentsWithClass(wdw, 'levelsMock');
      expect(levelsNav).to.have.length(0);
    });
    it('should not been displayed when there is only one level', () => {
      var levelsNav, props, wdw;
      props = {
        treeData: {
          0: ['faked-level-data']
        }
      };
      wdw = TestUtils.renderIntoDocument(React.createElement(Panel, props));
      levelsNav = TestUtils.scryRenderedDOMComponentsWithClass(wdw, 'levelsMock');
      expect(levelsNav).to.have.length(0);
    });
  });
  describe('Selectors', () => {
    it('should been displayed when selectOnly not defined', () => {
      var selectors;
      this.wdw.setProps({
        selectOnly: null
      });
      selectors = TestUtils.scryRenderedDOMComponentsWithClass(this.wdw, 'vsMock');
      expect(selectors).to.have.length(2);
      TestUtils.findRenderedDOMComponentWithClass(this.wdw, 'doMock');
    });
    it('should been displayed when selectOnly is false', () => {
      var selectors;
      this.wdw.setProps({
        selectOnly: false
      });
      selectors = TestUtils.scryRenderedDOMComponentsWithClass(this.wdw, 'vsMock');
      expect(selectors).to.have.length(2);
      TestUtils.findRenderedDOMComponentWithClass(this.wdw, 'doMock');
    });
    it('should not been displayed when selectOnly is true', () => {
      var defenceObj, selectors;
      this.wdw.setProps({
        selectOnly: true
      });
      selectors = TestUtils.scryRenderedDOMComponentsWithClass(this.wdw, 'vsMock');
      defenceObj = TestUtils.scryRenderedDOMComponentsWithClass(this.wdw, 'doMock');
      expect(selectors).to.have.length(0);
      expect(defenceObj).to.have.length(0);
    });
  });
  return describe('method changeSymbol', () => {
    beforeAll(() => {
      sinon.spy(this.wdw, 'setSymbolState');
    });
    beforeEach(() => {
      this.wdw.setSymbolState.reset();
      this.gspdThen.reset();
      this.previewUtilsMock.isSymbolIdEmpty.reset();
      this.previewUtilsMock.isSymbolIdEmpty.withArgs('').returns(true);
      this.previewUtilsMock.isSymbolIdEmpty.withArgs('------').returns(true);
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