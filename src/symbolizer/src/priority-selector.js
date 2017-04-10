import React from 'react';
import _ from './utils/text-translate';

export default ({priorities, priority, onChange}) => (
  <span className="row priority">
    <div><strong>{_('with priority')}:</strong></div>
    <div>
      <select value={priority} onChange={(ev) => handleChange(ev, onChange)}>
        {
          priorities.map((prio) => (
            <option value={prio} key={prio} onChange={(ev) => handleChange(ev, onChange)}>
              {prio}
            </option>
          ))
        }
      </select>
    </div>
  </span>
);

const handleChange = ({target}, onChange) => {
  onChange(Number(target.value));
}
