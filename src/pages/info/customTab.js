'use strict';

import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    LayoutAnimation,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    View,
    Alert,
    NativeModules,
    YellowBox
} from 'react-native';
import tools from "../../common/tools";
import {Icon} from 'native-base';

//获取屏幕宽高
let { width, height } = Dimensions.get('window');
let boxWidth = (width - 10) / 4 - 10;
let boxHeight = (width - 10) / 8 - 10;
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class CustomTab extends Component {
    constructor(props) {
        super(props);

        let {items,sourceItems} = this.props;



        this._width = width / 4;
        this.topIndex = 0;
        this.leftIndex = 0;
        this.index = 0;
        this.finalTopIndex = 0;
        this.finalLeftIndex = 0;
        this.finalIndex = 0;
        this.prev_left = 0;
        this.prev_top = 0;
        this.left = 0;
        this.top = 0;

        this.barHeight=40;//qzwang
        this._marginTop=10;//qzwang
        this._borderTopWidth=1;//qzwang
        this.offset = this.barHeight + this._marginTop + this._borderTopWidth; //偏移

        //this.boxsPlanHeight =  (this._width / 2) +  boxHeight;
        this.items = items;
        this.sourceItems=sourceItems;
        this.state = {};
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dx !== 0 || gestureState.dy !== 0;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                const { pageX, pageY } = evt.nativeEvent;
                this.topIndex = Math.floor((pageY - this.offset) / (this._width / 2)) - 1;//qzwang 这里应该减法减1
                this.leftIndex = Math.floor(pageX / this._width);
                this.index = this.topIndex * 4 + this.leftIndex;
                this.prev_left = this._width * this.leftIndex;
                this.prev_top = this._width / 2 * this.topIndex;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (this.index >= 0 && this.index < this.items.length ) {
                    this.left = this.prev_left + gestureState.dx;
                    this.top = this.prev_top + gestureState.dy;
                    let box = this.refs[this.items[this.index].id];
                    box.setNativeProps({
                        style: { top: this.top, left: this.left }
                    });
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if(this.index <0 || this.index >= this.items.length){
                    this.forceUpdate();
                    return;
                }
                if (this.index >= 0) {
                    const { pageX, pageY } = evt.nativeEvent;
                    this.finalTopIndex = Math.floor((pageY - this.offset) / (this._width / 2)) -1;
                    this.finalLeftIndex = Math.floor(pageX / this._width);
                    let index = this.finalTopIndex * 4 + this.finalLeftIndex;
                    this.prev_left = this._width * this.finalTopIndex;
                    this.prev_top = this._width / 2 * this.finalTopIndex;

                    tools.showToast(JSON.stringify({ index : index , my : this.index }));

                    if (index >= 0 && index < this.items.length && this.items[index]) {
                        if (index > this.index) {
                            this.moveBack(this.index,index);
                        } else if (index < this.index) {
                            this.moveForward(this.index,index);
                        }else{
                            this.delteBox(index);//删除
                        }
                    } else {
                        //移出范围，则重新回到原始位置
                        let box1 = this.refs[this.items[this.index].id];
                        let top1 = Math.floor(this.index / 4) * (this._width / 2);
                        let left1 = (this.index % 4) * this._width;
                        LayoutAnimation.linear();
                        box1.setNativeProps({
                            style: {
                                top: top1,
                                left: left1
                            }
                        });
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); //系统自带
                    }
                }
            },
            onShouldBlockNativeResponder: (event, gestureState) => true
        });
    }

    moveForward = function(sourceIndex,targetIndex){
        //往前移动
        for (let i = sourceIndex; i > targetIndex; i--) {
            let box2 = this.refs[this.items[i - 1].id];
            let top2 = Math.floor(i / 4) * (this._width / 2);
            let left2 = (i % 4) * this._width;
            //LayoutAnimation.linear();
            LayoutAnimation.configureNext(
                LayoutAnimation.create(
                    200,
                    LayoutAnimation.Types.linear,
                    LayoutAnimation.Properties.scaleXY
                )
            );
            box2.setNativeProps({
                style: {
                    top: top2,
                    left: left2
                }
            });
        }
        let box1 = this.refs[this.items[sourceIndex].id];
        let top1 = Math.floor(targetIndex / 4) * (this._width / 2);
        let left1 = (targetIndex % 4) * this._width;

        box1.setNativeProps({
            style: {
                top: top1,
                left: left1
            }
        });
        let temp = this.items[sourceIndex];
        for (let i = sourceIndex; i > targetIndex; i--) {
            this.items[i] = this.items[i - 1];
        }
        this.items[targetIndex] = temp;
    }
    moveBack = function(sourceIndex,targetIndex){
        for (let i = sourceIndex; i < targetIndex; i++) {
            let box2 = this.refs[this.items[i + 1].id];
            let top2 = Math.floor(i / 4) * (this._width / 2);
            let left2 = (i % 4) * this._width;
            //LayoutAnimation.linear();
            LayoutAnimation.configureNext(
                LayoutAnimation.create(
                    200,
                    LayoutAnimation.Types.linear,
                    LayoutAnimation.Properties.scaleXY
                )
            );
            box2.setNativeProps({
                style: {
                    top: top2,
                    left: left2
                }
            });
        }
        let box1 = this.refs[this.items[sourceIndex].id];
        let top1 = Math.floor(targetIndex / 4) * (this._width / 2);
        let left1 = (targetIndex % 4) * this._width;

        box1.setNativeProps({
            style: {
                top: top1,
                left: left1
            }
        });
        let temp = this.items[sourceIndex];
        for (let i = sourceIndex; i < targetIndex; i++) {
            this.items[i] = this.items[i + 1];
        }
        this.items[targetIndex] = temp;
    }
    delteBox = function(index){
        if(this.items.length==1)
        {
            tools.showToast("必须保留至少一个栏目");
            return;
        }
        if( index <0 || index >= this.items.length ){
            tools.showToast("应用出错");
            return;
        }
        //1、移除
        let item = this.items[index];
        this.items.removeItem(o=>o.id==item.id);
        //2、增加
        this.sourceItems.removeItem(o=>o.id==item.id);
        this.sourceItems.push(item);
        //3、重新刷新
        this.forceUpdate();
    }
    onAddTab=function(item){
        this.items.push(item);
        this.sourceItems.removeItem(o=>o.id==item.id);
        this.forceUpdate();
    }
    renderSource=function(){
        return this.sourceItems.map((item, index) => {
            let top =  Math.floor(index / 4) * (this._width / 2);
            let left = (index % 4) * this._width;

            return (
                <TouchableOpacity
                    onPress={()=>{ this.onAddTab(item) }}
                    key={'' + item.id}
                    style={[componentStyles.touchBox, { top, left }]}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: (width - 10) / 4 - 10,
                            height: (width - 10) / 8 - 10,
                            backgroundColor: '#f3f3f3',
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: '#f3f3f3'}}>
                        <Text style={{color: '#5c5c5c'}}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
    }
    renderBoxs=function(){
        //alert(JSON.stringify(this.items));


        return this.items.map((item, index) => {
            let top = Math.floor(index / 4) * (this._width / 2);
            let left = (index % 4) * this._width;

            return (
                <View
                    ref={'' + item.id}
                    {...this._panResponder.panHandlers}
                    key={'' + item.id}
                    style={[componentStyles.touchBox, { top, left }]}
                >
                    <TouchableOpacity onPress={()=>{ this.delteBox(item.id) }} style={componentStyles.closeButton}  underlayColor={'#f9f3f9'}>
                        <Icon name='ios-close' style={{ color:'#ffffff',textAlign:'center', fontSize:15 }} />
                    </TouchableOpacity>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: (width - 10) / 4 - 10,
                            height: (width - 10) / 8 - 10,
                            backgroundColor: '#f3f3f3',
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: '#f3f3f3'}}>
                        <Text style={{ color: index > 0 ? '#5c5c5c' : '#ff0000' }}>{item.name}</Text>
                    </View>
                </View>
            );
        });
    }
    render() {
        const boxes = this.renderBoxs();
        const sourceBoxs = this.renderSource();

        let {style,ref,...props} = this.props;
        if(!style){
            style={};
        }
        if(!(style instanceof Array)){
            style=[style];
        }

        return (
            <View style={[componentStyles.container,...style]}>
                <View style={[componentStyles.crossBar,{height: this.barHeight,borderBottomWidth:this._borderTopWidth}]}>
                    <Text>拖拽排序，轻触添加或删除栏目</Text>
                </View>
                <View style={[componentStyles.plan,{marginTop: this._marginTop}]}>
                    {boxes}
                </View>
                <View style={componentStyles.sourcePlan}>
                    <View style={[componentStyles.crossBar,{height: this.barHeight,borderBottomWidth:this._borderTopWidth}]}>
                        <Text>全部栏目</Text>
                    </View>
                    <View style={[componentStyles.sourceBoxs,{marginTop: this._marginTop}]}>
                        {sourceBoxs}
                    </View>
                </View>
            </View>
        );
    }
}

const componentStyles = StyleSheet.create({
    touchBox: {
        width: boxWidth,
        height: boxHeight,
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex:888
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    crossBar:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingLeft:10,
        alignItems:'center',
        borderBottomColor:'#969696'
    },
    plan:{

        width: width,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 10
    },
    sourcePlan:{
        flex:1,
        top: 200,
    },
    sourceBoxs:{
        flexDirection: 'column',
        width: width,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        flex:1
    },
    closeButton:{
        height:20,
        width:20,
        backgroundColor:'#CDC9C9',
        borderRadius:10,
        position:'absolute',
        top:1,
        right:1,
        zIndex:9999999,
    },
    bottomBar:{
        height:50
    }
});