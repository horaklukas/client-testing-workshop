import React from 'react';
import Defence from '../defence-object';
import PrioritySelector from '../priority-selector';
import {shallow} from 'enzyme';

describe('Defence component', () => {
  const props = {
    priority: null,
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    checked: false,
    onToggleDefence: jest.fn(),
    onChangePriority: jest.fn()
  };

  it('should add class checked to checkbox if depend on prop checked', () => {
    const wrapper = shallow(<Defence {...props} />);
    let checkbox;

    wrapper.setProps({
      checked: true
    });
    checkbox = wrapper.find('.checkbox');
    expect(checkbox.prop('className')).toEqual('checkbox checked');

    wrapper.setProps({
      checked: false
    });
    checkbox = wrapper.find('.checkbox');
    expect(checkbox.prop('className')).toEqual('checkbox');
  });

  it('should not show priority selector when not checked', () => {
    const wrapper = shallow(<Defence {...props} checked={false} />);

    const selector = wrapper.find(PrioritySelector);
    expect(selector).toHaveLength(0);
  });

  it('should show priority selector when checked', () => {
    const wrapper = shallow(<Defence {...props} checked={true} />);

    const selector = wrapper.find(PrioritySelector);
    expect(selector).toHaveLength(1);
  });

  it('should call toggleDefence callback when checkbox clicked', () => {
    const wrapper = shallow(<Defence {...props} checked={true} />);
    const checkbox = wrapper.find('.checkbox');

    checkbox.simulate('click');
    expect(props.onToggleDefence).toHaveBeenCalledTimes(1);

    checkbox.simulate('click');
    expect(props.onToggleDefence).toHaveBeenCalledTimes(2);
  });
});
