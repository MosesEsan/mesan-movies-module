import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReadMore from 'react-native-read-more-text';

const Synopsis = ({summary}) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionHeaderText]}>
                    {"Summary"}
                </Text>
            </View>
            <View style={styles.content}>
                <ReadMore numberOfLines={4}>
                    <Text style={styles.summary}>
                        {summary}
                    </Text>
                </ReadMore>
            </View>
        </View>
    );
};

export default Synopsis;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        padding:16,
        paddingBottom: 30,
    },

    sectionHeader: {
        flexDirection: "row",
    },

    sectionHeaderText: {
        fontSize: 19,
        fontFamily: 'HelveticaNeue-Bold',
        color: '#363434',
        flex: 1
    },

    content:{
        marginTop:8*1.5
    },

    summary: {
        fontSize: 16.5,
        lineHeight: 23,
        fontFamily: 'Helvetica Neue',
        color: '#363434'
    }
});