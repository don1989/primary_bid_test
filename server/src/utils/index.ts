export const defaultUrl = 'https://pb.io/';
export const shortUrlLen = 8;

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const base = 36;

export const convertIdToShortUrl = (num: number): string => {
    if (num < 0) {
        throw 'Id must be >= 0';
    }

    let result = [];

    if (num === 0) {
        result = ['0'];
    } else {
        while (num) {
            result.push(alphabet[num % base]);
            num = Math.floor(num / base);
        }
        result.reverse();
    }

    const shortUrl = defaultUrl + fillToMinimumLength(result.join(''));
    return shortUrl;
};

export const convertShortUrlToId = (shortUrl: string): number => {
    let idx = defaultUrl.length;
    const uri = shortUrl.substring(idx);
    const id = parseInt(uri, base);
    return id;
};

export const isValidHttpUrl = (inUrl: string) => {
    let url: URL | undefined;

    try {
        url = new URL(inUrl);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};

const fillToMinimumLength = (shortUrl: string): string => {
    const len = shortUrl.length;
    let difference = shortUrlLen - len;
    if (difference <= 0) {
        return shortUrl;
    }

    const charsToPad = [];
    while (difference--) {
        charsToPad.push('0');
    }

    return `${charsToPad.join('')}${shortUrl}`;
};
