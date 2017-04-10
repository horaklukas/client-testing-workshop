import React from 'react';
import ReactDOM from 'react-dom';
import PrioritySelector from '../priority-selector';
import {shallow} from 'enzyme';

describe('PrioritySelector', () => {
  const props = {
    priority: null,
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    onChange: jest.fn()
  };

  beforeEach(() => {
    props.onChange.mockReset();
  });

  xit('should render 9 priority levels', () => {
    // TO TEST
  });

  xit('should call onChangePriority callback when priority change', () => {
    const wrapper = shallow(<PrioritySelector {...props} />);
    const opts = wrapper.find('option');

    opts.at(2).simulate('change', {target: ReactDOM.findDOMNode(opts.get(2))});
    expect(props.onChange).toHaveBeenLastCalledWith(3);

    opts.at(4).simulate('change', {target: ReactDOM.findDOMNode(opts.get(4))});
    expect(props.onChange).toHaveBeenLastCalledWith(5);
  });
});
