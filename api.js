import axios from 'axios';

import * as c from './constants';

export function getData() {
    return new Promise((resolve, reject) => {
        let requests = [
            axios.get(c.POPULAR),
            axios.get(c.TOP_RATED),
            axios.get(c.NOW_PLAYING),
            axios.get(c.UPCOMING)
        ];

        axios.all(requests)
            .then(axios.spread((popular, top_rated, now_playing, upcoming) => {
                popular = popular.data.results;
                top_rated = top_rated.data.results;
                now_playing = now_playing.data.results;
                upcoming = upcoming.data.results;

                let data = {popular, top_rated, now_playing, upcoming};
                resolve(data);
            }))
            .catch(error => reject(handleError(error)));
    });
};

export function getMoviesByGenre(genre_id) {
    return new Promise((resolve, reject) => {
        axios.get(c.DISCOVER + "&with_genres=" + genre_id)
            .then(res => res.data)
            .then((data) => resolve(data))
            .catch(error => reject(handleError(error)));
    });
};

export function getMovieDetails(movie_id) {
    return new Promise((resolve, reject) => {

        let requests = [
            axios.get(c.MOVIE_DETAILS + movie_id + c.API_KEY + c.API_PARAMS),
            axios.get(c.MOVIE_DETAILS + movie_id + c.CREDITS),
            axios.get(c.MOVIE_DETAILS + movie_id + c.SIMILAR)
        ];
        axios.all(requests)
            .then(axios.spread((details, credits, similar) => {
                details = details.data;
                credits = credits.data;
                similar = similar.data.results;
                let videos = details.videos.results;

                let data = {...details, ...credits, similar, videos};
                resolve(data);
            }))
            .catch(error => reject(handleError(error)));
    });
};


function handleError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        let {data} = error.response;
        error = data.error;
    }

    if (error.hasOwnProperty("message")) error = error.message;

    return error;
};


export function searchMovies(keyword) {
    return new Promise((resolve, reject) => {
        axios.get(c.SEARCH + "&query=" + keyword)
            .then(res => res.data)
            .then((data) => resolve(data))
            .catch((error) => reject(handleError(error)));
    });
}

export function getMoviesByType(url, type = null, dispatch) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => res.data)
            .then((data) => {
                if (type) dispatch({type, data});
                resolve(data);
            })
            .catch((error) => reject(handleError(error)));
    });
};
