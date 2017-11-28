import React, {Component} from "react";
import {TouchableOpacity, Image} from "react-native";
import {Thumbnail, Text, View} from "native-base";
//import ImagePicker from "react-native-image-picker";
import {observer, inject} from "mobx-react/native";

const photoOptions = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}
const defaultPhoto = require('../../resource/avatar.jpg');

@inject('userStore')
@observer
export default class MyPhoto extends Component {

    cameraAction = () => {
        // ImagePicker.showImagePicker(photoOptions, (response) => {
        //     if (response && response.fileName && response.uri) {
        //         this.props.store.userStore.updateUserPhoto(response.uri, response.fileName);
        //     }
        // })
    }

    render() {
        const {loginUser} = this.props.userStore;
        return (
            <View style={styles.myCover}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.cameraAction()}>
                    <Image style={styles.myPhoto} source={loginUser.photo ? {uri: loginUser.photo} : defaultPhoto}/>
                </TouchableOpacity>
                <View style={styles.myInfo}>
                    <Text style={[styles.myName, {fontSize:18, color:'#15856e'}]}>{loginUser.name}</Text>
                    <Text style={[styles.myName, styles.gray]}>手机：{loginUser.phone}</Text>
                    <Text style={[styles.myName, styles.gray]}>公司：{loginUser.company}</Text>
                </View>
            </View>
        )
    }
}

const styles =  {
    myCover: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 15,
        marginBottom: 20
    },
    myPhoto: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    myInfo: {
        marginLeft: 15
    },
    myName: {
        fontSize: 16,
    },
    gray:{
        color:'#777'
    }
};