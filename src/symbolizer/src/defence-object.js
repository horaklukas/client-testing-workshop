import React from 'react';
import _ from './utils/text-translate';
import PrioritySelector from './priority-selector';

export default (props) => {
  let Priority,
    checkboxClasses;

  if(props.checked) {
    Priority = <PrioritySelector priority={props.priority}
      priorities={props.priorities}
      onChange={props.onChangePriority} />
  }

  checkboxClasses = 'checkbox';
  checkboxClasses += props.checked ? ' checked' : '';

  return (
    <div className="defence-object">
      <div className="row">
        <div><strong>{_('Defence object')}</strong></div>
        <div>
          <span className={checkboxClasses} onClick={() => props.onToggleDefence()}>
            ✓
          </span>
        </div>
      </div>
      {Priority}
    </div>
  );
}
