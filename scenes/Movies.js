import React, {useEffect, useState} from 'react';
import { FlatList } from 'react-native';

import * as api from '../api'

//Reusing components from the Home module
import { Loading, EmptyError } from '../../home/components/Shared'

import MovieItem from '../components/MovieItem'

const emptyMessage = "There are no movies to show...";

export default function Movies(props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [movies, setMovies] = useState([]);

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);

        api.getMoviesByGenre(navigation.getParam("genre_id"))
            .then((data) => setMovies(data.results))
            .catch((error) => setError(error))
            .finally(() => setIsFetching(false))
    };

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        let onPress =() => navigation.navigate("Movie", {title:item.title, movie:item});

        return <MovieItem item={item} index={index} onPress={onPress}/>;
    };

    //==================================================================================================

    //5 - RENDER
    if (isFetching) return <Loading/>;
    else if (error !== null) return <EmptyError message={error} onPress={getData}/>;
    else
        return (
            <FlatList
                style={{backgroundColor: '#ffffff'}}
                contentContainerStyle={{}}
                data={movies}
                extraData={movies}
                initialNumToRender={5}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString() + '_movie'}
                ListEmptyComponent={<EmptyError message={emptyMessage} onPress={getData}/>}/>
        );
};

Movies.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam("title")
});