import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import {persist} from 'mobx-persist'
import hydrate from "../common/hydrate";
import _ from "lodash";
import tools from "../common/tools";

const ENUM_BREED = ['家禽', '家畜', '家禽家畜'];
useStrict(true);
// class UserProfile{
//     @observable id = null;
//     @observable name = null;
//     @observable nick = null;
//     @observable company = null;
//     @observable photo = null;
//     @observable seq = null;
//     @observable breed = null;
//     @observable phone = null;
//     @observable province = null;
//     @observable city = null;
//     @observable district = null;
//     @observable address = null;
//     @observable score = null;
//     @observable sex = null;
// }

class UserStore {
    @observable ContentLables=[];//头条显示的栏目数
    AllLabels=[];//所有的显示项目


    //loginForm
    @observable
    @validate(/^1(3|4|5|7|8)\d{9}$/, '请输入正确的手机号')
    loginPhone = '18307722503';

    @observable
    @validate(/^[\w]{6,16}$/, '请输入至少6位密码')
    loginPassword = '123456';

    @observable
    invitationCode=''

    @observable
    @validate(/^[\w]{6,16}$/, '请输入至少6位密码')
    registerPassword = '';

    @observable
    @validate(/^[\w]{6,16}$/, '请输入正确的重复密码')
    registerPasswordRepeat = '';

    @observable
    @validate(/\d{6}$/, '请输入6位数字验证码')
    validateCode = '';

    @observable
    name = '';

    @observable
    farmName = ''
    //养殖类型
    @observable animalType = [];
    //用户类型
    @observable userType = 1;
    @observable userTypeLabel = "养殖场";

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
    @observable currentUser = {};
    @observable loading = false;

    @action settingContentLables(value,all){
        this.ContentLables = value;
        this.AllLabels=all;
    }
    onLoadFarm=(code)=>{
        if(code && code.length != 5){
            return;
        }
        this.setLoading();
        request.getJson(urls.apis.JOIN_FARM_GETBYCODE,{code:code}).then(r=>{
            this.setLoading();
            runInAction(()=>{
                this.farmName = r.Name;
            });
        },e=>{
            this.setLoading();
            tools.showToast("网络异常，请稍后重试:" + JSON.stringify(e))
        });
    }


    postContentLables(value,success,error){
        request.postJson(urls.apis.UPDATE_USERLABLES, { PS:value }).then((res) => {
            this.settingContentLables(value,this.AllLabels);
            success(res)
        }).catch((err) =>{ return error(err);})
    }
    //#####################################登录注册
    @action setLoginPhone = _.debounce((phone) => {
        this.loginPhone = phone;
    }, 400)
    @action setInvitationCode = _.debounce((code)=>{
        this.invitationCode=code;
        this.onLoadFarm(code);
    },400);


    @action setLoginPassword = _.debounce((pwd) => {
        this.loginPassword = pwd;
    }, 400)
    @action setRegisterPassword = _.debounce((pwd) => {
        this.registerPassword = pwd;
    }, 400)
    @action setRegisterPasswordRepeat = _.debounce((pwd) => {
        this.registerPasswordRepeat = pwd;
    }, 400)
    @action setValidateCode = _.debounce((code) => {
        this.validateCode = code;
    }, 400)
    @action setName = _.debounce((v) => {
        this.name = v
    }, 400)
    @action setFarm = _.debounce((v) => {
        this.farmName = v
    }, 400)
    //#######################################

    userTypeOptions = [{label: '养殖场', value: 1}, {label: '经销商', value: 2}, {label: '业务员', value: 3}];
    onGetUserTypeOptions = () => {
        options = [];
        this.userTypeOptions.forEach(
            item => options.push(item.label)
        );
        return options;
    };

    @action setLoginUser = (u) => {
        this.loginUser = u;
    }

