import React, {Component} from "react";

import {Alert, Image, ScrollView, TextInput, TouchableOpacity} from "react-native";
import {Body, Button, Icon, Left, Text, ListItem, Right, View} from "native-base";
//import ImagePicker from "react-native-image-picker";
import {observer} from "mobx-react/native";
import userStore from "../../store/userStore";
import QRCode from "react-native-qrcode";
import DatePicker from "react-native-datepicker";
//import dynamicStore from "../../mobx/dynamicStore";
import {NavigationActions} from 'react-navigation';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
//import WomanChoose from "../login/components/WomanChoose";

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
    constructor() {
        super()
        this.state = {
            date: userStore.loginUser.birthday,
            sexPickerVisible: false,
            sex: userStore.loginUser.sex === 1 ? '男' : '女',
            nickname: userStore.loginUser.nickname,
            signname: userStore.loginUser.signname,
            crowdname: userStore.loginUser.crowdname,
        }
    }

    static navigationOptions = ({navigation})=>({
        headerTitle: '我的信息',
        headerRight:(
            <Text onPress={navigation.state.params?navigation.state.params.commitPress:null} style={{padding:5, color:'#fff'}}>

            </Text>
        )
    });

    componentDidMount(){
        this.props.navigation.setParams({
            commitPress: this.commit
        })
    }

    cameraAction = () => {
        // ImagePicker.showImagePicker(photoOptions, (response) => {
        //     if (response && response.fileName && response.uri) {
        //         userStore.updateUserPhoto(response.uri, response.fileName);
        //     }
        // })
    }

    // quitAlert() {
    //     let {realm} = dynamicStore;
    //     Alert.alert('提示信息', '确定要退出吗？', [
    //         {text: '取消'},
    //         {
    //             text: '确定', onPress: () => {
    //             realm.write(() => {
    //                 let Dynamic = realm.objects('Dynamic');
    //                 realm.delete(Dynamic);
    //             });
    //             this.quit()
    //         }
    //         },
    //     ])
    // }

    quit = () => {
        Alert.alert(
            '您确认要注销登录吗？',
            '注销后将退出系统，您需要重新登录后才能正常访问。',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确认注销', onPress: () => {
                    if(userStore.logout()){
                        let resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Login', params: { token: null }})
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
                    }else{
                        alert('Error');
                    }
                }},
            ],
            { cancelable: false }
        )
    }

    onSexPress() {
        //this.refs.sexPicker.show()
    }

    commit = () => {
        tools.showToast("保存成功")
        return;
        request.postJson(urls.apis.USER_SETUSERBASEINFO, {
            phone: userStore.loginUser.phone,
            sex: userStore.loginUser.sex,
            birthday: this.state.date,
            nickname: this.state.nickname,
            signname: this.state.signname,
            crowd: this.state.crowdname
        }).then(res => {
            // alert(JSON.stringify(res))
            if (res.ok) {
                tools.showToast("保存成功")
                request.getJson(urls.apis.USER_GETLOGINUSER)
                    .then((data) => {
                        if (data.ok) {
                            userStore.loginUser = data.obj
                            Actions.pop()
                        }
                    });
            }
        })
    }

    /*<View style={styles.row}>
        <Text>性别</Text>
        <Text>{loginUser.sex === 1 ? '男' : '女'}</Text>
    </View>
    <View style={styles.row}>
        <Text>出生日期</Text>
        <DatePicker
            style={{width: 100}}
            date={this.state.date}
            showIcon={false}
            mode="date"
            placeholder={loginUser.birthday}
            format="YYYY-MM-DD"
            confirmBtnText="确定"
            cancelBtnText="取消"
            customStyles={{
                dateInput: {borderWidth: 0, flexDirection: 'row', justifyContent: 'flex-end'},
                dateText: {color: "#666", fontSize: 16},
                placeholderText: {color: "#666", fontSize: 16}
            }}
            onDateChange={(date) => {
                this.setState({date: date})
            }}
        />
    </View>*/
    render() {
        const {loginUser} = userStore;
        return (

            <KeyboardAwareScrollView style={{flex:1,backgroundColor: '#fff'}}>
                <ScrollView contentContainerStyle={{backgroundColor: '#E3E7F3'}}>
                    <View style={{height: 120, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity activeOpacity={1} onPress={this.cameraAction}>
                            <Image style={styles.myPhoto}
                                   source={loginUser.photo ? {uri: loginUser.photo} : defaultPhoto}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Text>昵称</Text>
                        <TextInput
                            style={{textAlign: 'right', flex: 1, padding: 0}}
                            underlineColorAndroid='transparent'
                            maxLength={12}
                            placeholder={loginUser.nick || loginUser.name}
                            onChangeText={(value) => {
                                this.setState({nick: value})
                            }}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text>手机</Text>
                        <TextInput
                            style={{textAlign: 'right', flex: 1, padding: 0}}
                            underlineColorAndroid='transparent'
                            maxLength={120}
                            placeholder={loginUser.phone || ''}
                            onChangeText={(value) => {
                                this.setState({phone: value})
                            }}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text>公司名称</Text>
                        <TextInput
                            style={{textAlign: 'right', flex: 1, padding: 0}}
                            underlineColorAndroid='transparent'
                            maxLength={120}
                            placeholder={loginUser.company || ''}
                            onChangeText={(value) => {
                                this.setState({company: value})
                            }}
                        />
                    </View>

                    <View style={{
                        backgroundColor: '#E3E7F3',
                        paddingTop: 10,
                        paddingBottom: 10,
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 140,
                            height: 140,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <QRCode
                                value={userStore.phone}
                                size={120}
                                bgColor='#15856e'
                                fgColor='white'/>
                        </View>
                        <Text style={{ marginTop: 10}}>我的二维码</Text>
                    </View>
                    <Button rounded danger block style={styles.logoutBtn} onPress={()=>this.quit()}>
                        <Text style={{color: '#fff'}}>退出登录</Text>
                    </Button>
                </ScrollView>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    myCover: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3E7F3',
        padding: 15,
        marginTop: 15,
        marginBottom: 30
    },
    myPhoto: {
        width: 100,
        height: 100,
    },
    myInfo: {
        marginLeft: 15
    },
    myName: {
        fontSize: 16,
    },
    logoutBtn:{
        marginLeft:50,
        marginRight:50,
        marginTop: 10,
        marginBottom: 10,
    }
};