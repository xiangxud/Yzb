import React, {Component} from 'react';
import
{
    View,
    Text ,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import { Container,Content,Root,List,ListItem,Right,Left,Button,Icon,Body,Toast } from 'native-base';
import {observer,inject} from 'mobx-react/native';
import cameraSettingStore from '../../store/cameraSettingStore';
import FootBar from '../../components/sty/FootBar'
import CList from '../../components/sty/CameraList';
import {observable} from "mobx";
import cameraEdit from "./camera/edit";

@inject('styStore')
@observer
export default class setting extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: "设置",
        headerRight: <View />
    });
    componentDidMount(){
        this.eventAddCameraHandler = DeviceEventEmitter.addListener('eventAddCamera',(o)=>{

            debugger;
            this.store.onPush(o);
        });
        this.eventEditCameraHandler = DeviceEventEmitter.addListener('eventEditCamera',(o)=>{
            this.store.onUpdate(o);
        });
    }

    componentWillUnmount(){
        this.eventAddCameraHandler.remove();
        this.eventEditCameraHandler.remove();
    }

    constructor(props){
        super(props);
        let {styStore,navigation} = this.props;
        this.store.onIni(styStore.monitor.cameras,navigation.state.params.code);
    }

    @observable
    store=new cameraSettingStore();

    onAdd(){
        const {navigation} = this.props;
        navigation.navigate("CameraAdd",{
            styId:navigation.state.params.code,
            styName:navigation.state.params.title});
    }

    onModify(camera){
        const {navigation} = this.props;
        navigation.navigate("CameraEdit",{ camera:camera,styName:navigation.state.params.title});
    }

    removeCamera(id){
        const {navigation} = this.props;
        this.store.onRemove(id,()=>{
            DeviceEventEmitter.emit('eventRemoveCamera',{ id : id , styId:navigation.state.params.code});
            tools.showToast('移除成功');
        },(err)=>{
            console.log(err);
            tools.showToast('移除失败：' + err);
        });
    }

    onChangedDefault(id){
        const {navigation} = this.props;
        this.store.onChangDefault(id,navigation.state.params.code,
            ()=>{},err=> tools.showToast('设置失败'));
    }

    onRemove(id){
        Alert.alert(
            '温馨提示',
            '即将删除该摄像头，是否继续？',
            [
                {text: '取消',onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '继续',onPress: () => this.removeCamera(id)},
            ],
            { cancelable: true }
        )
    }

    render(){
        return (
                <Container>
                    <Content>
                        <ListItem itemDivider icon>
                            <Left>
                                <Text style={style.label}>摄像头</Text></Left>
                            <Body>
                            </Body>
                            <Right>
                                <TouchableOpacity style={style.headAction} onPress={this.onAdd.bind(this)}>
                                    <Icon name="md-add" style={style.headIco} />
                                    <Text style={style.label}>添加</Text>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                        <CList list={this.store.list}
                               defaultId={this.store.defaultId}
                               onChanged={this.onChangedDefault.bind(this)}
                               onModify={this.onModify.bind(this)}
                               onRemove={this.onRemove.bind(this)}>
                        </CList>
                    </Content>
                </Container>
        );
    }
}

const style = StyleSheet.create({
    label:{
        textAlignVertical:'center',
        marginLeft:5,
        fontSize:18
    },
    headIco:{
        fontSize:18,
        color:'#27364e'
    },
    headAction:{
        flexDirection:'row'
    }
});