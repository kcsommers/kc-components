import React, { PropsWithChildren } from 'react';
import { Navbar, NavbarProps } from '../Navbar';

export type LayoutProps = PropsWithChildren<{
  navbarProps: NavbarProps;
}>;

export const Layout = ({ children, navbarProps }: LayoutProps) => {
  return (
    <div className='d-flex-column' style={{ minHeight: '100vh' }}>
      {navbarProps && <Navbar {...navbarProps} />}
      <div className='flex-1'>{children}</div>
    </div>
  );
};
