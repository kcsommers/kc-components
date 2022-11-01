import React, { PropsWithChildren } from 'react';
import { Navbar, NavbarProps } from '../Navbar';

export type LayoutProps = PropsWithChildren<{
  navbar: NavbarProps;
}>;

export const Layout = ({ children, navbar }: LayoutProps) => {
  return (
    <div className='flex-column' style={{ minHeight: '100vh' }}>
      <Navbar {...navbar} />
      <div className='flex-1'>{children}</div>
    </div>
  );
};
