import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export function Filters({filters, onFilter}) {
    return (
        <View style={[styles.container]}>
            <ScrollView style={[styles.wrapper]} horizontal={true} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.innerContainer}>
                {
                    filters.map((filter, index) => {
                        return (
                            <TouchableOpacity onPress={() => onFilter(index)} key={"filter_" + index}>
                                <View style={[
                                    styles.option,index === 0 && styles.firstOption]} key={'filters_' + index}>
                                    <Text
                                        style={[styles.optionText]}>{filter.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

export default Filters;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: "#A3A2A4"
    },

    wrapper: {
        paddingVertical: 8 * 1.2,
        flexDirection: "row"
    },

    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    option: {
        height: 38,
        borderWidth: 1, borderColor: '#F1F0F1',
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: 'transparent',
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        color: "#DA5140",
        borderWidth: 1

    },

    firstOption: {
        marginLeft: 8 * 1.5
    },

    optionText: {
        color: "#636f75",
        fontFamily: "HelveticaNeue-Bold",
        fontSize: 13,
    }
});