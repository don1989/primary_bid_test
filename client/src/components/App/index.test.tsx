import { render, screen } from '@testing-library/react';
import App from '.';

test('renders App', () => {
	const { asFragment } = render(<App />);
	expect(asFragment()).toMatchSnapshot();
});
