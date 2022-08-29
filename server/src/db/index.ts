import mongoose from 'mongoose';
import UrlPair from './UrlPair';
import Counter from './Counter';
import { IUrlPair } from 'types';

const dbName = process.env.MONGO_DB_NAME || 'testdb';

mongoose.connect(`mongodb://localhost/${dbName}`);

const getUrlPairs = async (): Promise<IUrlPair[]> => {
    const urlPairs = await UrlPair.find({}, { longUrl: 1, shortUrl: 1 }).sort({ createdAt: -1 });
    return urlPairs;
};

const getUrlPair = async (longUrl: string): Promise<IUrlPair> => {
    const urlPair = await UrlPair.findOne({ longUrl }, { longUrl: 1, shortUrl: 1 });
    return urlPair;
};

const getNextCount = async (): Promise<number> => {
    const count = await Counter.findOneAndUpdate({}, { $inc: { seq: 1 } });
    let seq = 0;
    if (count == null) {
        await Counter.create({
            seq: 1,
        });
    } else {
        seq = count.seq;
    }
    return seq;
};

const storeUrlPair = async (longUrl: string, shortUrl: string): Promise<void> => {
    await UrlPair.create({
        longUrl,
        shortUrl,
        createdAt: new Date(),
    });
};

const repository = {
    getUrlPairs,
    getUrlPair,
    getNextCount,
    storeUrlPair,
};

export default repository;
