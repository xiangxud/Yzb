import React, {PureComponent} from "react";
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from "react-native";
import PropTypes from 'prop-types';

export default class Loading extends PureComponent {
    render() {
        let {text, show} = this.props;
        if (show)
            return (
                <View style={styles.loading}>
                    <ActivityIndicator color={'#15856e'}/>
                    <Text style={styles.loadingTitle}>{text}</Text>
                </View>
            )
        return null
    }
}

const styles = StyleSheet.create({
    loading: {
        flexDirection:'row',
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingTitle: {
        fontSize: 14,
        color: '#15856e'
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