import { GET_SONG_LIST_FOR_STATION } from '../constants';

export default function (state = {}, action) {

	switch (action.type) {
	case GET_SONG_LIST_FOR_STATION:
        return action.payload;
        
	default:
		return state
	}
}