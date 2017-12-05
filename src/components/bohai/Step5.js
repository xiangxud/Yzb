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
    TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react/native'
import {Container, Content, Header, List, ListItem, Form, Item, Input, Label, Title, Body,
    Picker, Icon, Button, CheckBox, Footer} from 'native-base';

@observer
class Step5 extends Component {
    componentDidMount(){
        const { store } = this.props;
        request.getJson(urls.apis.BH_APPROVE_USERS, {phone: store.data.phoneNo, farmName: store.data.farmName}).then((res)=>{
            store.setApprovers(res);
        }).catch((err)=>{
            tools.showToast(err.message);
        });
    }
    render() {
        const { store } = this.props;
        return (
            <View style={styles.container}>
                <Form>
                    <Item fixedLabel onPress={() => this.props.chooseUser(1)}>
                        <Label>健康咨询顾问<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请选择健康咨询顾问" editable={false} value={store.data.consultantPhoneNo}/>
                        <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                    </Item>
                    <Item fixedLabel last onPress={() => this.props.chooseUser(2)}>
                        <Label>销售审批人<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请选择销售审批人" editable={false} value={store.data.salesPhoneNo}/>
                        <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                    </Item>
                </Form>
            </View>
        )
    }
}
export default Step5

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