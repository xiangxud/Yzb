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
        // alert(JSON.stringify(loginUser))
        return (
            <View style={styles.myCover} onStartShouldSetResponder={() => Actions.myInfo()}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.cameraAction()}>
                    <Image style={styles.myPhoto} source={loginUser.photo ? {uri: urls.getImage(loginUser.photo, 300, 300)} : defaultPhoto}/>
                </TouchableOpacity>
                <View style={styles.myInfo}>
                    <Text style={styles.myName}>本尊：{loginUser.Name}</Text>

                    <Text style={styles.myName}>等级：100</Text>
                </View>
            </View>
        )
    }


}

const styles =  {
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
        borderRadius: 50,
    },
    myInfo: {
        marginLeft: 15
    },
    myName: {
        fontSize: 16,
    }
};