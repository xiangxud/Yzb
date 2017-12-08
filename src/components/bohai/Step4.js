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
import {Form, Item, Input, Label, Icon, } from 'native-base';
import PigRecord from '../../components/bohai/PigRecord'

@observer
class Step4 extends Component {
    removeItem=(index)=>{
        Alert.alert(
            '删除猪血清学记录？',
            '删除后不可恢复，您仍可以手工添加该记录',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确认删除', onPress: () => {
                    bohaiStore.deletePigSerumRecord(index);
                }},
            ],
            { cancelable: true }
        );
    }
    renderItem(item, i){
        return (
            <PigRecord key={i}
                       index={i}
                       item={item}
                       store={bohaiStore}
                       choosePigStage={(index)=>this.props.choosePigStage(index)}
                       remove={(index)=>this.removeItem(index)}/>
        )
    }
    render() {
        const { navigation, store } = this.props;
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row', alignItems:'center', padding:10}}>
                    <Text style={{fontSize:18, flex:1}}>猪场血清学调查</Text>
                    <TouchableOpacity onPress={()=>store.addPigSerumRecord()}>
                        <Icon name={'ios-add-circle-outline'}/>
                    </TouchableOpacity>
                </View>
                <View>
                    {store.data.pigSerumRecordList.map((item, i)=>this.renderItem(item, i))}
                </View>
            </View>
        )
    }
}
export default Step4

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
        flex:1,
    },
    required:{
        color:'red',
    },
    pdR:{
        paddingRight:20
    },
    arrow:{
        color:'#ccc',
        fontSize:14,
        width:20
    },
});