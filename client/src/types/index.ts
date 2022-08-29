export interface IUrlPair {
	longUrl: string;
	shortUrl: string;
}

export interface IPostRequestBody {
	longUrl: string;
}

export interface IPostResponseBody {
	longUrl: string;
	shortUrl: string;
}

export interface IGetResponseBody {
	urls: IUrlPair[];
}
