import React from 'react';
import _ from './utils/text-translate';

export default ({checked, onToggleDefence}) => {
  let Priority,
    checkboxClasses;

  if(checked) {
    Priority = <PrioritySelector priority={this.props.priority}
      priorities={this.props.priorities}
      onChange={this.props.onChangePriority} />
  }

  checkboxClasses = 'checkbox';
  checkboxClasses += checked ? ' checked' : '';

  <div className="defence-object">
    <div className="row">
      <div><strong>{_('Defence object')}</strong></div>
      <div>
        <span className={checkboxClasses} onClick={() => onToggleDefence()}>
          ✓
        </span>
      </div>
    </div>
    {Priority}
  </div>
}

const PrioritySelector = ({priorities, priority, onChange}) => (
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

module.exports = DefenceObject