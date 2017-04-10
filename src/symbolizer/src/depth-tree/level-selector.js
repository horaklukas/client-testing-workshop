import React from 'react';

export default ({id, title, onSelect}) => (
  <div className="level-selector" onClick={() => onSelect && onSelect(id, title)} >
    {title}
  </div>
);
