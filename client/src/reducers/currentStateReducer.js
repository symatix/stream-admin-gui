import { GET_CURRENT_STREAM_STATE } from '../constants';

export default function (state = [], action) {

	switch (action.type) {
	case GET_CURRENT_STREAM_STATE:
        return action.payload;
        
	default:
		return state
	}
}