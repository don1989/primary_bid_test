import * as utils from './';

describe('utils', () => {
  test('converting between id and short url should return the same id', () => {
    const nums = [0, 1, 5743, 2343432, 9881273719];
    nums.forEach(num => {
      const shortUrl = utils.convertIdToShortUrl(num);
      const id = utils.convertShortUrlToId(shortUrl);
      expect(id).toBe(num);
    });
  });

  test('throws if bad id is passed in', () => {
    expect(() => {
      utils.convertIdToShortUrl(-10);
    }).toThrow();
  });
});
