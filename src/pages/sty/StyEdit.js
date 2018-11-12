import React, {Component} from 'react';
import {
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';
import {Container, Header, Content, Form, Separator, Icon, View, ListItem, Text, Toast} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'
import {
    ValidateInput,
    ValidateInputInt,
    ValidateInputDate,
    ValidateChooseItem,
    ReadOnlyInput
} from '../../components/common/native-base-validate'

@inject('styEditStore')
@observer
export default class StyEdit extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '编辑栋舍',
        headerRight: <View/>
    });

    constructor(props) {
        super(props);
    }

    getGenus() {
        const {styEditStore} = this.props;
        let options = [];
        styEditStore.genus.forEach((o) => {
            options.push(o.Code);
        });
        return options;
    }

    buttons = [];

    componentWillMount() {
        const {styEditStore, navigation} = this.props;
        //1、初始化数据
        styEditStore.onEditInit(navigation.state.params.id, navigation.state.params.farm);
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
        /*
        let {Stys, Id} = data;
        let list = [];
        Stys.forEach((item) => {
            list.push({
                code: item.value,
                title: item.title
            });
        });*/
        DeviceEventEmitter.emit('noticeChangedCamera', {key: 'styEdit'});
        navigation.goBack();
        //navigation.navigate("Sty", {id: Id, list: list, farm: navigation.state.params.farm});
    }

    next() {
        const {styEditStore} = this.props;
        let mess = styEditStore.onValidate();
        if (mess.length > 0) {
            Toast.show({
                type: 'warning',
                text: '数据项存在错误，请更正',
                position: 'top'
            });
            this.autoClose();
            return;
        }
        styEditStore.onUpdateSty((data) => {
            Toast.show({
                type: 'success',
                text: '保存成功',
                position: 'top'
            })
            this.autoClose(() => {
                this.onStyPress(data)
            });
        }, (err) => {
            Toast.show({
                type: 'danger',
                text: '系统错误:' + err,
                position: 'top'
            })
            this.autoClose();
        });
    }

    onUpdateData(u) {
        const {styEditStore} = this.props;
        styEditStore.onChangedSty(u, data => {
        }, err => {
        });
    }

    render() {
        const {styEditStore} = this.props;
        return (
            <Container style={{backgroundColor: '#ffffff'}}>
                <Content>
                    <Form>
                        <ListItem itemDivider>
                            <Icon style={style.titleIco} name="ios-book" active></Icon><Text>编辑栋舍</Text>
                        </ListItem>
                        <ReadOnlyInput label="养殖场" value={styEditStore.farm.Name}/>
                        <ValidateInput label="栋舍栏位" data={styEditStore.data} name="name"
                                       IsValidate={styEditStore.IsValidate} placeholder="请输入栋舍栏位" onChange={(e) => {
                            this.onUpdateData({name: e})
                        }}/>
                        <ValidateChooseItem label="种属" data={styEditStore.data} name="genus"
                                            IsValidate={styEditStore.IsValidate} getOptions={this.getGenus.bind(this)}
                                            optionslabel="请选择种属" placeholder="请选择" onChange={(e) => {
                            this.onUpdateData({genus: e})
                        }}/>
                        <ValidateInputInt label="日龄" data={styEditStore.data} name="day"
                                          IsValidate={styEditStore.IsValidate} placeholder="如 20" onChange={(e) => {
                            this.onUpdateData({day: e})
                        }}/>
                        <ValidateInput label="入栏批次" data={styEditStore.data} name="batchNumber" placeholder="动物批次"
                                       onChange={(e) => {
                                           this.onUpdateData({batchNumber: e})
                                       }}/>
                        <ValidateInputInt label="数量" data={styEditStore.data} name="number"
                                          IsValidate={styEditStore.IsValidate} placeholder="进栏数量" onChange={(e) => {
                            this.onUpdateData({number: e})
                        }}/>
                        <ValidateInputDate label="进栏日期" data={styEditStore.data} name="addDate"
                                           IsValidate={styEditStore.IsValidate} placeholder="进雏" onChange={(e) => {
                            this.onUpdateData({addDate: e})
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