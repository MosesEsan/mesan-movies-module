import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FadeIn from 'react-native-fade-in-image';

import moment from "moment";

import Rating from "./Rating";

import {IMAGE_URL} from "../constants";

const MovieInfo = ({item}) => {

    const getGenre = () => {
        const {genres} = item;
        let genre_s = genres.map((genre) => (genre.name));

        return genre_s.join(", ");
    };

    return (
        <View style={styles.item}>
            <FadeIn style={styles.poster}>
                <Image style={styles.poster} source={{uri: IMAGE_URL + item.poster_path}}/>
            </FadeIn>
            <View style={styles.info}>
                <Text style={styles.date}>Released: {moment(item.release_date).format('MMM YYYY')}</Text>
                <Text style={styles.name}>{item.title}</Text>

                <Rating rating={(item.vote_average * 10) / 20} activeColor={"#FFD700"} inActiveColor={"#D5D5D5"}
                        size={20}/>
                {
                    item.hasOwnProperty("genres") &&
                    <Text style={styles.genres}>
                        {getGenre()}
                    </Text>
                }
            </View>
        </View>
    )
};

export default MovieInfo;

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: 8 * 2
    },

    poster: {
        height: 190,
        width: 190 / 1.3333333333, borderRadius: 8,
        backgroundColor: '#D5D5D5',
    },

    info: {
        paddingLeft: 14,
        flex: 1,
        justifyContent: "center"
    },

    date: {
        fontSize: 15,
        fontFamily: 'Helvetica Neue',
        color: '#afafae'
    },

    name: {
        fontSize: 22,
        fontFamily: 'HelveticaNeue-Bold',
        color: '#363434',
        marginVertical: 6
    },

    genres: {
        fontSize: 15,
        fontFamily: 'Helvetica Neue',
        color: '#A5A5A4',
        marginBottom: 6
    },

    overview: {
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        color: '#42484d',
        marginTop: 12
    }
});