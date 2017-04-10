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

  xit('should add class checked to checkbox if depend on prop checked', () => {
    // TO TEST
  });

  it('should not show priority selector when not checked', () => {
    const wrapper = shallow(<Defence {...props} checked={false} />);

    const selector = wrapper.find(PrioritySelector);
    expect(selector).toHaveLength(0);
  });

  xit('should show priority selector when checked', () => {
    // TO TEST
  });

  xit('should call toggleDefence callback when checkbox clicked', () => {
    // TO TEST
  });
});
