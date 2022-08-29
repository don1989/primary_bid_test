import { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from './requests/urls';
import { AxiosResponse } from 'axios';
import { IGetResponseBody, IUrlPair } from './types';
import ListItem from './components/ListItem';
import SubmissionBox from './components/SubmissionBox';

function App() {
	const [urlList, setUrlList] = useState<IUrlPair[]>([]);

	const refreshList = () => {
		getUrls()
			.then((res: AxiosResponse<IGetResponseBody>) => {
				setUrlList(res.data.urls);
			})
			.catch((err) => {
				console.error(err);
				// TODO: display, an unexpected error occurred
			});
	};

	useEffect(() => {
		refreshList();
	}, []);

	const renderUrlList = () => {
		return (
			<div>
				{urlList.map((urlItem) => (
					<ListItem key={urlItem.longUrl} urlPair={urlItem} />
				))}
			</div>
		);
	};

	return (
		<div className="App">
			<SubmissionBox onSubmitSuccess={refreshList} />
			{renderUrlList()}
		</div>
	);
}

export default App;
