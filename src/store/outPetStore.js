import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';

import _ from "lodash";
useStrict(true);

class outPetStore {
    farm={};

    styName="";

    @observable
    otherSty=[];

    data={
        Id:'',
        StyId:'',
        FarmId:'',
        @observable
        Genus:'',
        @observable
        Number:'',
        @observable
        Day:0,
        @observable
        BatchNumber:'',
        @observable
        Type:1,//操作类型
        @observable
        OutDate:'',//出栏日期
        @observable
        Reason:'',
        @observable
        TransferSty:''//转移到的栋舍
    }

    OutPetReasonTypeEum = {
        Normal: { Label: '销售出栏', Transfer: false },
        Death: { Label: '死亡', Transfer: false },
        Eliminate: { Label: '淘汰', Transfer: false },
        Other: { Label: '其他', Transfer: false },
        Transfer: { Label: '转栏', Transfer: true }
    };

    StyeOperationType = {
        AddPet: { Value: 0, Label: '补栏/补苗' },
        RemovePet: { Value: 1, Label: '出栏' },
        ClearSty: { Value: 2, Label: "清栏" }
    };

    BreedEnum = {
        Poultry: 0,
        Livestock: 1,
        PoultryAndLivestock: 2
    };

    onIni(callback,failed){
    }
}

outPetStore = new outPetStore();
export default outPetStore;