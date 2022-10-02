import React from 'react';
import { Navbar } from '../Navbar';
import styles from './Layout.module.scss';

export const Layout = ({ children }) => {
  return (
    <div className='flex-column' style={{ minHeight: '100vh' }}>
      <Navbar
        childrenLeft={<div>Logo Here</div>}
        childrenRight={
          <div>
            <>
              <a className={styles.nav_item} href='/login'>
                Log In
              </a>
              <a className={styles.nav_item} href='/register'>
                Register
              </a>
            </>
          </div>
        }
      />
      <div className='flex-1'>{children}</div>
    </div>
  );
};
