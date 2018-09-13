import React, {Component} from 'react';
import {StyleSheet, DeviceEventEmitter} from 'react-native';
import {Container, Content, Form, Icon, View, ListItem, Text, Toast} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar';
import {
    ValidateInput,
    ValidateInputInt,
    ValidateInputDate,
    ValidateChooseItem,
    ReadOnlyInput
} from '../../components/common/native-base-validate'

@inject('styAddStore')
@observer
export default class StyAdd extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '添加栋舍',
        headerRight: <View/>
    });

    constructor(props) {
        super(props);
    }

    getGenus() {
        const {styAddStore} = this.props;
        let options = [];
        styAddStore.genus.forEach((o) => {
            options.push(o.Code);
        });
        return options;
    }

    buttons = [];

    componentWillMount() {
        const {styAddStore, navigation} = this.props;
        //1、初始化数据
        styAddStore.onIni(navigation.state.params.farm);
        //2、底部菜单
        this.buttons.push({
            title: '下一步',
            onPress: this.next.bind(this)
        });
    }

    autoClose(callback) {
        setTimeout(() => {
            Toast.toastInstance._root.closeToast();
            if (callback) {
                callback();
            }
        }, 1800);
    }

    onStyPress(data) {
        const {navigation} = this.props;
        /*let {Stys, StyId} = data;
        let list = [];
        Stys.forEach((item) => {
            list.push({
                code: item.value,
                title: item.title
            });
        });

        navigation.navigate("Sty", {code: StyId, list: list, farm: navigation.state.params.farm});
        */
        DeviceEventEmitter.emit('noticeChangedCamera', {key: 'styAdded'});
        navigation.goBack();
    }

    next() {
        const {styAddStore} = this.props;
        let mess = styAddStore.onValidate();
        if (mess.length > 0) {
            tools.showToast("数据项存在错误，请更正");
            // Toast.show({
            //     type:'warning',
            //     text: '数据项存在错误，请更正',
            //     position: 'top'
            // });
            //this.autoClose();
            return;
        }
        styAddStore.onCommit((data) => {
            tools.showToast("保存成功");
            this.onStyPress(data);
            // Toast.show({
            //     type:'success',
            //     text: '保存成功',
            //     position: 'top'
            // })
            // this.autoClose(()=>{
            //     this.onStyPress(data)
            // });
        }, (err) => {
            Toast.show({
                type: 'danger',
                text: '产生错误:' + err,
                position: 'top'
            })
            this.autoClose();
        });
    }

    onUpdateData(u) {
        const {styAddStore} = this.props;
        styAddStore.onChangedSty(u);
    }

    render() {
        const {styAddStore} = this.props;
        return (
            <Container style={{backgroundColor: '#ffffff'}}>
                <Content>
                    <Form>
                        <ListItem itemDivider>
                            <Icon style={style.titleIco} name="ios-book" active></Icon><Text>第1步.添加一个栋舍</Text>
                        </ListItem>
                        <ReadOnlyInput label="养殖场" value={styAddStore.farm.Name}/>
                        <ValidateInput label="栋舍栏位" data={styAddStore.data} name="name" placeholder="请输入栋舍栏位"
                                       IsValidate={styAddStore.IsValidate} onChange={(e) => {
                            this.onUpdateData({name: e})
                        }}/>
                        <ValidateChooseItem label="种属" data={styAddStore.data} name="genus"
                                            IsValidate={styAddStore.IsValidate} getOptions={this.getGenus.bind(this)}
                                            optionslabel="请选择种属" placeholder="请选择" onChange={(e) => {
                            this.onUpdateData({genus: e})
                        }}/>
                        <ValidateInputInt label="当前日龄" data={styAddStore.data} name="day" placeholder="如 20"
                                          IsValidate={styAddStore.IsValidate} onChange={(e) => {
                            this.onUpdateData({day: e})
                        }}/>
                        <ValidateInput label="入栏批次" data={styAddStore.data} name="batchNumber" placeholder="动物批次"
                                       onChange={(e) => {
                                           this.onUpdateData({batchNumber: e})
                                       }}/>
                        <ValidateInputInt label="进栏数量" data={styAddStore.data} name="number" placeholder="进栏数量"
                                          IsValidate={styAddStore.IsValidate} onChange={(e) => {
                            this.onUpdateData({number: e})
                        }}/>
                        <ValidateInputDate label="进栏日期" data={styAddStore.data} name="addDate" placeholder="进栏日期"
                                           IsValidate={styAddStore.IsValidate} onChange={(e) => {
                            this.onUpdateData({addDate: e})
                        }}/>
                        <ValidateInput label="设备号" data={styAddStore.data} name="equNum"
                                       IsValidate={styAddStore.IsValidate} placeholder="请输入物联网设备号" onChange={(e) => {
                            this.onUpdateData({equNum: e})
                        }}/>
                    </Form>
                </Content>
                <FootBar buttons={this.buttons}></FootBar>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    titleIco: {
        color: '#009688',
        paddingRight: 5
    }
});