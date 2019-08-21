import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {useDispatch, useSelector} from 'react-redux'

import moment from 'moment';

import {DATA_AVAILABLE, GENRES as filters, IMAGE_URL} from "../constants";
import * as api from "../api";

//Reusing components from the Home module
import { Loading, EmptyError } from '../../home/components/Shared'

import Filters from '../components/Filters'
import Panel, {PanelItem} from '../components/Panel'
import Spotlight from '../components/Spotlight'
import Featured from '../components/Featured'
import Movies from "./Movies";

export default function Discover (props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    //Access Redux Store State
    const moviesReducer = useSelector(({moviesReducer}) => moviesReducer);
    const { popular, top_rated, now_playing, upcoming } = moviesReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET DATA
    const getData = () => {
        setIsFetching(true);

        api.getData()
            .then((data) => dispatch({type: DATA_AVAILABLE, data}))
            .catch((error) => setError(error))
            .finally(() => setIsFetching(false))
    };

    //==================================================================================================

    //4 - FILTERS CONFIG
    const onFilter = (index) => {
        let filter = filters[index];
        navigation.navigate("Movies", {genre_id: filter.id, title:filter.name});
    };

    //5 - SPOTLIGHT CONFIG
    const onSpotlightPress = (index) => {
        let movie = popular[index];
        navigation.navigate("Movie", {title:movie.title, movie});
    };

    //6 - FEAUTURED CONFIG
    const onFeaturedPress = (item) => {
        navigation.navigate("Trailers", {movie_id: item.id});
    };

    //7 - PANEL CONFIG
    const renderPanelItem = ({item, index}) => {
        const {title, release_date, poster_path} = item;
        let image = IMAGE_URL + poster_path;

        let onPress = () => navigation.navigate("Movie", {title, movie:item});

        return <PanelItem title={title} subtext={moment(release_date).format('MMM YYYY')} image={image} onPress={onPress}/>
    };

    //==================================================================================================

    if (isFetching) return <Loading/>;
    else if (error !== null) return <EmptyError message={error} onPress={getData}/>;
    else {
        return (
            <ScrollView style={{flex: 1}}>
                <Filters filters={filters} onFilter={onFilter}/>

                <Spotlight header={"Popular"} data={popular} onPress={onSpotlightPress}/>

                <Panel title={"Top Rated"} data={top_rated} renderItem={renderPanelItem}/>

                <Featured item={top_rated[2]} onPress={onFeaturedPress}/>

                <Panel title={"Now Playing"} data={now_playing} renderItem={renderPanelItem}/>

                <Featured item={now_playing[8]} onPress={onFeaturedPress}/>

                <Panel title={"Upcoming"} data={upcoming} renderItem={renderPanelItem}/>
            </ScrollView>
        );
    }
};

Discover.navigationOptions = screenProps => ({
    title:  "MeMovies"
});