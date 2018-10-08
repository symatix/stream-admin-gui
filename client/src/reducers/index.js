
import { combineReducers } from 'redux'
import stationsReducer from './stationsReducer';
import currentStateReducer from './currentStateReducer';
import activeStationReducer from './activeStationReducer';
import secondaryStationReducer from './secondaryStationReducer';

export default combineReducers({
	stations: stationsReducer,
	currentState: currentStateReducer,
	activeStation: activeStationReducer,
	secondaryStation: secondaryStationReducer,
});