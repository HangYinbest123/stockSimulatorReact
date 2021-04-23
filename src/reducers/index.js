import {combineReducers} from 'redux';

const songsReducer = () => {
    return [{
        title: 'All star', duration: '3:15'
    }];
};

const selectedSongReducer = (selectedSong=null, action) => {
    if(action.type ==='SONG_SELECTED'){
        return action.payload;
    }
    return selectedSong;
}

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});