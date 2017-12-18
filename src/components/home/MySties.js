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
    Dimensions,
} from 'react-native';
import {Icon, Text, Button} from 'native-base';
import {observer} from 'mobx-react/native';
import {WebView, TitleBar} from '../';
var {height, width} = Dimensions.get('window');

const Sty = observer(({sty, getSty, isCurrent}) =>{
    return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={()=>{getSty(sty)}}>
            <View style={[styles.styBox, isCurrent? styles.currentSty: {}]}>
                <Image source={require('../../resource/sty_livestock.png')} style={{width:50, height:42}}/>
                <Text style={isCurrent?styles.currentText:{}}>{sty.name.substr(0, 5)}</Text>
            </View>
        </TouchableNativeFeedback>
    );
});

@observer
export default class MySties extends Component {
    constructor(props){
        super(props);
    }
    getSty = (sty) =>{
        const {store} = this.props;
        //alert(JSON.stringify(sty))
        store.setCurrentSty(sty);
    }
    render() {
        const {store} = this.props;
        let rd = new Date();
        return (
            <View style={styles.container}>
                <TitleBar icon={'bank'} iconColor={'red'} title={'我的栋舍'} morePress={this.props.onAddSty} rightTitle={'添加'} />
                <ScrollView horizontal={true} style={styles.stiesContainer}>
                    {/*<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.props.onAddSty}>*/}
                        {/*<View style={[styles.styBox, styles.addSty]}>*/}
                            {/*<Icon name={'ios-add-circle-outline'} style={{fontSize:40, color:'#15856e'}}/>*/}
                        {/*</View>*/}
                    {/*</TouchableNativeFeedback>*/}
                    {store.sties.map((val, key) => (
                        <Sty key={key} sty={val} getSty={this.getSty} isCurrent={store.currentSty.id===val.id}/>
                    ))}
                </ScrollView>
                {store.currentSty && store.currentSty.id?
                    <View>
                        {store.currentSty.camera_url?
                        <WebView uri={`${urls.webPath}yzb/monitor/live?url=${store.currentSty.camera_url}`} canBack={false} style={{ height:200, }} />
                            :null}
                        <WebView uri={`${urls.webPath}yzb/monitor/em?rd=${rd}`} canBack={false} style={{ height:120, }} />
                        <View style={styles.reportItems}>
                            <Text style={styles.sTitle}>栋舍湿度</Text>
                            <Text style={styles.sTitle}>栋舍温度</Text>
                            <Text style={styles.sTitle}>二氧化碳浓度</Text>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <Button block light onPress={()=>this.props.onStyPress(store.currentSty)}>
                                <Text>查看{store.currentSty.name}的详情</Text>
                            </Button>
                        </View>
                    </View>:
                    <Button block light onPress={this.props.onAddSty}>
                        <Text style={{color:'gray'}}>您当前还没有任何栋舍，赶快添加一个吧.</Text>
                    </Button>
                }
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
        height:90,
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#fff'
    },
    addSty:{
        backgroundColor:'#f9f3f9',
        justifyContent:'center',
        marginLeft:5,
    },
    styBox:{
        width:80,
        height:80,
        borderWidth:1,
        borderColor:'#e2e2e2',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        marginRight:5,
        marginTop:5,
    },
    currentSty:{
        borderColor:'#15856e',
        backgroundColor:'#15856e'
    },
    currentText:{
        color:'#fff'
    },
    tips:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:80,
        backgroundColor:'#fff'
    },
    reportItems:{
        flexDirection:'row',
        height:30,
    },
    sTitle:{
        flex:1,
        textAlign:'center'
    }
});