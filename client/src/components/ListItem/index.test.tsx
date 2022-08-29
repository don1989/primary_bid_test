import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListItem from './';
import { IUrlPair } from '../../types';

describe('ListItem', () => {
	test('renders a list item', () => {
		const urlPair: IUrlPair = {
			longUrl:
				'https://testing-library.com/docs/react-testing-library/api/',
			shortUrl: 'https://pbid.io/hsda9d33',
		};

		const { asFragment, getByText } = render(
			<ListItem urlPair={urlPair} />
		);
		expect(getByText(urlPair.longUrl)).toBeInTheDocument();
		expect(getByText(urlPair.shortUrl)).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});

	test('returns null for invalid list item', () => {
		const urlPair: IUrlPair = {
			longUrl: '',
			shortUrl: 'https://pbid.io/hsda9d33',
		};

		const { asFragment } = render(<ListItem urlPair={urlPair} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
