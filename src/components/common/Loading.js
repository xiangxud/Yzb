import React from "react";
import {StyleSheet, View, Text, Image, ActivityIndicator} from "react-native";
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
    render() {
        let {text, isShow} = this.props;
        if (isShow)
            return (
                <View style={styles.container}>
                    <View style={styles.loading}>
                        <ActivityIndicator color={'#FFFFFF'}/>
                        <Text style={styles.loadingTitle}>{text}</Text>
                    </View>
                </View>
            )
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#EDEDED',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    loading: {
        backgroundColor: '#393939',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: '#FFFFFF'
    }
})


Loading.propTypes = {
    text: PropTypes.string,
    isShow: PropTypes.bool,
}

Loading.defaultProps = {
    text: '正在加载...',
    isShow: false,
}