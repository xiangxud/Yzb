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
import {observer, inject} from 'mobx-react/native'
import { Icon } from 'native-base';
import CheckItem from './CheckItem';

//@inject('bohaiStore')
@observer
class Step3 extends Component {
    chooseBig = (index) => {
        this.props.chooseBig(index);
    }

    chooseSub = (index) => {
        //alert('选择小项目')
        this.props.chooseSub(index);
    }

    choosePart = (index) => {
        //alert('选择样品部位')
        this.props.choosePart(index);
    }
    removeItem=(index)=>{
        Alert.alert(
            '删除检测项目？',
            '删除后不可恢复，您仍可以手工添加该项目',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确认删除', onPress: () => {
                    bohaiStore.deleteTestItem(index);
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
                       chooseBig={this.chooseBig}
                       chooseSub={this.chooseSub}
                       choosePart={this.choosePart}
                       remove={this.removeItem}/>
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