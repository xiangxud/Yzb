/**
 * Created by TomChow on 2017/11/28.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
useStrict(true);

class TestItem {
    @observable samplingSystemNo = ''
    @observable testTypeName = [];
    @observable testTypeDetailNames = [];
    @observable farmName = '';
    @observable sendAge = 0;
    @observable morbidityAge = 0;
    @observable sendSamplingCount = 0;
}

class BohaiStore {
    @observable step = 1;
    @observable breeds = [];

    @observable poultry_test_items = [];
    @observable livestock_test_items = [];

    @observable currentTestItemIndex = 0;
    @observable currentTestItemOrg = {};
    @observable currentSamplingPicker = [];
    //审批人信息
    @observable approvers = {};

    @observable poultry_genders = ['祖代','父母代肉鸡','父母代蛋鸡','商品代肉鸡','商品代肉鸡'];
    @observable livestock_genders = [];
    @observable data = {
        phoneNo : '18307722503',
        animalType : '家禽',
        farmName : '上海爱森一场',
        drugTesting : '否',
        poultryTotalCount : 1,
        poultrySingleCount : 1,
        poultryMonthCount : 1,
        poultryBreeds : ['京灰'],
        poultryGenerations : '祖代',
        livestockTotalCount : 1,
        livestockYearCount : 1,
        livestockBreeds : [],
        livestockGenders : [],
        livestockParity : '',
        testingSamplingList : [],
        pigSerumRecordList : [{
            no: '1',
            pigStage: '保育猪N',
            stillbirth: '无',
            abortion: '无',
            mummy: '无',
            nonpregnant: '无',
            highfever: '有',
            respiratoryDisease: '有',
            nervous: '无',
            mechanical: '无',
            othersymptom: '咳嗽，喘气',
        }],
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

    // constructor(){
    //     this.addTestItem();
    // }
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
    @action setItem = (index, field, value) => {
        let t = typeof this.data.testingSamplingList[index][field];
        if(t === 'number'){
            let num = Number(value);
            if(!isNaN(num)){
                this.data.testingSamplingList[index][field] = num;
            }
        }else if(t === 'boolean'){

        }else if(t === 'undefined'){

        }else{
            this.data.testingSamplingList[index][field] = value;
        }
    }
    //替换数组所有元素
    @action setTestItemArray = (field, value) => {
        if(this.currentTestItemIndex < 0){
            return;
        }
        let exists_index = this.data.testingSamplingList[this.currentTestItemIndex][field].indexOf(value);
        if(value === null){
            //清空元素
            this.data.testingSamplingList[this.currentTestItemIndex][field].splice(0, this.data.testingSamplingList[this.currentTestItemIndex][field].length);
            return;
        }
        if(exists_index>-1){
            this.data.testingSamplingList[this.currentTestItemIndex][field].splice(exists_index, 1);
        }else{
            this.data.testingSamplingList[this.currentTestItemIndex][field].push(value);
        }
    }
    @action setCurrentCheckItem(index){
        this.currentTestItemIndex = index;
    }
    //设置当前操作的监测大类，在弹出窗口时需要过滤出当前大项目下面的子项目及其样品部位
    @action setCurrentBigItemOrg(item){
        this.currentTestItemOrg = item;
    }
    @action setSamplingPicker(arr){
        this.currentSamplingPicker = arr;
    }

    @action setBreeds = (brees) => {
        this.breeds = brees;
    }
    @action setTestItems = (items) =>{
        this.poultry_test_items = items.poultry_items;
        this.livestock_test_items = items.livestock_items;
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

    //设置审批人信息
    @action setApprovers(o){
        this.approvers = o;
    }
    //添加检测项目
    @action addTestItem(){
        this.data.testingSamplingList.push(new TestItem());
    }
    @action deleteTestItem(index){
        this.data.testingSamplingList.splice(index, 1);
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
    isTestItemDetailChecked(v){
        return this.currentTestItemIndex > -1 &&
            this.data.testingSamplingList[this.currentTestItemIndex].testTypeName &&
            this.data.testingSamplingList[this.currentTestItemIndex].testTypeName.indexOf(v) > -1
    }
    isSamplingPartChecked = (v) =>{
        return this.currentTestItemIndex > -1 &&
            this.data.testingSamplingList[this.currentTestItemIndex].testTypeDetailNames &&
            this.data.testingSamplingList[this.currentTestItemIndex].testTypeDetailNames.indexOf(v) > -1
    }
}

bohaiStore = new BohaiStore();
export default bohaiStore