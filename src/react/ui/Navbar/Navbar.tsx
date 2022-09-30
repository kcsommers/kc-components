import React from 'react';

export type NavBarProps = {
  childrenLeft: JSX.Element;
  childrenRight: JSX.Element;
};

export const NavBar = ({ childrenLeft, childrenRight }: NavBarProps) => {
  return (
    <nav className='border-bottom'>
      <div className='flex flex-space-between p-2'>
        <div>{childrenLeft}</div>
        <div>{childrenRight}</div>
      </div>
    </nav>
  );
};
