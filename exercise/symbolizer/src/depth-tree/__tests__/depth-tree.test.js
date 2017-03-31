import Tree from '../depth-tree';

xdescribe('Depth Tree component', () => {
  const data = {
    0: [
      {id: 1, title: '100', value: {symbolId: null, dimension: null}},
      {id: 2, title: '200', value: {symbolId: '200', dimension: 'A'}}
    ],
    1: [
      {id: 3, title: '110', value: {symbolId: '110', dimension: 'B'}},
      {id: 4, title: '120', value: {symbolId: null, dimension: null}},
      {id: 6, title: '130', value: {symbolId: '  ', dimension: null}}
    ],
    4: [{id: 5, title: '121', value: {symbolId: '121', dimension: 'C'}}],
    6: [{id: 7, title: '122', value: {symbolId: '122', dimension: 'D'}}]
  };
  const props = {
    data: data,
    level: null,
    selected: {}
  };

  beforeAll(() => {
    /*this.utilsMock = {
      isSymbolIdEmpty: sinon.stub()
    };*/
    this.utilsMock.isSymbolIdEmpty.withArgs('200').returns(false);
    this.utilsMock.isSymbolIdEmpty.withArgs('110').returns(false);
    this.utilsMock.isSymbolIdEmpty.withArgs('121').returns(false);
    this.utilsMock.isSymbolIdEmpty.withArgs('122').returns(false);
    this.utilsMock.isSymbolIdEmpty.withArgs('  ').returns(true);
    this.milstdUtilsMock = {
      getDimensionCharByDimension: sinon.stub()
    };
    this.milstdUtilsMock.getDimensionCharByDimension.withArgs(null).returns(null);
    this.milstdUtilsMock.getDimensionCharByDimension.withArgs('A').returns('A');
    this.milstdUtilsMock.getDimensionCharByDimension.withArgs('B').returns('B');
    this.milstdUtilsMock.getDimensionCharByDimension.withArgs('C').returns('C');
    this.milstdUtilsMock.getDimensionCharByDimension.withArgs('D').returns('D');
    //mockery.registerMock('./level-selector', mockComponent('levelMock'));
    //mockery.registerMock('./symbol-selector', mockComponent('symbolMock'));
    //mockery.registerMock('./symbol-selector', mockComponent('symbolMock'));
    //mockery.registerMock('../utils/symbol-preview-utils', this.utilsMock);
    //mockery.registerMock('../utils/milstd-string', this.milstdUtilsMock);
  });

  fit('should render nothing when no tree data provided', () => {
    const wrapper = shallow(<Tree {...props} />);
    wrapper.setProps({
      data: {}
    });

    let levels = wrapper.find('levelMock');
    expect(levels).toHaveLength(0);

    let symbols = wrapper.find('symbolMock');
    expect(symbols).toHaveLength(0);

    wrapper.setProps({
      data: null
    });

    levels = wrapper.find('levelMock');
    expect(levels).toHaveLength(0);

    symbols = wrapper.find('symbolMock');
    expect(symbols).toHaveLength(0);
  });
  it('should create level selector for each node with children', () => {
    var levels;
    this.tree.setProps({
      data: this.data,
      level: 1
    });
    levels = TestUtils.scryRenderedDOMComponentsWithClass(this.root, 'levelMock');
    expect(levels).toHaveLength(2);
    expect(levels[0].props).to.have.property('title', '120');
    expect(levels[0].props).to.have.property('id', 4);
    expect(levels[1].props).to.have.property('title', '130');
    expect(levels[1].props).to.have.property('id', 6);
  });
  it('should create symbol selector for each node with symbolId', () => {
    var symbols;
    this.tree.setProps({
      data: this.data,
      level: 1
    });
    symbols = TestUtils.scryRenderedDOMComponentsWithClass(this.root, 'symbolMock');
    expect(symbols).toHaveLength(1);
    expect(symbols[0].props).to.have.property('title', '110');
    expect(symbols[0].props).to.have.property('value').that.eql({
      symbolId: '110',
      dimension: 'B'
    });
  });
  it('should not mark symbol selector as active if milstd equals to selected but name not', () => {
    var level, selected, symbols;
    level = 6;
    selected = this.data[level][0].value;
    selected.name = '123';
    this.tree.setProps({
      level: level,
      selected: selected
    });
    symbols = TestUtils.scryRenderedDOMComponentsWithClass(this.root, 'symbolMock');
    expect(symbols[0].props).to.have.property('active', false);
  });
  it('should mark symbol selector as active if milstd and name equals to selected', () => {
    var level, selected, symbols;
    level = 6;
    selected = this.data[level][0].value;
    selected.name = this.data[level][0].title;
    this.tree.setProps({
      level: level,
      selected: selected
    });
    symbols = TestUtils.scryRenderedDOMComponentsWithClass(this.root, 'symbolMock');
    expect(symbols[0].props).to.have.property('active', true);
  });
  it('should mark symbol selector as active if milstd not equals to selected', () => {
    var symbols;
    this.tree.setProps({
      level: 4,
      selected: this.data[6][0].value
    });
    symbols = TestUtils.scryRenderedDOMComponentsWithClass(this.root, 'symbolMock');
    expect(symbols[0].props).to.have.property('active', false);
  });
  it('should display first level when no level active', () => {
    var levels, symbols;
    levels = TestUtils.scryRenderedDOMComponentsWithClass(this.root, 'levelMock');
    symbols = TestUtils.scryRenderedDOMComponentsWithClass(this.root, 'symbolMock');
    expect(levels).toHaveLength(1);
    expect(symbols).toHaveLength(1);
    expect(levels[0].props).to.have.property('title', '100');
    expect(levels[0].props).to.have.property('id', 1);
    expect(symbols[0].props).to.have.property('title', '200');
    expect(symbols[0].props).to.have.property('value').that.eql({
      symbolId: '200',
      dimension: 'A'
    });
  });
});