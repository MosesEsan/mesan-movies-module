import * as t from './constants';

let initialState = {
    popular: [],
    top_rated: [],
    upcoming: [],
    now_playing: []
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.DATA_AVAILABLE: {
            let {popular, top_rated, upcoming, now_playing} = action.data;

            return {...state, popular, top_rated, upcoming, now_playing};
        }

        default:
            return state;

    }
};

export default dataReducer;