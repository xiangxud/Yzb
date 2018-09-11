import React, {Component} from 'react';
import
{
    View,
    Text,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import {Container, Content, Root, List, ListItem, Right, Left, Button, Icon, Body, Toast} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import cameraSettingStore from '../../store/cameraSettingStore';
import FootBar from '../../components/sty/FootBar'
import CList from '../../components/sty/CameraList';
import {observable} from "mobx";
import cameraEdit from "./CameraEdit";
import noticeArgs from "../../common/noticeArgs";

@inject('styStore')
@observer
export default class setting extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: "设置",
        headerRight: <View/>
    });

    componentDidMount() {
        // this.eventHandler.addListener("noticeChangedCamera",(o)=>{
        //     if(o.name=="eventAddCamera"){
        //         this.store.onPush(o);//摄像头增加
        //     }else if(o.name == "eventEditCamera"){
        //         this.store.onUpdate(o);//摄像头编辑
        //     }
        // });
    }

    componentWillUnmount() {
        //this.eventHandler.remove();
    }

    constructor(props) {
        super(props);
        let {styStore} = this.props;
        this.store.onIni(styStore.monitor.cameras, styStore.defaultCamera, styStore.code);
    }

    @observable
    store = new cameraSettingStore();

    render() {
        return (
            <Container>
                <Content>

                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    label: {
        textAlignVertical: 'center',
        marginLeft: 5,
        fontSize: 18
    },
    headIco: {
        fontSize: 18,
        color: '#27364e'
    },
    headAction: {
        flexDirection: 'row'
    }
});