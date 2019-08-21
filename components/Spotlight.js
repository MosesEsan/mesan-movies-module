import React from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import Carousel from 'react-native-snap-carousel';
import FadeIn from 'react-native-fade-in-image';
import moment from 'moment';

import {IMAGE_URL} from "../constants";

export const windowWidth = Dimensions.get('window').width;
let overlayColors = ['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)'];


export default function Spotlight({data, onPress}) {

    const renderItem = ({item, index}) => {
        return (
            <TouchableHighlight onPress={() => onPress(index)}>
                <ImageBackground style={[styles.item]} source={{uri: IMAGE_URL + item.backdrop_path}}>
                    <LinearGradient colors={overlayColors} style={styles.overlay}>
                        <View style={[{padding: 20, flexDirection: "row"}]}>
                            <FadeIn><Image style={styles.poster} source={{uri: IMAGE_URL + item.poster_path}}/></FadeIn>
                            <View style={[styles.info]}>
                                <Text style={styles.subtext}
                                      numberOfLines={1}>{moment(item.release_date).format('MMM YYYY')}</Text>
                                <Text style={styles.name} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.overview} numberOfLines={2}>{item.overview}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableHighlight>
        )
    };

    // center items on screen
    if (data.length > 0) {
        return (
            <View style={styles.container}>
                <Carousel
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={windowWidth}
                    sliderHeight={((windowWidth) / 1.7) + 50}
                    itemWidth={windowWidth}
                    firstItem={1}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    autoplay={true}
                    autoplayDelay={5000}
                />
            </View>
        );
    } else {
        return (
            <View style={[styles.container]}/>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },

    poster: {
        width: 75,
        height: 110,
        backgroundColor: '#D5D5D5',
        marginRight: 16,
    },

    info: {
        flex: 1,
        justifyContent: "center"
    },

    item: {
        width: windowWidth,
        height: (windowWidth) / 1.7
    },

    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: (windowWidth) / 1.7,
        justifyContent: "flex-end",
    },

    subtext: {
        fontSize: 15,
        fontFamily: 'HelveticaNeue-Medium',
        color: '#A5A7AB'
    },

    name: {
        fontSize: 18,
        fontFamily: 'HelveticaNeue-Medium',
        color: "#FEFEFD",
        marginVertical: 10
    },

    overview: {
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        color: "#FEFEFD",
    }
});