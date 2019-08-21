import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import {IMAGE_URL} from "../constants";
import moment from "moment";

const MovieItem = ({item, onPress}) => {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.item}>
                <FadeIn style={styles.poster}>
                    <Image style={styles.poster} source={{uri: IMAGE_URL + item.poster_path}}/>
                </FadeIn>
                <View style={styles.info}>
                    <Text style={styles.date}>{moment(item.release_date).format('MMM YYYY')}</Text>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.overview} numberOfLines={2}>{item.overview}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
};

export default MovieItem;

const styles = StyleSheet.create({
    item: {
        margin: 8,
        marginHorizontal: 8 * 1.5,
        flexDirection: "row",
        borderRadius: 8,
        backgroundColor: "#ffffff",
        padding: 8,

        shadowColor: "rgba(0,0,0,.3)",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.00,

        elevation: 24,
    },

    poster: {
        height: 150, width: 105, borderRadius: 8,
        backgroundColor: '#eee',
    },

    info: {
        paddingLeft: 14,
        flex: 1,
        justifyContent: "center"
    },

    date: {
        fontSize: 15,
        fontFamily: 'HelveticaNeue-Medium',
        color: '#A5A7AB'
    },

    name: {
        fontSize: 17,
        fontFamily: 'HelveticaNeue-Medium',
        color: '#42484d',
        marginTop: 10,
        marginBottom: 6
    },

    overview: {
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        color: '#42484d',
        marginTop: 12
    }
});