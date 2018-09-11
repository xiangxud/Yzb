import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    DeviceEventEmitter
} from 'react-native';
import {Container, Content, Form, ListItem, Text, Icon} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'
import {ValidateInput, ReadOnlyInput} from '../../components/common/native-base-validate'

@inject('cameraEditStore')
@observer
export default class CameraAdd extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: "添加摄像头",
        headerRight: <View/>
    });

    componentDidMount() {
        const {navigation, cameraEditStore} = this.props;
        cameraEditStore.onUpdate({StyId: navigation.state.params.styId});
    }

    onCommit() {
        const {navigation, cameraEditStore} = this.props;
        let mess = cameraEditStore.onValidate();
        if (mess.length > 0) {
            tools.showToast("输入项存在错误");
            return;
        }
        cameraEditStore.onCommit((data) => {
            cameraEditStore.onUpdate(data);
            DeviceEventEmitter.emit('noticeChangedCamera', {key: "eventAddCamera", source: cameraEditStore});

            tools.showToast("增加成功");
            navigation.goBack();
        }, (err) => {
            alert(JSON.stringify(err));
        });
    }

    onUpdateData(data) {
        const {cameraEditStore} = this.props;
        cameraEditStore.onUpdate(data);
    }

    buttons = [{
        title: '取消', default: false, onPress: () => {
            const {navigation} = this.props;
            navigation.goBack();
        }
    }, {
        title: '保存', default: true, onPress: () => {
            this.onCommit()
        }
    }];

    render() {
        const {cameraEditStore, navigation} = this.props;
        return (
            <Container style={{backgroundColor: '#ffffff'}}>
                <Content>
                    <Form>
                        <ListItem itemDivider>
                            <Icon style={style.titleIco}
                                  name="ios-book"
                                  active></Icon><Text>摄像头信息</Text>
                        </ListItem>
                        <ReadOnlyInput label="栋舍"
                                       value={navigation.state.params.styName}/>
                        <ValidateInput label="摄像头名称"
                                       data={cameraEditStore.data}
                                       name="Name"
                                       placeholder="请录入摄像头名称"
                                       IsValidate={cameraEditStore.IsValidate}
                                       onChange={(e) => {
                                           this.onUpdateData({Name: e})
                                       }}/>
                        <ValidateInput label="视频地址"
                                       data={cameraEditStore.data}
                                       IsValidate={cameraEditStore.IsValidate}
                                       name="Url"
                                       placeholder="请录入视频地址"
                                       onChange={(e) => {
                                           this.onUpdateData({Url: e})
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