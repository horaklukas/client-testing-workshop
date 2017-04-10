import React from 'react';
import Selector from '../symbol-selector';
import {shallow, mount} from 'enzyme';

describe('SymbolSelector component', () => {
  const props = {
    loadPreview: jest.fn(),
    value: {
      symbolId: 'D-A',
      dimension: 'A'
    },
    title: 'Faked',
    onSelect: jest.fn()
  }

  afterEach(() => {
    props.loadPreview.mockReset();
    props.onSelect.mockReset();
  });

  it('should load preview after component create', () => {
    const wrapper = mount(<Selector {...props} /> )

    expect(props.loadPreview).toHaveBeenCalledTimes(1);
    expect(props.loadPreview).toHaveBeenCalledWith('D-A', 'A', undefined, expect.anything());
  });

  it('should reload preview when props change', () => {
    const wrapper = mount(<Selector {...props} /> )
    wrapper.setProps({
      value: { symbolId: 'B-C', dimension: 'D' }
    });

    expect(props.loadPreview).toHaveBeenCalledTimes(2);
    expect(props.loadPreview).toHaveBeenLastCalledWith('B-C', 'D', undefined, expect.anything());
  });

  it('should set loading bar until preview is loaded', () => {
    const wrapper = shallow(<Selector {...props} /> )

    const preview = wrapper.find('.preview');
    const loader = wrapper.find('.loader');

    expect(preview).toHaveLength(0);
    expect(loader).toHaveLength(1);
  });

  it('should replace loading bar with preview when preview loaded', () => {
    props.loadPreview.mockImplementation((_0, _1, _2, cb) => cb({font: 'Arial', color: '000000'}) )
    const wrapper = shallow(<Selector {...props} /> )

    const preview = wrapper.find('.preview');
    const loader = wrapper.find('.loader');

    expect(loader).toHaveLength(0);
  });

  xit('should create preview from loaded preview data', () => {
    props.loadPreview.mockImplementation((_0, _1, _2, cb) => cb({font: 'Tahoma', color: '000000', 'chars': 'Bc'}) )
    const wrapper = shallow(<Selector {...props} /> )
    wrapper.setProps({
      value: props.value
    });

    const preview = wrapper.find('.preview');

    expect(preview.prop('style')).toHaveProperty('fontFamily', 'Tahoma');
    //expect(preview.getDOMNode()).toHaveProperty('textContent').that.contain('Bc');
  });

  it('should create tooltip with name and milstd string for each selector', () => {
    const wrapper = shallow(<Selector {...props} /> )

    expect(wrapper.prop('title')).toEqual('Name: Faked\nMILSTD: D-A');
  });

  it('should add class active when selector is active', () => {
    const wrapper = shallow(<Selector {...props} /> )

    wrapper.setProps({
      active: true
    });
    expect(wrapper.prop('className')).toEqual('symbol-selector active');

    wrapper.setProps({
      active: false
    });
    expect(wrapper.prop('className')).toEqual('symbol-selector');
  });

  xit('should call onSelect callback with value and title when selector clicked', () => {
    const wrapper = shallow(<Selector {...props} /> )

    wrapper.simulate('click');
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.loadPreview).toHaveBeenCalledWith(props.value, props.title, undefined, expect.anything());
  });
});