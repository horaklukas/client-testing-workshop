import React, {Component} from 'react';
import ValueSelector from './value-selector';
import DefenceObject from './defence-object';
import DepthTree from './depth-tree/depth-tree';
import LevelsNav from './depth-tree/levels-nav';
import milstdString from './utils/milstd-string';
import previewUtils from './utils/symbol-preview-utils';
import treeUtils from './utils/tree-utils';
import Request from './utils/symbol-requests';
import constants from './utils/constants';
import _ from './utils/text-translate';

const consts = {
  AFFILIATIONS: constants.AFFILIATIONS,
  STATUSES: constants.STATUSES,
  PRIORITIES: constants.PRIORITIES
}

export {consts};

class Symbolizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: {
        font: previewUtils.getFontName(),
        fontAlias: '',
        color: '',
        chars: ''
      },
      symbolId: '',
      // we have to distinguish symbols also by name because for example category
      // Favorites may contain more symbols with same SIDC but different names
      // (eg. RBS1, RBS2)
      symbolName: '',
      dimension: constants.DEFAULT_DIMENSION,
      affiliation: constants.AFFILIATIONS[0].value,
      status: constants.STATUSES[0].value,
      scheme: constants.DEFAULT_SCHEME,
      defence: false,
      defencePriority: constants.PRIORITIES[0],
      actualLevels: [],
      treeData: null
    }
  }

  getMilstdString(symbolId, dimension, scheme) {
    symbolId = symbolId || this.state.symbolId;
    dimension = dimension || this.state.dimension;
    scheme = scheme || this.state.scheme;
    const {affiliation, status} = this.state;

    return milstdString.create(symbolId, dimension, affiliation, status, scheme);
  }

  getSelectedSymbol() {
    return {
      symbol: this.state.symbol,
      milstdString: this.getMilstdString(),
      name: this.state.symbolName,
      defenceObject: this.state.defence ? this.state.defencePriority : null
    };
  }

  handleUpdate() {
    this.props.onUpdate && this.props.onUpdate(this.props.objectId, this.getSelectedSymbol());
  }

  handleToggleDefence() {
    this.setState({defence: !this.state.defence});
  }

  addLevel(id, title) {
    const {actualLevels} = this.state;
    actualLevels.push({id: id, title: title});

    this.setState({actualLevels: actualLevels});
  }

  changeLevel(idx) {
    const actualLevels = idx === 0 ? [] : this.state.actualLevels.splice(0, idx);

    this.setState({actualLevels: actualLevels});
  }

  changeSymbol({symbolId, dimension, scheme}, name) {
    const symbolState = {
      symbolId: symbolId && symbolId.toString().trim() || '',
      dimension: dimension,
      scheme: scheme,
      symbolName: name
    };

    this.setSymbolState(symbolState, (isValidSymbol) => {
      if (isValidSymbol) {
        this.props.onSymbolSelect && this.props.onSymbolSelect(this.getSelectedSymbol());
      };
    });
  }

  changePriority(priority) {
    this.setState({defencePriority: priority});
  }

  changeStatus(status) {
    this.setSymbolState({status: status});
  }

  changeAffiliation(affiliation) {
    this.setSymbolState({affiliation: affiliation});
  }

 /**
  * Wrapper for setState of symbol data that also request update of symbol preview
  */
  setSymbolState(state, cb) {
    this.setState(state);

    if(previewUtils.isSymbolIdEmpty(this.state.symbolId)) {
      return cb && cb(false);
    }
    this.loadSymbolPreview(null, null, null, (symbol) => {
      this.setState({symbol: symbol});
      cb && cb(true)
    });
  }

  loadSymbolPreview(symbolId, dimension, scheme, cb) {
    const milstdStr = this.getMilstdString(symbolId, dimension, scheme);

    Request.getSymbolPreviewData(milstdStr).then((rawApp6Data) =>{
      const symbol = previewUtils.parseSymbolFromApp6Data(rawApp6Data);

      cb(symbol);
    });
  }

 /**
  * If symbol name is empty, maybe it wont be possible to find correct symbol
  *  (distinguish those with same SIDC) only by milstd string (SIDC).
  */
  getActualLevels(treeData, symbolId, symbolName = '') {
    if(treeData != null && symbolId != null && !previewUtils.isSymbolIdEmpty(symbolId)) {
      return treeUtils.getPathToLevelBySymbolIdAndName(symbolId, symbolName, treeData);
    } else if(treeData != null && this.props.category != null) {
      return treeUtils.getPathToLevelByName(this.props.category, treeData);
    } else{
      return []; // default levels list is empty
    }
  }

  clearSelectedSymbol(nextProps) {
    this.setState({
      scheme: constants.DEFAULT_SCHEME,
      dimension: constants.DEFAULT_DIMENSION,
      symbolId: '',
      symbolName: ''
    })
  }

  componentWillReceiveProps(nextProps) {
    const newState = this.createStateFromProps(nextProps);

    if(nextProps.milstdString != null || nextProps.symbolName != null) {
      newState.actualLevels = this.getActualLevels(
        this.state.treeData, newState.symbolId, newState.symbolName
      );
    }

    this.setSymbolState(newState);
  }

  componentWillMount() {
      const {treeData} = this.props;
      const newState = this.createStateFromProps(this.props);

      // use setSymbolState instead of setState for setting state and to load also
      // properties font, fontAlias, color and chars if any symbol selected
      if(treeData != null) {
        newState.treeData = treeData;
        newState.actualLevels = this.getActualLevels(
          treeData, newState.symbolId, newState.symbolName
        )
      } else {
        Request.getTreeData().then((data) => {
          this.setSymbolState({
            treeData: data,
            actualLevels: this.getActualLevels(data, this.state.symbolId, this.state.symbolName)
          });
        });
      }

      this.setSymbolState(newState);
  }

  createStateFromProps(props) {
      const newState = {};

      if(props.milstdString != null) {
        const parsed =  milstdString.parse(props.milstdString);

        newState.scheme = parsed.scheme;
        newState.affiliation = parsed.affiliation;
        newState.dimension = parsed.dimension;
        newState.status = parsed.status;
        newState.symbolId = parsed.symbolId;
      }

      if(props.symbolName != null) {
        newState.symbolName = props.symbolName;
      }

      if(props.priority != null) {
        newState.defence = true;
        newState.defencePriority = props.priority      ;
      }

      return newState;
  }

  render() {
    const isDefence = this.state.defence;
    const {symbolId, symbolName, dimension, actualLevels, treeData} = this.state;
    let level;
    let Navigation, Controls, Note, Selectors, DefenceObjectSelector;

    if (actualLevels && actualLevels.length) {
      // get actual level which is last in list of actual levels
      level =   actualLevels[actualLevels.length - 1].id
    }

    const selectedSymbol = {symbolId: symbolId, dimension: dimension, name: symbolName};

    if(treeData != null && Object.keys(treeData).length > 1) {
      Navigation = <LevelsNav levels={actualLevels} onChangeLevel={(id) => this.changeLevel(id)} />
    }

    if (this.props.objectId != null && this.props.onUpdate){
      Controls = (
        <button className="btn" onClick={() => this.handleUpdate()}>
          {_('Update symbol')}
        </button>
      );
    }

    if (!!this.props.note){
      Note = (
        <p className="def-note">
          {_('Based on the definition')} <strong>MILSTD2525B</strong>
        </p>
      );
    }

    if (this.props.selectOnly !== true){
      Selectors = (
        <div className="symbol-options">
          <ValueSelector label="Affiliation" options={constants.AFFILIATIONS}
            value={this.state.affiliation}
            onChange={status => this.changeAffiliation(status)} />
          <ValueSelector label="Status" options={constants.STATUSES}
            value={this.state.status}
            onChange={status => this.changeStatus(status)} />
        </div>
      );

      DefenceObjectSelector =(
        <DefenceObject checked={isDefence} priority={this.state.defencePriority}
          priorities={constants.PRIORITIES}
          onToggleDefence={() => this.handleToggleDefence()}
          onChangePriority={priority => this.changePriority(priority)} />
      );
    }

    return (
      <div className="symbol-panel">
        {Selectors}
        {DefenceObjectSelector}
        {Navigation}

        <div className="tree-placeholder">
          <DepthTree data={treeData} level={level} selected={selectedSymbol}
            onSymbolSelect={(obj, name) => this.changeSymbol(obj, name)}
            onLevelSelect={(id, title) => this.addLevel(id, title)}
            loadSymbolPreview={(...args) => this.loadSymbolPreview(...args)} />

          {Note}
          {Controls}
        </div>
      </div>
    )
  }
}

Symbolizer.defaultProps = {
  note: true
}

export default Symbolizer;
