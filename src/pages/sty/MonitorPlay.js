import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import {Container, Content, Button, Icon, Text} from 'native-base';
import {WebView} from '../../components'

export default class MonitorPlay extends Component{
    constructor(props){
        super(props);
        this.state= {
            current: {},
            url: urls.webPath+'yzb/monitor/play',
        };
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '监控历史查看',
        headerRight: <View/>
    });

    componentDidMount(){
        this.setState({current: this.props.navigation.state.params.video});
    }

    // changePlay = (o) =>{
    //     this.setState({current: o});
    // }

    render(){
        const {current} = this.state;
        return (<Container>
            <Content>
                <View style={styles.container}>
                    <WebView uri={this.state.url} style={{ height: 200 }} />
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