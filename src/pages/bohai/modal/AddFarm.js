/**
 * Created by TomChow on 18/03/30.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Alert,
} from 'react-native'
import {Container, Content, Footer, FooterTab, Button, List, ListItem, Body, Text, Icon, Right} from 'native-base';
//import Modal from 'react-native-modalbox';
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import {observer, inject} from 'mobx-react/native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {MaskLoading} from '../../../components';
import {ValidateInput,ValidateInputInt,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../../components/common/native-base-validate'

@inject('addFarmStore')
@observer
export default class AddFarm extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '养殖场信息',
        headerRight: <View/>
    });

    buttons=[];
    componentDidMount () {
        const {addStyStore,navigation} = this.props;
        //1、初始化数据
        addStyStore.onIni(navigation.state.params.farm);
        //2、底部菜单
        this.buttons.push({
            title:'下一步' ,
            onPress:this.next.bind(this)
        });
        /*
        var timer = setTimeout(()=> {
            this.fetchData((res) => {
                if (res === true) {
                    bohaiStore.setSales(true);
                    let animalType = this.props.navigation.state.params.type;
                    if (animalType) {
                        bohaiStore.set('animalType', animalType);
                    }
                    this._fetch();
                    bohaiStore.setFetch(false);
                } else {
                    tools.showToast('您还不是瑞普用户,不能提交申请');
                    bohaiStore.setSales(false);
                    bohaiStore.setFetch(false);
                }
            }, (err) => {
                tools.showToast(err.message);
                bohaiStore.setSales(false);
                bohaiStore.setFetch(false);
            });
        }, 200);
        */
    }
    fetchData(success, failed){
        request.getJson(urls.apis.BH_IS_SALES, {phone: userStore.phone}).then((res)=>{
            success(res);
        }).catch((err)=>{
            failed(err.message);
        });
    }

    _fetch = () => {
        if(bohaiStore.data.animalType==='家禽') {
            request.getJson(urls.apis.BH_BREEDS, null).then((res) => {
                bohaiStore.setBreeds(res);
            }).catch((err) => tools.showToast(err.message));
        }
        request.getJson(urls.apis.BH_TEST_TYPES, null).then((res)=>{
            bohaiStore.setTestItems(res);
        }).catch((err)=>tools.showToast(err.message));
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    render() {
        const { isFetching} = bohaiStore;
        return (
            <Container>
                <MaskLoading show={isFetching}/>
                <Content>
                    <Form>
                        <ValidateInput label="养殖场名称" data={farmAddStore.data} name="name" placeholder="请输入栋舍栏位" IsValidate={addStyStore.IsValidate} onChange={(e)=>{this.onUpdateData({name:e})}} />
                        <Item fixedLabel style={styles.pdR}>
                            <Label>养殖场名称<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="请输入母猪存栏数"
                                   maxLength={8}
                                   keyboardType={'numeric'}
                                   value={store.data.livestockTotalCount ? store.data.livestockTotalCount.toString() : ''}
                                   onChangeText={(text) => store.set('livestockTotalCount', text)}/>
                        </Item>

                        <Item fixedLabel style={styles.pdR}>
                            <Label>养殖场联系人<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="请输入年出栏肥猪数"
                                   maxLength={8}
                                   keyboardType={'numeric'}
                                   value={store.data.livestockYearCount ? store.data.livestockYearCount.toString() : ''}
                                   onChangeText={(text) => store.set('livestockYearCount', text)}/>
                        </Item>
                        <Item fixedLabel onPress={() => this.props.openPigBreed()}>
                            <Label>联系方式<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="请选择饲养品种" editable={false} value={store.livestockBreeds} multiline={true}/>
                            <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                        </Item>
                        <Item fixedLabel last onPress={() => this.props.openPigGender()}>
                            <Label>邮箱<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="请选择送检猪类别" editable={false} value={store.livestockGenders}/>
                            <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modal:{

    },
    modal1:{
        //height:350,
    },
    noAccess:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});