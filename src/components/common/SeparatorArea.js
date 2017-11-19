import React from 'react';
import {View,StyleSheet} from 'react-native';

const SeparatorArea = props => {
    return (
        <View style={[props.vertical?styles.VSeparatorArea:styles.separatorArea,props.style]}/>
    );
}

const styles = StyleSheet.create({
    separatorArea: {
        alignSelf: 'stretch',
        height: 10,
        backgroundColor: "#fff",
    },
    VSeparatorArea: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        width: 10,
        backgroundColor: "#fff",
    }
});

SeparatorArea.propTypes = {
    ...View.propTypes,
};

export default SeparatorArea;