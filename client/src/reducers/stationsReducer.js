import { GET_STATIONS } from '../constants';

export default function (state = [], action) {

	switch (action.type) {
	case GET_STATIONS:
        return action.payload;
        
	default:
		return state
	}
}