import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import moment from 'moment';

import * as api from '../api'
import {IMAGE_URL} from "../constants";

//Reusing components from the Home module
import { Loading, EmptyError } from '../../home/components/Shared'

import Panel, {PanelItem, Video} from '../components/Panel'
import Synopsis from '../components/Synopsis'
import MovieInfo from '../components/MovieInfo'

export default function Movie(props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [movie, setMovie] = useState(navigation.getParam("movie"));

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET DATA
    const getData = () => {
        setIsFetching(true);

        api.getMovieDetails(movie.id)
            .then((data) => setMovie(data))
            .catch((error) => setError(error))
            .finally(() => setIsFetching(false))
    };
    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderCastItem = ({item, index}) => {
        const {name, character, profile_path} = item;
        let image = IMAGE_URL + profile_path;

        return <PanelItem title={name} subtext={character} image={image}/>
    };

    const renderCrewItem = ({item, index}) => {
        const {name, job, profile_path} = item;
        let image = IMAGE_URL + profile_path;

        return <PanelItem title={name} subtext={job} image={image}/>
    };


    const renderSimilarItem = ({item, index}) => {
        const {title, release_date, poster_path} = item;
        let image = IMAGE_URL + poster_path;

        return <PanelItem title={title} subtext={moment(release_date).format('MMM YYYY')} image={image}/>
    };

    const renderVideoItem = ({item, index}) => {
        if (item.site === "YouTube"){
            return <Video
                name={item.name}
                type={item.type}
                source={`https://img.youtube.com/vi/${item.key}/0.jpg`}
                index={index}
                onPress={() => navigation.navigate("Trailers", {source: item.key})}
                key={"video_" + index}/>
        }else{
            return null;
        }
    };

    const renderBottomSection = () => {
        if (isFetching) return <Loading/>;
        else if (error !== null) return <EmptyError message={error} onPress={getData}/>;
        else
            return (
                <View style={{}}>
                    {movie.cast && <Panel title={"The Cast"} data={movie.cast} renderItem={renderCastItem}/>}
                    {movie.crew && <Panel title={"The Crew"} data={movie.crew} renderItem={renderCrewItem}/>}
                    {movie.videos && <Panel title={"Videos"} data={movie.videos} renderItem={renderVideoItem}/>}
                    {movie.similar && <Panel title={"Similar Movies"} data={movie.similar} renderItem={renderSimilarItem}/>}
                </View>
            );
    };

    return (
        <ScrollView style={{flex:1, backgroundColor: 'white'}}>
            <MovieInfo item={movie}/>
            <Synopsis summary={movie.overview} containerStyle={{paddingBottom:20}}/>
            {renderBottomSection()}
        </ScrollView>
    );
};