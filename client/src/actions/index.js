
import axios from 'axios';
import { 
	GET_STATIONS, 
	GET_CURRENT_STREAM_STATE,
	GET_SONG_LIST_FOR_STATION,
	SET_ACTIVE_STATION,
	SET_SECONDARY_STATION
} from '../constants';

export const getStations = () => async dispatch => {
	const res = await axios.get("/api/stations");
	dispatch({ type: GET_STATIONS, payload: res.data });
};

export const getCurrentStreamState = () => async dispatch => {
	const res = await axios.get(`/api/stations/current`);
	dispatch({ type: GET_CURRENT_STREAM_STATE, payload: res.data });
}

export const getSongListForStation = data => async dispatch => {
	const { station, start, end } = data;
	const res = await axios.get(`/api/${station}/${start}/${end}`);

	console.log(res.data)
	dispatch({ type: GET_SONG_LIST_FOR_STATION, payload: res.data[0] });
}

export const setActiveStation = station => async dispatch => {
	const res = await axios.get(`/api/${station}/songs`);
	res.data.song_list.sort(function(a, b){
		if(a["time"] < b["time"]) return 1;
		if(a["time"] > b["time"]) return -1;
		return 0;
	})
	dispatch({ type: SET_ACTIVE_STATION, payload: res.data });
};

export const setSecondaryStation = station => async dispatch => {
	const res = await axios.get(`/api/${station}/songs`);
	res.data.song_list.sort(function(a, b){
		if(a["time"] < b["time"]) return 1;
		if(a["time"] > b["time"]) return -1;
		return 0;
	})
	dispatch({ type: SET_SECONDARY_STATION, payload: res.data });
};