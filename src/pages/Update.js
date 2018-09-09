import {
    AsyncStorage,
    FlatList,
    Image,
    StatusBar,
    TouchableOpacity,
    View,
    Dimensions,
    ToastAndroid,
    ActivityIndicator,
    Platform,
    ProgressBarAndroid,
    Text,
    PixelRatio,
    ImageBackground,
    BackHandler,
    NativeModules,
    Modal,
    PermissionsAndroid,
} from "react-native";
import React from "react";

class HomeScreen extends React.PureComponent {
    componentDidMount() {
        if (Platform.OS === 'android') {
            this._version();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
            isLoading: false,
            animating: false,
            //网络请求状态
            error: false,
            errorInfo: "",
            isUpdateModalVisable: false,
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <View style={{flex: 1, backgroundColor: '#c4c4c4'}}>
                    <FlatList ref={(flatList) => this._flatList = flatList}
                              style={{backgroundColor: '#fff'}}
                              renderItem={this._renderItem}
                              keyExtractor={this._keyExtractor}
                              refreshing={false} numColumns={3}
                              data={this.state.sourceData}>
                    </FlatList>
                    <Modal animationType="none"
                           visible={this.state.isUpdateModalVisable}
                           transparent={true} onRequestClose={() => {
                        this.setState({isUpdateModalVisable: false});
                    }}>
                        {this._renderUpdateModal()}
                    </Modal>
                </View>
            </View> );
    }

    _version() {

        let url = urls.apis.APP_VERSION;
        fetch(url).then((response) => response.json()).then((responseData) => {
            let resultMsg = responseData.resultMsg;
            let resultCode = responseData.resultCode;
            if (resultCode === 200) {
                let object = responseData.object;
                if (object) {
                    let version = object.version;
                    if (version) {
                        NativeModules.VersionModule.getVersionInfo((result) => {
                            if (result) {
                                let o = JSON.parse(result);
                                if (o) {
                                    let versionCode = o.versionCode;
                                }
                                if (versionCode) {
                                    if (version > versionCode) {
                                        this.setState({isUpdateModalVisable: true,})
                                    }
                                }
                            }
                        })
                    }
                }
            } else {
                // this.setState({
                //      error: true,
                // });
            }
        }).catch((error) => {
        });
    }

    _renderUpdateModal() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
                <View style={{height: 230, backgroundColor: '#fff', marginLeft: 10, marginRight: 10, borderRadius: 5,}}>
                    <View style={{
                        flex: 1,
                        height: 40,
                        flexDirection: 'row',
                        paddingLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({isUpdateModalVisable: false})
                        }}
                                          style={{
                                              position: 'absolute',
                                              left: 10,
                                              height: 40,
                                              flexDirection: 'row',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              marginLeft: 5
                                          }}>
                            <Text style={{fontSize: 14, color: '#333333', marginLeft: 5}}>close</Text>
                        </TouchableOpacity>
                        <Text
                            style={{position: 'absolute', fontSize: 16, color: '#333333', fontWeight: '600'}}>Tip</Text>
                    </View>
                    <Text ref={ref => this.textInput = ref} style={{
                        marginLeft: 15,
                        marginRight: 15,
                        height: 120,
                        color: '#333333',
                        fontSize: 15,
                        borderWidth: 1,
                        borderColor: '#E8EEF0',
                        backgroundColor: '#ffffff',
                        borderRadius: 4,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 10
                    }}>New version detected, update now?</Text>
                    <View style={{
                        flex: 1,
                        height: 40,
                        paddingRight: 15,
                        justifyContent: 'center',
                        alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.checkPermission();
                        }} style={{
                            paddingTop: 8,
                            paddingBottom: 8,
                            paddingLeft: 12,
                            paddingRight: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: "#1097D5",
                            borderRadius: 4
                        }}>
                            <Text style={{fontSize: 15, color: "#FFFFFF"}}>update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> );
    }

    checkPermission() {
        this.setState({isUpdateModalVisable: false});
        try {
            //返回Promise类型
            const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            granted.then((data) => {
                //alert(data)
                if (data) {
                    NativeModules.VersionModule.update();
                } else {
                    this.requestReadPermission();
                }
            }).catch((err) => {
                //this.show(err.toString())
            })
        } catch (err) {
            //this.show(err.toString())
        }
    }

    async requestReadPermission() {
        try {
            //返回string类型
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
            // {
            //      //第一次请求拒绝后提示用户你为什么要这个权限
            //      'title': 'Need to storage permissions ',
            //      'message': 'Please agree with storage permissions '
            // }
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //this.show("你已获取了读写权限")
                NativeModules.VersionModule.update();
            } else {
                //this.show("获取读写权限失败")
                alert('Failed to get storage permission')
            }
        } catch (err) {
            //this.show(err.toString())
            alert(err.toString())
        }
    }
}