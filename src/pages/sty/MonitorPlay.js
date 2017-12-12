import React, {Component} from 'react';
import
{
    View,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {observer,inject} from 'mobx-react/native';
import {Container, Content, Button, Icon, Text} from 'native-base';

export default class MonitorPlay extends Component{
    constructor(props){
        super(props);
        this.state= {
            current: {},
            url: urls.webPath+'yzb/monitor/live',
            WebViewHeight: 200,
        };
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '栋舍监控',
        headerRight: <View/>
    });

    componentDidMount(){
        this.setState({current: this.props.navigation.state.params.video});
    }

    changePlay = (o) =>{
        this.setState({current: o});
    }

    render(){
        const {current} = this.state;
        return (<Container>
            <Content>
                <View style={styles.container}>
                    <WebView
                        javaScriptEnabled={true}
                        source={{uri: urls.webPath + 'yzb/monitor/live'}}
                        style={{ height: this.state.WebViewHeight }}
                        scalesPageToFit={false}
                        scrollEnabled={false}
                        onNavigationStateChange={(page)=> {
                            this.setState({
                                WebViewHeight: parseInt(page.title)
                            })
                        }}
                    />
                    <View style={styles.desc}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Icon name={'ios-videocam'} style={{color:'#dd3215', fontSize:28, marginRight:3}}/>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>{current.videoName}</Text>
                        </View>
                        <Text>监控栋舍：{current.sty}</Text>
                        <Text>监控日期：{current.date}</Text>
                        <Text>监控时段：{current.timeBegin} - {current.timeEnd}</Text>
                    </View>
                </View>
            </Content>
        </Container>);
    }
}

const styles = StyleSheet.create({
    container:{
    },
    desc:{
        backgroundColor:'#fff',
        padding:10,
    },
})