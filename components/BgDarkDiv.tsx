import React from 'react';

type Props = {
    reuse?: string; // Make reuse optional if it's not always required
};

const BgDarkDiv: React.FC<Props> = ({ reuse = '' }) => {
  // Use default classes if reuse is empty
  const classNames = reuse ? reuse : 'bg-gray-500 text-green-500';

  return (
    <div className={classNames}>BgDarkDiv</div>
  );
}

export default BgDarkDiv;
