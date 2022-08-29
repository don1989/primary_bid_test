import mongoose from 'mongoose';
import { defaultUrl, shortUrlLen } from '../utils';

const urlPairSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        lowercase: true,
        immutable: true,
    },
    shortUrl: {
        type: String,
        required: true,
        lowercase: true,
        immutable: true,
        minLength: defaultUrl.length + shortUrlLen,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const UrlPair = mongoose.model('urlpairs', urlPairSchema);
export default UrlPair;
