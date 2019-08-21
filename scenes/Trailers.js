import React, {useEffect, useState} from 'react';

import { WebView } from 'react-native-webview';

import * as api from '../api'

//Reusing components from the Home module
import { Loading, EmptyError } from '../../home/components/Shared'

export default function Trailers(props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [source, setSource] = useState("");

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET DATA
    const getData = () => {
        if (navigation.state.params.hasOwnProperty("source")){
            let source = navigation.getParam("source");
            source = "https://youtu.be/"+source;
            setSource(source);
            setIsFetching(false);
        }else{
            setIsFetching(true);

            api.getMovieDetails(navigation.getParam("movie_id"))
                .then((data) => {
                    let videos = data.videos;
                    let source = null;

                    for (let i = 0; i < videos.length; i++){
                        let video = videos[i];

                        if (video.site = "YouTube"){
                            source = "https://youtu.be/"+video.key;
                            break;
                        }
                    }

                    if (source) setSource(source);
                    else setError("No videos available for this movie.")

                })
                .catch((error) => setError(error))
                .finally(() => setIsFetching(false))
        }
    };

    //==================================================================================================

    //5 - RENDER
    if (isFetching) return <Loading/>;
    else if (error !== null) return <EmptyError message={error} onPress={getData}/>;
    else
        return (
            <WebView source={{ uri: source }} />
        );
};

Trailers.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam("title")
});