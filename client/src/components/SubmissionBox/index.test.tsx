import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmissionBox from './';

describe('SubmissionBox', () => {
	test('renders a list item', () => {
		const onSubmitSuccess = jest.fn();
		const { asFragment, getByText } = render(
			<SubmissionBox onSubmitSuccess={onSubmitSuccess} />
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