    @action
    setCurrentUser() {
        if (!this.currentUser || !this.currentUser.id) {
            //Object.assign(this.currentUser, this.currentUser, this.loginUser);

            //alert(JSON.stringify(this.currentUser))
            this.currentUser = {
                id: this.loginUser.id,
                name: this.loginUser.name,
                nick: this.loginUser.nick,
                company: this.loginUser.company,
                photo: this.loginUser.photo,
                seq: this.loginUser.seq,
                breed: this.loginUser.breed >= 0 && this.loginUser.breed <= 2 ? ENUM_BREED[this.loginUser.breed] : '',
                phone: this.loginUser.phone,
                province: this.loginUser.province,
                city: this.loginUser.city,
                district: this.loginUser.district,
                address: this.loginUser.address,
                score: this.loginUser.score,
                sex: this.loginUser.sex,
            };
        }
    }

    @action
    setProfile(f, v) {
        this.currentUser[f] = v;
    }

    @action
    setLoading() {
        this.loading = !this.loading;
    }

    @action setBreed = (t) => {
        let i = this.animalType.indexOf(t);
        if (i > -1) {
            this.animalType.splice(i, 1);
        }
        else {
            this.animalType.push(t);
        }
    }
    @action register = (success, error) => {
        let reg_data = {
            phone: this.loginPhone,
            vcode: this.validateCode,
            userType: this.userType,
            password: this.registerPassword,
            name: this.name,
            farm_name: this.farmName,
            breed: this.animalType.length === 1 ? this.animalType[0] : 2,
        };
        request.postJson(urls.apis.USER_REGISTER, reg_data).then((res) => {
            this.loginPassword = this.registerPassword;
            success(res)
        }).catch((err) =>
            error(err)
        )
    }
    onJoin=(callback,errCallack)=>{
        let data = {
            code:this.invitationCode,
            phone: this.loginPhone,
            vcode: this.validateCode,
            userType: this.userType,
            password: this.registerPassword,
            name: this.name,
            farm_name: this.farmName
        };
        request.postJson(urls.apis.JOIN_FARM,data).then(res=>{
            callback(res);
        }).catch(ex=>{
            errCallack(res);
        });
    };

    @action find = (success, error) => {
        let reg_data = {
            phone: this.loginPhone,
            vcode: this.validateCode,
            password: this.registerPassword,
        };
        request.getJson(urls.apis.USER_RESET_PASSWORD, reg_data).then((res) => {
            this.loginPassword = this.registerPassword;
            success(res)
        }).catch((err) =>
            error(err)
        )
    }

    @action login = (callback) => {
        this.loading = true;
        //alert(`${this.password}-${this.phone}`)
        this._login(this.loginPhone, this.loginPassword, (token) => {
            runInAction(() => {
                this.token = token;
                this.phone = this.loginPhone;
                this.password = this.loginPassword;
                this.fetchLoginUser((data) => {
                    this.setLoading();
                    this.setLoginUser(data);
                    callback(true, data.access_token)
                }, (err) => {
                    this.setLoading();
                    callback(true, err.message);
                });
            })
        }, (err) => {
            this.setLoading();
            callback(false, err);
        });
    }

    @action relogin = (callback) => {
        this.login(callback)
    };
    @action onUpdateUserType = label => {
        let o = this.userTypeOptions.fristOne(item => item.label == label);
        if (o != null) {
            this.userType = o.value;
            this.userTypeLabel = o.label;
        }
    };

    _login(phone, password, success, failed) {
        request.postJson(urls.apis.USER_LOGIN, {
            phone: phone,
            password: password
        }).then((data) => {
            success(data);
        }).catch((error) => {
            failed(error)
        });
    }

    @action
    fetchLoginUser(success, failed) {
        request.getJson(urls.apis.USER_GET_MINE).then((data) => {
            success(data);
        }).catch((res) => {
            failed(res);
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
        this.password = '';
        this.token = {access_token: ''};
        this.loginUser = {}
        this.currentUser = {}
        return true;
    }

    @computed
    get addr() {
        return (this.currentUser.province || this.currentUser.city || this.currentUser.district) ?
            `${this.currentUser.province || ''} ${this.currentUser.city || ''} ${this.currentUser.district || ''}` : '点击设置';
    }
}

const userStore = new UserStore();
export default userStore
// hydrate('user', userStore).then(() => {
//     userStore.hydrated = true;
//     //console.log('user hydrated', userStore)
// });