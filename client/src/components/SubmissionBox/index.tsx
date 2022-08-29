import React, { useState } from 'react';
import styles from './index.module.css';
import { postUrl } from '../../requests/urls';
import { AxiosResponse } from 'axios';
import { IPostResponseBody } from '../../types';

interface Props {
	onSubmitSuccess: () => void;
}

const SubmissionBox = ({ onSubmitSuccess }: Props) => {
	const [url, setUrl] = useState<string>('');
	const [didSubmit, setDidSubmit] = useState<boolean>(false);
	const [shortUrl, setShortUrl] = useState<string>('');
	const [didCopy, setDidCopy] = useState<boolean>(false);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

	const handleSubmit = () => {
		setDidSubmit(true);

		postUrl(url)
			.then((res: AxiosResponse<IPostResponseBody>) => {
				setShortUrl(res.data.shortUrl);
				onSubmitSuccess();
			})
			.catch((err) => {
				// TODO: display err
			})
			.finally(() => {
				setDidSubmit(false);
			});
	};

	const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value);
	};

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(shortUrl);
		setDidCopy(true);
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		const id = setTimeout(() => {
			setDidCopy(false);
			setTimeoutId(undefined);
		}, 4000);
		setTimeoutId(id);
	};

	const handleReset = () => {
		setUrl('');
		setShortUrl('');
	};

	return (
		<div className={styles.root}>
			<div>
				<h2>Enter long URL</h2>
				<input
					type="text"
					value={url}
					onChange={handleChangeText}
					readOnly={!!shortUrl}
				/>
				<button
					disabled={!url || didSubmit || !!shortUrl}
					onClick={handleSubmit}
				>
					Submit
				</button>

				{shortUrl && (
					<div>
						<h2>Short URL</h2>
						<input type="text" value={shortUrl} readOnly={true} />
						<button onClick={handleCopyToClipboard}>Copy</button>
						<button onClick={handleReset}>Shorten Another</button>
					</div>
				)}

				{didCopy && <div>Copied to clipboard</div>}
			</div>
		</div>
	);
};

export default SubmissionBox;
