import React, {Component} from 'react';
import
{
    View,
    TextInput,
    WebView,
    Image,
    TouchableOpacity,
    StyleSheet,
    ListView,
} from 'react-native';
import {observer,inject} from 'mobx-react/native';
import {Container, Content, Button, Icon, Text} from 'native-base';

const videos =[
    {sty:'栋舍1', photo:'http://pic32.photophoto.cn/20140704/0022005589418625_b.jpg', videoName: '摄像头A', date:'2017-12-1', timeBegin: '12:00', timeEnd:'14:00'},
    {sty:'栋舍1', photo:'http://pic32.photophoto.cn/20140704/0022005589418625_b.jpg', videoName: '摄像头B', date:'2017-12-1', timeBegin: '15:00', timeEnd:'17:00'},
    {sty:'栋舍1', photo:'http://pic32.photophoto.cn/20140704/0022005589418625_b.jpg', videoName: '摄像头C', date:'2017-12-1', timeBegin: '12:00', timeEnd:'14:00'},
    {sty:'栋舍1', photo:'http://pic32.photophoto.cn/20140704/0022005589418625_b.jpg', videoName: '摄像头A', date:'2017-12-2', timeBegin: '22:00', timeEnd:'24:00'},
    {sty:'栋舍1', photo:'http://pic32.photophoto.cn/20140704/0022005589418625_b.jpg', videoName: '摄像头B', date:'2017-12-2', timeBegin: '11:00', timeEnd:'13:00'},
    {sty:'栋舍1', photo:'http://pic32.photophoto.cn/20140704/0022005589418625_b.jpg', videoName: '摄像头C', date:'2017-12-3', timeBegin: '7:00', timeEnd:'9:00'},
    {sty:'栋舍1', photo:'http://pic32.photophoto.cn/20140704/0022005589418625_b.jpg', videoName: '摄像头A', date:'2017-12-4', timeBegin: '3:00', timeEnd:'6:00'},
];
// 一些常亮设置
// 获取屏幕宽度
var Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;

const cols = 3;
const cellWidth = 100;
const cellHeight = 150;
const vMargin = (screenW - cellWidth * cols) / (cols + 1);
const hMargin = 5;

export default class Monitor extends Component{

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(videos),
        };
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '栋舍监控历史',
        headerRight: <View/>
    });
    //<Image source={{uri: v.photo}} style={styles.iconStyle}/>
    renderRow = (v) =>{
        return <TouchableOpacity onPress={()=>this.props.navigation.navigate('MonitorPlay', {video: v})}>
            <View style={styles.innerViewStyle}>
                <Icon name={'logo-youtube'} style={{fontSize:100, color:'#a7a7a7'}} />
                <Text>{v.videoName}</Text>
                <Text style={styles.sub}>日期 {v.date}</Text>
                <Text style={styles.sub}>时段 {v.timeBegin}-{v.timeEnd}</Text>
            </View>
        </TouchableOpacity>
    }

    render(){
        return (<Container>
            <Content>
                <View style={styles.container}>
                    <ListView dataSource={this.state.dataSource}
                              contentContainerStyle={styles.listViewStyle}
                              renderRow={this.renderRow}/>
                </View>
            </Content>
        </Container>);
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor:'#fff',
    },
    listViewStyle:{
        // 主轴方向
        flexDirection:'row',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center', // 必须设置,否则换行不起作用
    },

    innerViewStyle:{
        width:cellWidth,
        height:cellHeight,
        marginLeft:vMargin,
        marginTop:hMargin,
        marginBottom:hMargin,
        // 文字内容居中对齐
        alignItems:'center'
    },

    iconStyle:{
        width:100,
        height:99,
    },
    sub:{
        fontSize:12,
        color:'#6f6f6f'
    },
})