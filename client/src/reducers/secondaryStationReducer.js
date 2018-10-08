import { SET_SECONDARY_STATION } from '../constants';

export default function (state = {}, action) {

	switch (action.type) {
	case SET_SECONDARY_STATION:
        return action.payload;
        
	default:
		return state
	}
}