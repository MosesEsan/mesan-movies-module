import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { Icon } from 'react-native-elements'

export default function Panel(props) {
    const {title, data} = props;

    return (
        <View style={[styles.container]}>
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionHeaderText, {flex: 1}]}>{title}</Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {data.map((item, index) => props.renderItem({item, index}))}
            </ScrollView>
        </View>
    );
};

export function PanelItem({title, subtext, image, onPress}) {
    return (
        <TouchableHighlight onPress={onPress} underlayColor="rgba(0, 0, 0, 0)">
            <View style={styles.item}>
                <FadeIn><Image style={styles.poster} source={{uri: image}}/></FadeIn>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.subtext} numberOfLines={1}>{subtext}</Text>
            </View>
        </TouchableHighlight>
    )
};

export function Video({name, type, source, index, onPress}) {
    return (
        <View>
            <View style={styles.video}>
                <View>
                    <FadeIn><Image style={styles.thumbnail} source={{uri: source}}/></FadeIn>
                    <TouchableHighlight style={styles.videoOverlay} onPress={onPress}>
                        <Icon name={"play-circle"}
                              type={"font-awesome"}
                              size={30}
                              iconStyle={{height: 30}}
                              color={"#FEFEFD"}/>
                    </TouchableHighlight>
                </View>
                <Text style={styles.title} numberOfLines={1}>{name}</Text>
                <Text style={styles.subtext} numberOfLines={1}>{type}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        paddingBottom: 30,
    },

    sectionHeader: {
        flexDirection: "row",
        paddingVertical: 19
    },

    sectionHeaderText: {
        color: '#363434',
        fontSize: 19,
        fontFamily: 'HelveticaNeue-Bold',
        marginHorizontal: 8 * 1.5
    },

    item: {
        marginLeft: 8 * 1.5,
        width: (180/1.3333333333) - 10,
    },

    video: {
        marginLeft: 8 * 1.5,
        width: 230,
    },

    thumbnail: {
        width: 230,
        height: 130,
        borderRadius: 8,
        backgroundColor: '#eee',
    },

    poster: {
        height: 180,
        width: (180/1.3333333333) - 10,
        borderRadius: 8,
        backgroundColor: '#D5D5D5',
    },

    title: {
        fontSize: 15,
        fontFamily: 'HelveticaNeue-Medium',
        color: '#363434',
        marginTop: 10,
        marginBottom: 4
    },

    subtext: {
        fontSize: 15,
        fontFamily: 'Helvetica Neue',
        color: '#A5A5A4'
    },

    videoOverlay:{
        backgroundColor:"transparent",
        position:"absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});