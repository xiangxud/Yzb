import React, {Component} from "react";
import {
    View,
    Alert,
    TouchableOpacity
} from "react-native";
import {
    Container,
    Content,
    Form,
    Label,
    Input,
    Text,
    Icon,
    Item,
    Button,
    Thumbnail,
    Picker,
} from "native-base";
import {NavigationActions} from 'react-navigation';
//import ImagePicker from "react-native-image-picker";
import Modal from 'react-native-modalbox';
import {observer} from "mobx-react/native";
import userStore from "../../store/userStore";
import QRCode from "react-native-qrcode";
import {MaskLoading} from '../../components';
import ChooseRegion from '../../components/common/ChooseRegion';

const photoOptions = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 1,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}
const defaultPhoto = require('../../resource/avatar.jpg');

@observer
export default class MyInfo extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = ({navigation})=>({
        headerTitle: '我的信息',
        headerRight:(
            <Button transparent full onPress={navigation.state.params?navigation.state.params.commitPress:null}>
                <Text style={{color:'#fff'}}>保存</Text>
            </Button>
        )
    });

    componentDidMount(){
        this.props.navigation.setParams({
            commitPress: this.commit
        });
        userStore.setCurrentUser();
    }

    cameraAction = () => {
        // ImagePicker.showImagePicker(photoOptions, (response) => {
        //     if (response && response.fileName && response.uri) {
        //         userStore.updateUserPhoto(response.uri, response.fileName);
        //     }
        // })
    }

    commit = () => {
        userStore.setLoading();
        const {currentUser} = userStore;
        request.postJson(urls.apis.USER_UPDATE_PROFILE, {
            id: currentUser.id,
            sex: currentUser.sex,
            name: currentUser.name,
            company: currentUser.company,
            province: currentUser.province,
            city: currentUser.city,
            district: currentUser.district,
            address: currentUser.address,
        }).then((res) => {
            userStore.setLoginUser(res);
            userStore.setLoading();
            tools.showToast("保存成功");
        }, (err)=>{
            userStore.setLoading();
            tools.showToast(err);
        })
    }
    chooseSex=(s)=>{
        userStore.setProfile('sex', s);
        this.refs.modal_sex.close();
    }
    render() {
        const {currentUser, loading} = userStore;
        return (
            <Container>
                <Content>
                    <MaskLoading show={loading}/>
                    <View style={styles.head}>
                        <TouchableOpacity activeOpacity={1} onPress={this.cameraAction}>
                            <Thumbnail square large source={currentUser.photo ? {uri: currentUser.photo} : defaultPhoto}/>
                        </TouchableOpacity>
                    </View>
                    <Form style={{backgroundColor:'#fff'}}>
                        <Item fixedLabel>
                            <Label>姓名</Label>
                            <Input placeholder="暂无姓名"
                                   value={currentUser.name}
                                   style={styles.input}
                                   onChangeText={(text) => userStore.setProfile('name', text)} />
                        </Item>
                        <Item fixedLabel>
                            <Label>手机号</Label>
                            <Input placeholder="手机号码"
                                   maxLength={11}
                                   disabled
                                   keyboardType={'phone-pad'}
                                   value={currentUser.phone}
                                   style={styles.input} />
                        </Item>
                        <Item fixedLabel>
                            <Label>性别</Label>
                            <Text style={styles.inputChoose} onPress={()=>this.refs.modal_sex.open()}>
                                {currentUser.sex||'未知'}
                            </Text>
                        </Item>
                        <Item fixedLabel last>
                            <Label>养殖场名称</Label>
                            <Input placeholder="公司名称"
                                   maxLength={120}
                                   style={styles.input}
                                   value={currentUser.company || ''}
                                   onChangeText={(text) => userStore.setProfile('company', text)} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>养殖类型</Label>
                            <Input placeholder="养殖类型"
                                   maxLength={120}
                                   disabled
                                   style={styles.input}
                                   value={currentUser.breed || ''}
                                   onChangeText={(text) => userStore.setProfile('breed', text)} />
                        </Item>
                        <Item fixedLabel>
                            <Label>所在地</Label>
                            <ChooseRegion
                                selectedProvince={'河南'}
                                selectedCity={'郑州'}
                                selectedArea={'二七区'}
                                navBtnColor={'#009D7B'}
                                onSubmit={(params) => {
                                    userStore.setProfile('province', params.province);
                                    userStore.setProfile('city', params.city);
                                    userStore.setProfile('district', params.area);
                                }}
                                onCancel={() => console.log('cancel')}>
                                <Text style={styles.inputChoose}>{userStore.addr}</Text>
                            </ChooseRegion>
                        </Item>
                        <Item fixedLabel last>
                            <Label>详细地址</Label>
                            <Input placeholder='请输入地址'
                                   maxLength={120}
                                   style={styles.input}
                                   value={currentUser.address||''}
                                   onChangeText={(text) => userStore.setProfile('address', text)} />
                        </Item>
                        <View style={styles.qrWrap}>
                            <View style={styles.qrBox}>
                                <QRCode value={userStore.phone}
                                        size={120}
                                        bgColor='#15856e'
                                        fgColor='white'/>
                            </View>
                            <Text style={{ marginTop: 10}}>我的二维码</Text>
                        </View>
                    </Form>
                    <Modal
                        coverScreen={false}
                        style={styles.modal}
                        ref={"modal_sex"}
                        position={"center"}>
                        <Button light full onPress={()=>this.chooseSex('男')}><Text>男</Text></Button>
                        <Button light full onPress={()=>this.chooseSex('女')}><Text>女</Text></Button>
                    </Modal>
                </Content>
            </Container>
        )
    }
}

const styles = {
    head: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrWrap:{
        backgroundColor: '#E3E7F3',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    qrBox:{
        width: 140,
        height: 140,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input:{
        textAlign:'right'
    },
    inputChoose:{
        paddingTop: 15,
        paddingBottom:15,
        paddingRight:5
    },
    modal:{
        height:90,
        width:260,
    },
};