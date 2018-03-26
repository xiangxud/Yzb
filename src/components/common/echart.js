import React, {PureComponent} from "react";
import {StyleSheet,Platform, View, WebView} from "react-native";

export default class EChart extends PureComponent {
    constructor(props){
        super(props);



    }
    data={};
    componentWillMount(){
    }
    onMessage(e){
        let {data} = this.props;
        this.webView.postMessage(JSON.stringify(data));
    }
    render() {
        let {data,style,...other} = this.props;
        if( !style ){
            style={};
        }

        if(!(style instanceof Array)){
            style=[style];
        }

        const sourceIOS = {
                uri:`../../resource/web/main.html`,
                baseUrl:'../../resource/web/'
            };
        const sourceAndroid = {
                uri:`file:///android_asset/web/main.html`,
                baseUrl:'file:///android_asset/web/'
            };
        const source = Platform.OS === 'ios' ? sourceIOS : sourceAndroid;

        return <WebView
            ref={w => this.webView = w}
            {...other}
            style={[...style]}
            onMessage={this.onMessage.bind(this)}
            source={source}></WebView>
    }
}

const styles = StyleSheet.create({
    main: {
        height:250,
        backgroundColor:'#e69d63',
        justifyContent:'center',
        alignItems:'center'
    }
})