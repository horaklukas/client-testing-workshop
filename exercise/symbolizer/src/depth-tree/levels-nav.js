import React from 'react';

export default ({levels}) => {
  levels = [
    {
      title: 'Root',
      id: null
    }
  ].concat(levels);

  return (
    <div className="levels-nav">
    {
      levels.map(({level, idx, onChangeLevel}) => (
        <LevelsNavLink id={idx} key={idx} title={level.title} onSelect={onChangeLevel} />
      ))
    }
    </div>
  );
};

const LevelsNavLink = ({id, title, onSelect}) => (
  <span onClick={() => onSelect(id)}>{title}</span>
);

