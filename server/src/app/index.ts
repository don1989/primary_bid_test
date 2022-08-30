import { isValidHttpUrl, convertIdToShortUrl } from '../utils';
import repository from '../db';
import { IUrlPair } from 'types';

const getUrls = async (): Promise<IUrlPair[]> => {
    const urlPairs = await repository.getUrlPairs();
    return urlPairs;
};

const postUrl = async (longUrl: string): Promise<IUrlPair> => {
    if (!isValidHttpUrl(longUrl)) {
        throw `Invalid long url: ${longUrl}`;
    }

    let shortUrl: string = '';
    const existingPair = await repository.getUrlPair(longUrl);

    if (existingPair) {
        shortUrl = existingPair.shortUrl;
    } else {
        const count = await repository.getNextCount();
        shortUrl = convertIdToShortUrl(count);

        if (!isValidHttpUrl(shortUrl)) {
            throw `Invalid short url: ${shortUrl}`;
        }
        await repository.storeUrlPair(longUrl, shortUrl);
    }

    return {
        longUrl,
        shortUrl,
    };
};

const MainProcessor = {
    connectDb: repository.connectDb,
    getUrls,
    postUrl,
};

export default MainProcessor;
