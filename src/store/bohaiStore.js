/**
 * Created by TomChow on 2017/11/28.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
useStrict(true);

class CheckItem{
    @observable samplingSystemNo= ''
    @observable testTypeName= [];
    @observable testTypeDetailNames= [];
    @observable farmName= '';
    @observable sendAge= 0;
    @observable morbidityAge= 0;
    @observable sendSamplingCount= 0;
}

class BohaiStore {
    @observable step = 1;
    @observable breeds = [];
    @observable poultry_genders = ['祖代','父母代肉鸡','父母代蛋鸡','商品代肉鸡','商品代肉鸡'];
    @observable livestock_genders = [];
    @observable data = {
        phoneNo : '18307722503',
        animalType : '家禽',
        farmName : '上海第一养殖场',
        drugTesting : '是',
        poultryTotalCount : 0,
        poultrySingleCount : 0,
        poultryMonthCount : 0,
        poultryBreeds : ['京灰'],
        poultryGenerations : '祖代',
        livestockTotalCount : 0,
        livestockYearCount : 0,
        livestockBreeds : [],
        livestockGenders : [],
        livestockParity : '',
        testingSamplingList : [],
        pigSerumRecordList : [],
        morbidity : 0,
        mortality : 0,
        clinicalSymptoms : '',
        vaccineName : '',
        immuneProcedure : '',
        dosageSchedule : '',
        disinfectingPlan : '',
        dissectingLesion : '', //剖检病变
        preliminaryDiagnosis : '',
        derattingPlan : '',
        consultantPhoneNo : '',
        salesPhoneNo : '',
    };

    @observable modalBreedsVisible = false;
    @observable modalGenerationsVisible = false;

    @action set = (field, value) => {
        let t = typeof this.data[field];
        if(t === 'number'){
            let num = Number(value);
            if(!isNaN(num)){
                this.data[field] = num;
            }
        }else if(t === 'boolean'){

        }else if(t === 'undefined'){

        }else{
            this.data[field] = value;
        }
    }
    @action setItem = (obj, field, value) => {
        let t = typeof obj[field];
        if(t === 'number'){
            let num = Number(value);
            if(!isNaN(num)){
                obj[field] = num;
            }
        }else if(t === 'boolean'){

        }else if(t === 'undefined'){

        }else{
            obj[field] = value;
        }
    }

    @action setBreeds = (brees) => {
        this.breeds = brees;
    }
    @action nextStep(){
        this.step<5 && this.step++;
    }

    @action prevStep(){
        this.step>1 && this.step--;
    }
    @action changeDrugTesting() {
        this.data.drugTesting = (this.data.drugTesting === '是') ? '否' : '是';
    }
    @action switchBreedsModal(){
        this.modalBreedsVisible = !this.modalBreedsVisible;
    }
    @action chooseBreeds(v) {
        let index = this.data.poultryBreeds.indexOf(v);
        if (index > -1) {
            this.data.poultryBreeds.splice(index, 1);
        }else{
            this.data.poultryBreeds.push(v);
        }
    }

    //添加检测项目
    @action addTestItem(){
        this.data.testingSamplingList.push(new CheckItem());
        tools.showToast('已添加新项目');
    }
    @action deleteTestItem(item){
        this.data.testingSamplingList.splice(this.data.testingSamplingList.indexOf(item), 1);
        tools.showToast('已删除项目');
    }


    @computed get isDrug(){
        return this.data.drugTesting === '是';
    }
    @computed get poultryBreeds(){
        if(this.data.poultryBreeds.length>0){
            return this.data.poultryBreeds.join(',');
        }else{
            return null;
        }
    }
}

bohaiStore = new BohaiStore();
export default bohaiStore