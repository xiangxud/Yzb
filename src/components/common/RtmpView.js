import React, {PureComponent} from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from "react-native";

//import Icon from 'react-native-vector-icons/FontAwesome';
import KSYVideo from "react-native-ksyvideo"; //https://github.com/ksvc/react-native-video-player

export default class RtmpView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            paused: false
        }
    }

    componentDidMount() {
        alert('kaishi')
    }

    componentWillUnmount() {
    }

    videoLoadStart() {
        // tools.showToast('start');
    }

    videoLoaded() {
        //return <View><Text>监控加载中，请稍后...</Text></View>
        // tools.showToast('已加载监控');
    }

    videoError() {
        //return <View><Text>监控加载失败，请稍后重试~</Text></View>
        tools.showToast('监控加载失败，请重试');
    }
    onTouched() {
        this.setState({paused: true});
    }
    render() {
        let {uri} = this.props;
        return (
            <View style={styles.backgroundVideo}>
                <Text style={styles.loadingText}>视频加载中，请稍后...</Text>
                <KSYVideo source={{uri: uri}}   // Can be a URL or a local file.
                          volume={1.0}
                          muted={false}
                          paused={true}                          // Pauses playback entirely.
                          repeat={true}                           // Repeat forever.
                          onTouch={()=>this.onTouched.bind(this)}
                          onLoadStart={this.videoLoadStart}
                          onLoad={this.videoLoaded}
                          onError={this.videoError}
                          playInBackground={false}                // Audio continues to play when app entering background.
                          progressUpdateInterval={250.0}          // Interval to fire onProgress (default to ~250ms)
                          style={styles.video}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * (9 / 16),
        backgroundColor: '#6f6f6f',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    loadingText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})