class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=2dded9a23d39fe652db04ee605603574';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json()
    }
    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter );
    }

    getChacracter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);// add new ${} so we can reuse apikey and apibase
        return this._transformCharacter( res.data.results[0]);
    }
    // now when its starts its waiting for respond and after this start working
    //in res we are adding new data and after this we return our _transfromCharacter

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` :
                "There is no description for this character", //use slice to reduce text max if description = true else print text
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    }

}
 export default MarvelService;