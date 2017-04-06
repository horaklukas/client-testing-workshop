import React, {Component} from 'react';
import LevelSelector from './level-selector';
import SymbolSelector from './symbol-selector';
import previewUtils from '../utils/symbol-preview-utils';
import milstdString from '../utils/milstd-string';

export default class DepthTree extends Component {
  createLevelSelector({id, title, value}) {
    return (
      <LevelSelector title={title} value={value} id={id} key={id}
        onSelect={this.props.onLevelSelect} />
    );
  }

  createSymbolSelector({title, value}) {
    const selected = this.props.selected || {};
    const isSymbolIdEqualToSelected = value.symbolId === selected.symbolId;
    const isDimensionEqualToSelected = value.dimension === selected.dimension;
    const isNameEqualToSelected = title === selected.name;

    const active = isSymbolIdEqualToSelected && isDimensionEqualToSelected &&
      isNameEqualToSelected;

    return (
      <SymbolSelector title={title} value={value} key={title} active={active}
        onSelect={this.props.onSymbolSelect}
        loadPreview={this.props.loadSymbolPreview} />
    );
  }

  createLevel(levelData) {
    var LevelSelectors = [],
      SymbolSelectors = [];

    for (let levelNode of levelData) {
      const {id, value} = levelNode;
      let nodeChildren = this.props.data[id];

      if (nodeChildren != null) {
        LevelSelectors.push(this.createLevelSelector(levelNode));
      }
      if (value && value.symbolId && !previewUtils.isSymbolIdEmpty(value.symbolId)) {
        SymbolSelectors.push(this.createSymbolSelector(levelNode));
      }
    }

    return (
      <div className="level">
        {LevelSelectors}
        {SymbolSelectors}
      </div>
    );
  }

  render() {
    const data = this.props.data;
    const level = this.props.level || 0;

    return (
      <div className="depth-tree">
         {data && data[0] && this.createLevel(data[level])}
      </div>
    )
  }
}
