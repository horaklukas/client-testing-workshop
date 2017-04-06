import React from 'react';
import {shallow} from 'enzyme';
import Tree from '../depth-tree';

jest.mock('../../utils/symbol-preview-utils');
jest.mock('../../utils/milstd-string');

import LevelSelector from '../level-selector';
import SymbolSelector from '../symbol-selector';
import utilsMock from '../../utils/symbol-preview-utils';
import milstdUtilsMock from '../../utils/milstd-string';


describe('Depth Tree component', () => {
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
    utilsMock.isSymbolIdEmpty.mockImplementation((id) => {
      switch(id) {
        case '200':
        case '110':
        case '121':
        case '122':
          return false;
        case '  ':
          return true;
        default:
          return undefined;
      }
    });
 
    /*milstdUtilsMock.getDimensionCharByDimension.mockImplementation((arg) => {
        switch(arg) {
          case null:
          case 'A':
          case 'B':
          case 'C':
          case 'D':
            return arg;
          default:
            return undefined;
        }
    });*/
  });

  it('should render nothing when no tree data provided', () => {
    const wrapper = shallow(<Tree {...props} data={{}} />);

    let levels = wrapper.find(LevelSelector);
    expect(levels).toHaveLength(0);

    let symbols = wrapper.find(SymbolSelector);
    expect(symbols).toHaveLength(0);

    wrapper.setProps({
      data: null
    });

    levels = wrapper.find(LevelSelector);
    expect(levels).toHaveLength(0);

    symbols = wrapper.find(SymbolSelector);
    expect(symbols).toHaveLength(0);
  });

  it('should create level selector for each node with children', () => {
    const wrapper = shallow(<Tree {...props} data={data} level={1} />);
    const levels = wrapper.find(LevelSelector);

    expect(levels).toHaveLength(2);
    expect(levels.get(0).props).toHaveProperty('title', '120');
    expect(levels.get(0).props).toHaveProperty('id', 4);
    expect(levels.get(1).props).toHaveProperty('title', '130');
    expect(levels.get(1).props).toHaveProperty('id', 6);
  });

  it('should create symbol selector for each node with symbolId', () => {
    const wrapper = shallow(<Tree {...props} data={data} level={1} />);
    const symbols = wrapper.find(SymbolSelector);
    
    expect(symbols).toHaveLength(1);
    expect(symbols.get(0).props).toHaveProperty('title', '110');
    expect(symbols.get(0).props).toHaveProperty('value', {
      symbolId: '110',
      dimension: 'B'
    });
  });

  it('should not mark symbol selector as active if milstd equals to selected but name not', () => {
    const level = 6;
    const selected = data[level][0].value;
    selected.name = '123';
    
    const wrapper = shallow(<Tree {...props} level={level} selected={selected} />);
    
    const symbols = wrapper.find(SymbolSelector);
    expect(symbols.get(0).props).toHaveProperty('active', false);
  });

  it('should mark symbol selector as active if milstd and name equals to selected', () => {
    const level = 6;
    const selected = data[level][0].value;
    selected.name = data[level][0].title;
    
    const wrapper = shallow(<Tree {...props} level={level} selected={selected} />);
    
    const symbols = wrapper.find(SymbolSelector);
    expect(symbols.get(0).props).toHaveProperty('active', true);
  });

  it('should mark symbol selector as active if milstd not equals to selected', () => {
    const selected = data[6][0].value;

    const wrapper = shallow(<Tree {...props} level={4} selected={selected} />);
    
    const symbols = wrapper.find(SymbolSelector);
    expect(symbols.get(0).props).toHaveProperty('active', false);
  });

  it('should display first level when no level active', () => {
    const wrapper = shallow(<Tree {...props} />);
    
    const levels = wrapper.find(LevelSelector);
    const symbols = wrapper.find(SymbolSelector);
    
    expect(levels).toHaveLength(1);
    expect(symbols).toHaveLength(1);
    expect(levels.get(0).props).toHaveProperty('title', '100');
    expect(levels.get(0).props).toHaveProperty('id', 1);
    expect(symbols.get(0).props).toHaveProperty('title', '200');
    expect(symbols.get(0).props).toHaveProperty('value', {
      symbolId: '200',
      dimension: 'A'
    });
  });
});
