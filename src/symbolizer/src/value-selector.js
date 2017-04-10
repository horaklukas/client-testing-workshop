import React from 'react';
import _ from './utils/text-translate';

export default ({label, value, options, onChange}) => (
  <div className="row">
    <div className="label">
      <strong>{_(label)}</strong>
    </div>
    <div>
      <select className="selector" value={value} onChange={(ev) => onChange && onChange(ev.target.value)}>
        {
          options.map(({value, title}) => (
            <option value={value} key={value} >{value} - {_(title)}</option>
          ))
        }
      </select>
    </div>
  </div>
)