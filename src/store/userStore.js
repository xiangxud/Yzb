import {observable, action, computed} from 'mobx'
import { persist } from 'mobx-persist'

class UserStore {
    @persist('object') @observable user = {
        fullName: '',
        email: '',
        companyName: '',
        password: '',
        typeOfBusiness: '',
        token: ''
    };

    @action setUserField(field, value) {
        this.user[field] = value;
    }

    @action onFullNameChange(value) {
        this.user.fullName = value;
    }

    @action onEmailChange(value) {
        this.user.password = value;
    }

    @action onCompanyNameChange(value) {
        this.user.companyName = value;
    }

    @action onTypeOfBusinessChange(value) {
        this.user.typeOfBusiness = value;
    }

    @action onPasswordChange(value) {
        this.user.password = value;
    }

    @action onPasswordConfirmChange(value) {
    }

    @action register() {
        console.log(`calling register with user: ${JSON.stringify(this.user)}`);
        return fetch('https://anooworld.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.user.email,
                password: this.user.password,
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

    @action login() {
        return fetch('https://anooworld.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.user.email,
                password: this.user.password,
            })
        }).catch((error)=>console.error('Error (Exception) calling login '+error+' for user: '+JSON.stringify(this.user)))
    }
}

export default UserStore;