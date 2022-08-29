import styles from './index.module.css';
import logo from '../../logo.svg';

import { IUrlPair } from '../../types';

interface Props {
	urlPair: IUrlPair;
}

const ListItem = ({ urlPair }: Props) => {
	return (
		<div className={styles.root}>
			<img className={styles.image} src={logo} alt="logo" />
			<div className={styles.item}>
				<div className={styles['short-url']}>
					<a
						href={urlPair.shortUrl}
						target="_blank"
					>{`${urlPair.shortUrl}`}</a>
				</div>
				<div className={styles['long-url']}>
					<a
						href={urlPair.longUrl}
						target="_blank"
					>{`${urlPair.longUrl}`}</a>
				</div>
			</div>
		</div>
	);
};

export default ListItem;
