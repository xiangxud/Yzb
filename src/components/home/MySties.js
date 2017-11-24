/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import CommonStyles from '../../styles'
import {observer, inject} from 'mobx-react/native'
import TitleBar from '../common/TitleBar';
var {height, width} = Dimensions.get('window');
const Sty = ({sty, getSty, isCurrent}) =>{
    return (
        <TouchableHighlight onPress={()=>{getSty(sty)}} style={[styles.styBox, isCurrent? styles.current: {}]}>
            <Text>{sty.name}</Text>
        </TouchableHighlight>
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
                    <View style={[styles.styBox, styles.addSty]}>
                        <Text style={{fontSize:18,}}>添加栋舍</Text>
                    </View>
                    {sties.map((val, key) => (
                        <Sty key={key} sty={val} getSty={this.getSty} isCurrent={currentSty.id===val.id}/>
                    ))}
                </ScrollView>
                <View>
                    <View style={{flex:1, height:300, backgroundColor:'#efc'}}>
                        <View style={{height:100, backgroundColor:'#fae4ac'}}>
                            <Text>{homeStore.currentSty.genus}</Text>
                        </View>
                        <View style={{height:199, backgroundColor:'#f9f3f9', marginTop:1}}>
                            <Text onPress={()=>this.props.onStyPress(homeStore.currentSty)} style={{
                                height:60,
                                backgroundColor:'yellow',
                                width:60,
                                textAlignVertical:'center'
                            }}>详情</Text>
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
        backgroundColor:'#ffa'
    },
    addSty:{
        backgroundColor:'#ff0',
    },
    styBox:{
        width:70,
        height:70,
        borderWidth:1,
        borderColor:'#FAFAFA',
        justifyContent:'center',
        alignItems:'center',
    },
    current:{
        backgroundColor:'red'
    }
});