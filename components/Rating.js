import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';

const Rating = ({rating, activeColor, inActiveColor, size}) => {
    return (
        <View style={[styles.ratingContainer]}>
            <View style={[styles.ratingWrapper]}>
                {
                    [1, 2, 3, 4, 5].map((rate, idx) => {
                        return (
                            <Icon name={(idx < rating) ? "star" : "star"}
                                  type={"font-awesome"}
                                  size={size}
                                  iconStyle={{height: size, marginRight: 4}}
                                  color={(idx < rating) ? activeColor : inActiveColor}
                                  key={`rating_item_${idx}`}/>
                        )
                    })
                }
            </View>
        </View>
    )
};

export default Rating;

Rating.defaultProps = {
    activeColor: "#F1F2F2",
    inActiveColor: "rgba(255,255,255,.5)",
    size: 15
};

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 4, marginBottom: 10
    },

    ratingWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
});