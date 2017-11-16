import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class UserStore {
    //loginForm
    @observable
    @validate(/^1(3|4|5|7|8)\d{9}$/, '请输入正确的手机号')
    loginPhone='';

    @observable
    @validate(/^[\w]{6,16}$/, '请输入至少6位字母、数字、下划线密码')
    loginPassword='';

    @observable
    @validate(/^[\w]{6,16}$/, '请输入至少6位字母、数字、下划线密码')
    registerPassword='';

    @observable
    @validate(/^[\w]{6,16}$/, '请输入正确的重复密码')
    registerPasswordRepeat='';

    @observable
    @validate(/\d{6}$/, '请输入6位数字验证码')
    registerValidateCode='';

    @observable registerUserType='';

    //userSession
    @observable hydrated = false;
    @persist @observable isLogin = false;
    @persist @observable phone = '';
    @persist @observable password = '';
    @persist('object') @observable token = {access_token: ''};
    @persist @observable lon = 116.391350;
    @persist @observable lat = 39.907723;
    @observable position = {
        name: '获取中...',
        regionId: ''
    }

    @persist('object') @observable loginUser = {};
    @persist('object') @observable location = {};

    constructor(){
        this.loginPhone='18307722503';
        this.loginPassword='123456';
        this.token = {
            access_token: ''
        }
    }
    //#####################################登录注册
    @action setLoginPhone = _.debounce((phone)=>{
        this.loginPhone = phone;
    }, 400)
    @action setLoginPassword = _.debounce((pwd)=>{
        this.loginPassword = pwd;
    }, 400)
    @action setRegisterPassword = _.debounce((pwd)=>{
        this.registerPassword = pwd;
    }, 400)
    @action setRegisterPasswordRepeat = _.debounce((pwd)=>{
        this.registerPasswordRepeat = pwd;
    }, 400)
    @action setRegisterValidateCode = _.debounce((code)=>{
        this.registerValidateCode = code;
    }, 400)
    //#######################################
    @action setLoginUser = (u) =>{
        this.loginUser = u;
    }
    @action register() {
        return fetch('https://anooworld.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.loginPhone,
                password: this.loginPassword,
            })
        }).then((resp)=>{
            console.log(`resp is ${JSON.stringify(resp)}`);
            if (resp.status !== 200) {
                console.error('Error calling register '+resp._bodyText);
            }
            else {
                console.log(`user ${this.user.email} registered successfully`);
            }
        }).catch((error)=>console.error('Error (Exception) calling register '+error))
    }

    @action login = (callback) => {
        this.phone = this.loginPhone;
        this.password = this.loginPassword;
        this._login(this.phone, this.password).then((token)=>{
            runInAction(() => {
                this.isLogin = true;
                this.token = token;
                callback(true, token);
            })
        }).catch((err)=>{
            callback(false, err);
        }).done();
    }

    @action relogin = (callback) => {
        this.login(callback)
    };

    _login(phone, password) {
        return new Promise(function (resolve, reject) {
            request.postJson(urls.apis.USER_LOGIN, {
                Identity: phone,
                Password: password
            }).then((data) => {
                resolve(data);
            }).catch((error)=>{
                reject(error)
            }).done();
        });
    }

    @action
    fetchLoginUser = () => {
        return new Promise(function (resolve, reject) {
            request.getJson(urls.apis.USER_GETLOGINUSER).then((data) => {
                resolve(data);
            }).catch((res)=>{
                reject(res);
            }).done();
        });
    };

    @action
    updateUserPhoto(uri, fileName) {
        let formData = new FormData();
        formData.append("filename", {
            uri: uri,
            type: 'multipart/form-data',
            name: fileName
        });

        request.postJson(urls.apis.IMAGE_UPLOAD, formData)
            .then(result => {
                if (result.ok) {
                    // 修改图片路径
                    this.updateUserInfo('photo', result.obj)
                } else {
                    tools.showToast("上传失败")
                }
            })
    }

    @action
    updateUserInfo(property, value) {
        let user0 = {...this.loginUser};
        user0[property] = value;
        this.loginUser = user0;

        request.getJson(urls.apis.USER_UPDATEUSERINFO, {
            fieldName: this.fieldMap[property] || property,
            value
        }).then(result => {
            if (result.ok) {
                // ...
            } else {
                tools.showToast("修改失败");
            }
        })
    }

    @action
    getposition() {
        Geolocation.getCurrentPosition(
            location => {
                var result = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                this.lon = location.coords.longitude;
                this.lat = location.coords.latitude;
                var coord = location.coords.longitude + "," + location.coords.latitude;
                request.getJson('http://api.map.baidu.com/geoconv/v1/', {
                    coords: coord,
                    from: 1,
                    to: 5,
                    ak: 'trLEKMVBCc6MKGemHlUXdyy2'
                }).then((data) => {
                    var coo = data.result[0].y + "," + data.result[0].x;
                    request.getJson('http://api.map.baidu.com/geocoder/v2/', {
                        location: coo,
                        output: 'json',
                        pois: 1,
                        radius: 20,
                        ak: 'trLEKMVBCc6MKGemHlUXdyy2'
                    }).then((data) => {
                        this.location = data.result;

                    });
                })

            },
            error => {
                tools.showToast("获取位置失败")
            }
        );
    }

    @action
    logout() {
        this.isLogin = false;
        this.token = {access_token: ''};
        this.loginUser = {}
        return true;
    }
}

const userStore = new UserStore();
export default userStore