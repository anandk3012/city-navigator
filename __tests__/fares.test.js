// __tests__/fares.test.js
import { render, screen } from '@testing-library/react';
import Fares from '../pages/fares';

describe('Fares Page', () => {
  it('renders Fares heading', () => {
    render(<Fares />);
    const heading = screen.getByText(/Local Transportation Fares/i);
    expect(heading).toBeInTheDocument();
  });
});
