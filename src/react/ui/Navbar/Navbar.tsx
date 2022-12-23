import React from 'react';

export type NavbarProps = {
  childrenLeft?: JSX.Element;
  childrenRight?: JSX.Element;
};

export const Navbar = ({ childrenLeft, childrenRight }: NavbarProps) => {
  return (
    <nav className='border-bottom'>
      <div className='d-flex flex-space-between p-2'>
        <div>{childrenLeft}</div>
        <div>{childrenRight}</div>
      </div>
    </nav>
  );
};
