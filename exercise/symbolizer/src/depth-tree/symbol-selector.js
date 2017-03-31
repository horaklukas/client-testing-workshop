import React, {Component} from 'react';
import _ from '../utils/text-translate';

export default class SymbolSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: null
    };
  }

  handleClick() {
    this.props.onSelect && this.props.onSelect(this.props.value, this.props.title);
  }

  componentWillMount() {
    const {symbolId, dimension, scheme} = this.props.value;
    this.props.loadPreview(symbolId, dimension, scheme, (s) => this.setSymbolPreview(s) );
  }

  componentWillReceiveProps({value}) {
    // we have to load preview every time component receive props because there
    // can be change in affiliation or status value which is not propageted to
    // to SymbolSelector and then preview data (@state.symbol) will be different.
    if (value != null) {
      const {symbolId, dimension, scheme} = value;
      this.props.loadPreview(symbolId, dimension, scheme, (s) => this.setSymbolPreview(s) );
    }
  }

  setSymbolPreview(symbol) {
    // check http://jaketrent.com/post/set-state-in-callbacks-in-react/ paragraph
    // with title "React Components setState" to ge know why there is neccessary
    // to check if component is mounted and set state then only
    //if (this.isMounted()) {
      this.setState({symbol: symbol});
    //}
  }

  shouldComponentUpdate(nextProps, nextState) {
    const oldSymbol = this.state.symbol || {};
    const newSymbol = nextState.symbol || {};

    return !(
      newSymbol.font === oldSymbol.font &&
      newSymbol.color === oldSymbol.color &&
      newSymbol.chars === oldSymbol.chars &&
      this.props.active === nextProps.active &&
      this.props.title === nextProps.title &&
      this.isValueSame(this.props.value, nextProps.value)
    );
  }

  isValueSame(oldValue = {}, newValue = {}) {
    return (
      newValue.scheme === oldValue.scheme &&
      newValue.dimension === oldValue.dimension &&
      newValue.symbolId === oldValue.symbolId
    );
  }


  render() {
    let classes,
      Content;
    const {symbol} = this.state;
    const {title, value, active} = this.props;

    classes = 'symbol-selector'
    classes += active ? ' active' : '';


    if (symbol) {
      Content = <SymbolPreview font={symbol.font} color={symbol.color} chars={symbol.chars} />;
    } else{
      Content = <span className="loader" />;
    }

    const tooltip = `${_('Name')}: ${title}\nMILSTD: ${value && value.symbolId}`;

    return (
      <div className={classes} title={tooltip} onClick={() => this.handleClick()}>
        <div className="title">{this.props.title}</div>
        {Content}
      </div>
    );
  }
};

const SymbolPreview = ({font, color, chars}) => {
  var fontDefinition = {
    fontFamily: font,
    color: '#' + color
  };

  return (
    <div className="preview" style={fontDefinition}>
      {chars}&nbsp;
    </div>
  );
};