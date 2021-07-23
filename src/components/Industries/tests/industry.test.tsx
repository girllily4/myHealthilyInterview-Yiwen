import { render, screen } from '@testing-library/react';
import IndustryTable from '../IndustryTable';

test('renders Industry Table', () => {
  render(<IndustryTable />);

  const tableHeader1 = screen.getByText('SIC Code');
  expect(tableHeader1).toBeTruthy();

  const tableHeader2 = screen.getByText('Title');
  expect(tableHeader2).toBeTruthy();

  const tableConsole = screen.getByText('Table Console');
  expect(tableConsole).toBeTruthy();

  const cartHeader = screen.getByText('Cart');
  expect(cartHeader).toBeTruthy();
});
