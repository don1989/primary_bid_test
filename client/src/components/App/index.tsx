import { useState, useEffect } from 'react';
import styles from './index.module.css';
import { getUrls } from '../../requests/urls';
import { AxiosResponse } from 'axios';
import { IGetResponseBody, IUrlPair } from '../../types';
import ListItem from '../ListItem';
import SubmissionBox from '../SubmissionBox';

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
			<div className={styles.list}>
				{urlList.map((urlItem) => (
					<ListItem key={urlItem.longUrl} urlPair={urlItem} />
				))}
			</div>
		);
	};

	return (
		<div className={styles.app}>
			<SubmissionBox onSubmitSuccess={refreshList} />
			{renderUrlList()}
		</div>
	);
}

export default App;
