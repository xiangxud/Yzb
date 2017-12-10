import React, {PureComponent} from "react";
import {
    StyleSheet,
    View,
    Text,
    Modal,
} from "react-native";
import {Spinner} from 'native-base';
import PropTypes from 'prop-types';

export default class MaskLoading extends PureComponent {
    render() {
        let {text, show} = this.props;
        if (show) {
            return (
                <Modal transparent={true} style={styles.container} onRequestClose={()=>{}}>
                    <View style={styles.loadingBox}>
                        <Spinner color={'#fff'}/>
                        <Text style={styles.loadingTitle}>{text}</Text>
                    </View>
                </Modal>
            )
        }else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    loadingBox: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)', // 半透明
    },
    loadingTitle: {
        fontSize: 14,
        color: '#FFFFFF'
    }
});

MaskLoading.propTypes = {
    text: PropTypes.string,
    show: PropTypes.bool,
};

MaskLoading.defaultProps = {
    text: '正在加载...',
    show: false,
};