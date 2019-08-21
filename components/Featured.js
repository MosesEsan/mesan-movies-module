import React from 'react';
import {Dimensions, StyleSheet, View, ImageBackground, TouchableHighlight, Text} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { Icon } from 'react-native-elements'
import moment from 'moment';

import {IMAGE_URL} from "../constants";

export const windowWidth = Dimensions.get('window').width;
let overlayColors = ['transparent','rgba(0,0,0,0.5)','rgba(0,0,0,0.6)','rgba(0,0,0,0.8)'];

export default function Featured({item, onPress}) {
    return(
        <ImageBackground style={styles.container} source={{uri: IMAGE_URL + item.backdrop_path}}>
            <LinearGradient colors={overlayColors} style={styles.overlay}>
                <View style={[{padding: 20, flexDirection:"row"}]}>
                    <View style={[styles.info]}>
                        <Text style={[styles.name]} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.subtext}>{moment(item.release_date).format('MMM YYYY')}</Text>
                    </View>
                </View>
            </LinearGradient>
            <TouchableHighlight style={styles.videoOverlay} onPress={() => onPress(item)} underlayColor="rgba(0, 0, 0, 0)">
                <Icon name={"play-circle"}
                      type={"font-awesome"}
                      size={60}
                      iconStyle={{height: 60}}
                      color={"#FEFEFD"}/>
            </TouchableHighlight>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: (windowWidth) / 1.7
    },

    info: {
        flex: 1,
        justifyContent: "center"
    },

    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: (windowWidth) / 1.7,
        justifyContent:"flex-end",
    },

    subtext: {
        fontSize: 15,
        fontFamily: 'HelveticaNeue-Medium',
        color: '#A5A7AB'
    },

    name: {
        fontSize: 23,
        marginBottom: 5,
        color: "#FEFEFD",
        fontFamily: "HelveticaNeue-Bold",
    },

    videoOverlay:{
        backgroundColor:"transparent",
        position:"absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});