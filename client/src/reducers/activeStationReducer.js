import { SET_ACTIVE_STATION } from '../constants';

export default function (state = {}, action) {

	switch (action.type) {
	case SET_ACTIVE_STATION:
        return action.payload;
        
	default:
		return state
	}
}