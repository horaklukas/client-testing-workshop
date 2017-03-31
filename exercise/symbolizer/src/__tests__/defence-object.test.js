xdescribe('Defence component', () => {
  beforeAll(() => {
    var Defence;
    Defence = require('../../src/js/defence-object');
    this.props = {
      priority: null,
      priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      checked: false,
      onToggleDefence: sinon.spy(),
      onChangePriority: sinon.spy()
    };
    this.def = TestUtils.renderIntoDocument(React.createElement(Defence, this.props));
    this.root = TestUtils.findRenderedDOMComponentWithClass(this.def, 'row');
  });
  it('should add class checked to checkbox if depend on prop checked', () => {
    var checkbox;
    checkbox = TestUtils.findRenderedDOMComponentWithClass(this.def, 'checkbox');
    this.def.setProps({
      checked: true
    });
    expect(checkbox.props.className).to.equal('checkbox checked');
    this.def.setProps({
      checked: false
    });
    expect(checkbox.props.className).to.equal('checkbox');
  });
  it('should not show priority selector when not checked', () => {
    var selector;
    this.def.setProps({
      checked: false
    });
    selector = TestUtils.scryRenderedDOMComponentsWithClass(this.def, 'priority');
    expect(selector).to.have.length(0);
  });
  it('should show priority selector when checked', () => {
    this.def.setProps({
      checked: true
    });
    TestUtils.findRenderedDOMComponentWithClass(this.def, 'priority');
  });
  it('should call toggleDefence callback when checkbox clicked', () => {
    var checkbox;
    checkbox = TestUtils.findRenderedDOMComponentWithClass(this.def, 'checkbox');
    TestUtils.Simulate.click(checkbox);
    this.props.onToggleDefence.should.been.calledOnce;
    TestUtils.Simulate.click(checkbox);
    this.props.onToggleDefence.should.been.calledTwice;
  });
  describe('PrioritySelector', () => {
    beforeAll(() => {
      this.priorComp = TestUtils.findRenderedDOMComponentWithClass(this.def, 'priority');
      this.priorSelector = TestUtils.findRenderedDOMComponentWithTag(this.priorComp, 'select');
    });
    beforeEach(() => {
      this.props.onChangePriority.reset();
    });
    it('should render 9 priority levels', () => {
      var opts;
      opts = TestUtils.scryRenderedDOMComponentsWithTag(this.priorSelector, 'option');
      expect(opts).to.have.length(9);
      expect(opts[0].props).to.have.property('value', 1);
      expect(opts[1].props).to.have.property('value', 2);
      expect(opts[4].props).to.have.property('value', 5);
      expect(opts[8].props).to.have.property('value', 9);
    });
    it('should call onChangePriority callback when priority change', () => {
      var opts;
      opts = TestUtils.scryRenderedDOMComponentsWithTag(this.priorSelector, 'option');
      TestUtils.Simulate.change(opts[2]);
      this.props.onChangePriority.lastCall.args[0].should.equal(3);
      TestUtils.Simulate.change(opts[4]);
      this.props.onChangePriority.lastCall.args[0].should.equal(5);
    });
  });
});
