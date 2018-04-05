import React, {PureComponent} from "react";
import {StyleSheet, ScrollView, View} from "react-native";
import PropTypes from 'prop-types';
import {Spinner} from "native-base";

export default class Content extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: props.delay
        };
        this.timer = null;
    }

    componentDidMount() {
        let {isLoading} = this.state;
        if (isLoading) {
            this.timer = setTimeout(() => {
                this.setState({
                    isLoading: false
                })
            }, config.loadingDelayTime)
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let {isLoading} = this.state;
        let {children, gray, white, padder, style} = this.props;
        let contentStyle = Object.assign({flex: 1}, style);

        if (gray) {
            contentStyle.backgroundColor = theme.contentBgColor;
        } else if (white) {
            contentStyle.backgroundColor = '#FFFFFF';
        }

        if (padder) {
            contentStyle.padding = 15;
        }

        return (
            <View style={contentStyle}>
                {isLoading ? <Spinner color='green'/> : null}
                {!isLoading && children}
            </View>
        )
    }
}

Content.propTypes = {
    gray: PropTypes.bool, // 背景灰色
    white: PropTypes.bool, // 背景白色
    padder: PropTypes.bool, // 加Padding
    delay: PropTypes.bool, // 延迟加载
    style: PropTypes.object
}

Content.defaultProps = {
    gray: false,
    white: false,
    padder: false,
    delay: false,
    style: {}
}
