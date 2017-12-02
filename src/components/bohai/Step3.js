/**
 * Created by TomChow on 17/11/28.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {observer} from 'mobx-react/native'
import {Container, Content, Header, List, ListItem, Form, Item, Input, Label, Title, Body,
    Picker, Icon, Button, CheckBox, Footer} from 'native-base';
import CheckItem from './CheckItem';

@observer
class Step3 extends Component {

    chooseBig(){
        alert('选择大项目')
    }

    chooseSub(){
        alert('选择小项目')
    }

    choosePart(){
        alert('选择样品部位')
    }
    remove=(item)=>{
        Alert.alert(
            '您确认要删除该检测项目吗？',
            '删除后不可恢复，您仍可以手工添加该项目',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确认删除', onPress: () => {
                    bohaiStore.deleteTestItem(item);
                }},
            ],
            { cancelable: true }
        );
    }
    renderItem(item, i){
        return (
            <CheckItem key={i}
                       index={i}
                       item={item}
                       store={bohaiStore}
                       chooseBig={()=>this.chooseBig()}
                       chooseSub={()=>this.chooseSub()}
                       choosePart={()=>this.choosePart()}
                       remove={(item)=>this.remove(item)}/>
        )
    }
    render() {
        const { store } = this.props;
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row', alignItems:'center', padding:10}}>
                    <Text style={{fontSize:18, flex:1}}>检测样品信息</Text>
                    <TouchableOpacity onPress={()=>store.addTestItem()}>
                        <Icon name={'ios-add-circle-outline'}/>
                    </TouchableOpacity>
                </View>
                <View>
                    {bohaiStore.data.testingSamplingList.map((item, i)=>this.renderItem(item, i))}
                </View>
            </View>
        )
    }
}
export default Step3

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
        flex:1,
    },
});