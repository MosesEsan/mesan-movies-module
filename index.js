import {createStackNavigator} from 'react-navigation-stack';

import Discover from "./scenes/Discover"
import Movies from "./scenes/Movies"
import Movie from "./scenes/Movie"
import Trailers from "./scenes/Trailers"

const RouteStack = createStackNavigator({
    Discover,
    Movies,
    Movie,
    Trailers
});

export default RouteStack;