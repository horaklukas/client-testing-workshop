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

  xit('should load preview after component create', () => {
    // TO TEST
  });

  xit('should reload preview when props change', () => {
    // TO TEST
  });

  xit('should set loading bar until preview is loaded', () => {
    // TO TEST
  });

  xit('should replace loading bar with preview when preview loaded', () => {
    // TO TEST
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

  xit('should create tooltip with name and milstd string for each selector', () => {
    // TO TEST
  });

  xit('should add class active when selector is active', () => {
    // TO TEST
  });

  xit('should call onSelect callback with value and title when selector clicked', () => {
    const wrapper = shallow(<Selector {...props} /> )

    wrapper.simulate('click');
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.loadPreview).toHaveBeenCalledWith(props.value, props.title, undefined, expect.anything());
  });
});