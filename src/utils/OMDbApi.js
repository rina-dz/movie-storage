class OMDbApi {
    constructor(data) {
        this.baseUrl = data.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }


    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }


    getMovieById(id) {
        return this._request(`${this.baseUrl}i=${id}`, {
            method: 'GET'
        })
    }

    getMovieByName(info) {
        return this._request(`${this.baseUrl}s=${info.name}&page=${info.page}`, {
            method: 'GET'
        })
    }

    getMovieByNameAndYear(info) {
        return this._request(`${this.baseUrl}s=${info.name}&y=${info.year}&page=${info.page}`, {
            method: 'GET'
        })
    }
}

const newOMDbApi = new OMDbApi({
    baseUrl: 'https://www.omdbapi.com/?apikey=27310c94&'
})

export { newOMDbApi };