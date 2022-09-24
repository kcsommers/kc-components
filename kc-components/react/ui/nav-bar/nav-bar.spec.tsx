import React from 'react';
import { render } from '@testing-library/react';
import { BasicNavBar } from './nav-bar.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicNavBar />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
