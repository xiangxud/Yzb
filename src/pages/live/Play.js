/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    NativeModules,
    processColor,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native';
import KSYVideo from 'react-native-ksyvideo';
import AudioController from '../../components/video/AudioController';

export default class LiveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {showbar: true, degree: 0 , mirror: false, volume: 0.5};
    }

    onPressRotate(){
        //this.state.degree=(this.state.degree+90)%360;
        // this.video.setRotateDegree(this.state.degree);
        this.setState({degree: (this.state.degree+90)%360});
    }

    onAudioProgressChanged(newPercent) {
        if (newPercent >= 0){
            this.setState({volume: newPercent/100});
        }
    }

    render() {
        const {params} = this.props.navigation.state;
        const {volume} = this.state;
        return (
            <View style={styles.container}>

                <StatusBar
                    hidden={!this.state.showbar}
                />

                <KSYVideo
                    ref={(video)=>{this.video = video}}
                    source={{uri:params.url}}
                    bufferSize={30}
                    bufferTime={4}
                    repeat={true}
                    mirror={this.state.mirror}
                    degree={this.state.degree}
                    resizeMode={'contain'}
                    volume={volume}
                    onTouch={()=>{
                        this.setState({showbar: !this.state.showbar})
                    }
                    }
                    onLoad={(data)=>{console.log("JS onPrepared, video size = " + data.naturalSize.width + "x" +  data.naturalSize.height);}}
                    onEnd={(data)=>{this.props.navigation.goBack();console.log("JS onCompletion");}}
                    onError={(data)=>{this.props.navigation.goBack();console.log("JS onError:" + data.error.what + data.error.extra);}}
                    style={styles.fullScreen}
                />

                {this.state.showbar?(
                    <View style={{justifyContent:'flex-end', width:40, marginBottom:10}}>
                        <View style={[styles.controller]}>
                            <View style={[styles.progressBar]}>
                                <AudioController  percent={volume*100} onNewPercent={this.onAudioProgressChanged.bind(this)}/>
                            </View>
                        </View>
                    </View>):(null)}

                {this.state.showbar?(
                    <View style={{marginRight:10, justifyContent: 'center'}}>
                        <TouchableOpacity style={{marginTop:40}} onPress={()=>{this.setState({mirror: !this.state.mirror});}}>
                            <Image style={{width:40,height:40}} source={require("../../resource/images/mirror.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop:40}} onPress={this.onPressRotate.bind(this)}>
                            <Image style={{width:40,height:40}} source={require("../../resource/images/rotation.png")}/>
                        </TouchableOpacity>
                    </View>):(null)}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },

    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },

    videoView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    controller: {
        height: 30,
        width: 250,
        justifyContent: "center",
        alignItems: "center"
    },
    progressBar: {
        alignSelf: "stretch",
        margin: 30
    },
});