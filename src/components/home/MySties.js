/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TouchableNativeFeedback,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import {Icon, Text, Button} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import TitleBar from '../common/TitleBar';

var {height, width} = Dimensions.get('window');

const Sty = ({sty, getSty, isCurrent}) =>{
    return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={()=>{getSty(sty)}}>
            <View style={[styles.styBox, isCurrent? styles.currentSty: {}]}>
                <Icon name={'ios-keypad'+(!sty.total?'-outline':'')} style={isCurrent?styles.currentText:{color:'#15856e'}} />
                <Text style={isCurrent?styles.currentText:{}}>{sty.name.substr(0, 6)}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}
@inject('homeStore')
@observer
export default class MySties extends Component {
    constructor(props){
        super(props);
    }
    getSty = (sty) =>{
        homeStore.setCurrentSty(sty);
    }
    render() {
        const {sties, currentSty} = homeStore;
        return (
            <View style={styles.container}>
                <TitleBar icon={'bank'} iconColor={'red'} title={'我的栋舍'} />
                <ScrollView horizontal={true} style={styles.stiesContainer}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.props.onAddSty}>
                        <View style={[styles.styBox, styles.addSty]}>
                            <Icon name={'ios-add-circle-outline'} style={{fontSize:40, color:'#15856e'}}/>
                        </View>
                    </TouchableNativeFeedback>
                    {sties.map((val, key) => (
                        <Sty key={key} sty={val} getSty={this.getSty} isCurrent={currentSty.id===val.id}/>
                    ))}
                </ScrollView>
                <View style={{backgroundColor:'#efc'}}>
                    <View style={{flexDirection:'row', height:100, backgroundColor:'#fae4ac'}}>
                        <View style={styles.video}>
                            <Text>监控视频001</Text>
                        </View>
                        <View style={styles.video}>
                            <Text>监控视频002</Text>
                        </View>
                        <View style={styles.video}>
                            <Text>监控视频003</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#f9f3f9', marginTop:1}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.reportItems}>
                                <Text>栋舍湿度</Text>
                                <Text><Text style={[styles.report, {color:'red'}]}>84</Text> %rh</Text>
                            </View>
                            <View style={styles.reportItems}>
                                <Text>栋舍温度</Text>
                                <Text><Text style={styles.report}>25</Text> ℃</Text>
                            </View>
                            <View style={styles.reportItems}>
                                <Text>二氧化碳浓度</Text>
                                <Text><Text style={styles.report}>0.08</Text> %</Text>
                            </View>
                            <View style={styles.reportItems}>
                                <Button rounded light onPress={()=>this.props.onStyPress(homeStore.currentSty)}><Text>栋舍详情...</Text></Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
    },
    stiesContainer:{
        width: width,
        height:70,
        marginBottom:5,
        backgroundColor:'#fff'
    },
    addSty:{
        backgroundColor:'#f9f3f9',
        justifyContent:'center',
        marginLeft:5,
    },
    styBox:{
        width:70,
        height:70,
        borderWidth:1,
        borderColor:'#e2e2e2',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        marginRight:5,
    },
    currentSty:{
        borderColor:'#15856e',
        backgroundColor:'#15856e'
    },
    currentText:{
        color:'#fff'
    },
    video:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        backgroundColor:'#ccc'
    },
    reportItems:{
        flex:1,
        height:70,
        justifyContent:'center',
        alignItems:'center'
    },
    report:{
        fontSize:30,
        fontWeight:'bold',
        color:'#15856e'
    },
});