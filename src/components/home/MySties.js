/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import {Icon} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import TitleBar from '../common/TitleBar';

var {height, width} = Dimensions.get('window');

const Sty = ({sty, getSty, isCurrent}) =>{
    return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={()=>{getSty(sty)}}>
            <View style={[styles.styBox, isCurrent? styles.currentSty: {}]}>
                <Icon name={'ios-keypad'+(!sty.total?'-outline':'')} style={isCurrent?styles.currentText:{color:'#8b8b8b'}} />
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
                <View style={{}}>
                    <View style={{flex:1, height:300, backgroundColor:'#efc'}}>
                        <View style={{height:100, backgroundColor:'#fae4ac'}}>
                            <Image source={require('../../resource/video.jpg')} style={{height:100, width: width}}/>
                        </View>
                        <View style={{height:200, backgroundColor:'#f9f3f9', marginTop:1}}>
                            <Text>
                                栋舍温度：13
                                栋舍湿度：23
                                二氧化碳：32
                            </Text>
                            <Text onPress={()=>this.props.onStyPress(homeStore.currentSty)} style={{
                                backgroundColor:'yellow',
                                textAlignVertical:'center',
                                width:60,
                            }}>栋舍详情</Text>
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
    }
});