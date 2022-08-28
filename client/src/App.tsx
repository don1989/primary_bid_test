import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { postUrl, getUrls } from './requests/urls';
import { AxiosResponse } from 'axios';
import { UrlItem } from './types';

const mockUrls: UrlItem[] = [
	{
		longUrl: 'google.com/abcdasdlasda',
		shortUrl: 'ggl.com/abc',
	},
	{
		longUrl: 'pbid.com/12321323sadasd2',
		shortUrl: 'pbid.com/123',
	},
];

function App() {
	const [url, setUrl] = useState<string>('');
	const [urlList, setUrlList] = useState<UrlItem[]>([]);
	const [didSubmit, setDidSubmit] = useState<boolean>(false);

	const handleSubmit = () => {
		console.log('submit clicked');
		setDidSubmit(true);

		postUrl(url)
			.then((res) => {
				refreshList();
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

	const refreshList = () => {
		getUrls()
			.then((res: AxiosResponse<UrlItem[]>) => {
				setUrlList(res.data);
			})
			.catch((err) => {
				console.error(err);
				// TODO: display, an unexpected error occurred
			});
	};

	useEffect(() => {
		refreshList();
	}, []);

	const renderMocks = () => {
		return mockUrls.map((mock) => {
			return (
				<div key={mock.shortUrl}>
					<div>{mock.shortUrl}</div>
					<div>{mock.longUrl}</div>
				</div>
			);
		});
	};

	return (
		<div className="App">
			<h2>Enter long URL</h2>
			<div>
				<input type="text" value={url} onChange={handleChangeText} />
				<button disabled={!url || didSubmit} onClick={handleSubmit}>
					Submit
				</button>
			</div>
			<div className="grid-wrapper">
				<h4>Short URL</h4>
				<h4>Long URL</h4>
				{renderMocks()}
			</div>
		</div>
	);
}

export default App;
