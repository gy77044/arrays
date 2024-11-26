
import React from 'react';

interface ComingSoonProps {
  message?: string;
  date?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ message = "Coming Soon!", date }) => {
  return (
    <div className="coming-soon">
      <h1>{message}</h1>
      {date && <p>Expected release date: {date}</p>}
    </div>
  );
};

export default ComingSoon;
