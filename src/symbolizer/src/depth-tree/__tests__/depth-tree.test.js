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

  xit('should render nothing when no tree data provided', () => {
    // TO TEST
  });

  xit('should create level selector for each node with children', () => {
    // TO TEST
  });

  xit('should create symbol selector for each node with symbolId', () => {
    // TO TEST
  });

  xit('should not mark symbol selector as active if milstd equals to selected but name not', () => {
    // TO TEST
  });

  xit('should mark symbol selector as active if milstd and name equals to selected', () => {
    // TO TEST
  });

  xit('should mark symbol selector as active if milstd not equals to selected', () => {
    // TO TEST
  });

  xit('should display first level when no level active', () => {
    // TO TEST
  });
});
