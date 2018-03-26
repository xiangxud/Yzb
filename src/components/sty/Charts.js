import React, {Component, PureComponent} from "react";
import {
    WebView,
    View,
    Image,
    Text,
    TouchableOpacity,
    BackHandler,
    Platform
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {observer} from "mobx-react/native";

@observer
export default class charts extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { temperature , humidity , co2,...other} = this.props;

        const sourceIOS =
            {
                uri:`../../resource/web/index.html?t=${temperature}&h=${humidity}&o=${co2}`,
                baseUrl:'../../resource/web/'
            };
        const sourceAndroid =
            {
                uri:`file:///android_asset/web/index.html?t=${temperature}&h=${humidity}&o=${co2}`,
                baseUrl:'file:///android_asset/web/'
            };

        const source = Platform.OS === 'ios' ? sourceIOS : sourceAndroid;

        // let source;
        // const _source = resolveAssetSource(require('../../resource/web/index.html'));
        // if (__DEV__) {
        //     source = { uri: `${_source.uri}&t=${temperature}&h=${humidity}&c=${co2}` };
        //
        //     alert( JSON.stringify(source) );
        // } else {
        //     const sourceAndroid = { uri: `file:///android_asset/web/index.html?t=${temperature}&h=${humidity}&c=${co2}` };
        //     const sourceIOS = { uri: `file://${_source.uri}?t=${temperature}&h=${humidity}&c=${co2}` };
        //     source = Platform.OS === 'ios' ? sourceIOS : sourceAndroid;
        // }
        return <WebView source={source}

                        style={{flex:1,backgroundColor:'#ffffff',height:120}}>
        </WebView>
    }
}