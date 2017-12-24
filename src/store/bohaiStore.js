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
class PigSerumRecord {
    @observable no = '';
    @observable earNo = '';
    @observable pigStage = '';
    @observable stillbirth = '无';
    @observable abortion = '无';
    @observable mummy = '无';
    @observable nonpregnant = '无';
    @observable highfever = '无';
    @observable respiratoryDisease = '无';
    @observable nervous = '无';
    @observable mechanical = '无';
    @observable othersymptom = '';
}

class BohaiStore {
    @observable step = 1;
    @observable isSales = false;
    @observable poultry_test_items = [];
    @observable livestock_test_items = [];

    @observable currentItemIndex = -1;
    @observable currentPigRecordIndex = -1;
    @observable currentTestItemOrg = {};
    @observable currentSamplingPicker = [];
    //审批人信息
    @observable picker_approvers = {};

    @observable picker_poultry_breeds = [];
    @observable picker_poultry_genders = ['祖代','父母代肉鸡','父母代蛋鸡','商品代肉鸡','商品代肉鸡'];
    @observable picker_livestock_breeds = ['内三元', '外三元', '二元', '其他'];
    @observable picker_livestock_genders = ['种猪', '商品猪'];
    @observable picker_livestock_pig_stage = ['后备种猪G','1胎母猪S1','2胎母猪S2','3-5胎母猪S3-5','6胎以上母猪S6+','公猪B','保育猪N','生长育肥猪GF','哺乳仔猪NP'];
    @observable data = {
        @observable phoneNo : '18307722503',
        @observable animalType : '家禽',
        @observable farmName : '上海爱森一场',
        @observable drugTesting : '否',
        @observable poultryTotalCount : 1,
        @observable poultrySingleCount : 1,
        @observable poultryMonthCount : 1,
        @observable poultryBreeds : ['京灰'],
        @observable poultryGenerations : '祖代',
        @observable livestockTotalCount : 1,
        @observable livestockYearCount : 1,
        @observable livestockBreeds : [],
        @observable livestockGenders : [],
        @observable livestockParity : '',
        @observable testingSamplingList : [],
        @observable pigSerumRecordList : [],
        @observable morbidity : 1,
        @observable mortality : 1,
        @observable clinicalSymptoms : '',
        @observable vaccineName : '',
        @observable immuneProcedure : '',
        @observable dosageSchedule : '',
        @observable disinfectingPlan : '',
        @observable dissectingLesion : '', //剖检病变
        @observable preliminaryDiagnosis : '',
        @observable derattingPlan : '',
        @observable consultantPhoneNo : '',
        @observable salesPhoneNo : '',
    };

    @observable modalBreedsVisible = false;
    @observable modalGenerationsVisible = false;

    @observable isFetching = true;

    @action setSales(o){
        this.isSales = o;
    }
    @action setFetch(res){
        this.isFetching = res;
    }
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
    @action setItem = (index, field, value, obj) => {
        obj = obj? obj: 'testingSamplingList';
        let t = typeof this.data[obj][index][field];
        if(t === 'number'){
            let num = Number(value);
            if(!isNaN(num)){
                this.data[obj][index][field] = num;
            }
        }else if(t === 'boolean'){

        }else if(t === 'undefined'){

        }else{
            this.data[obj][index][field] = value;
        }
    }
    //更新数组字段
    @action setDataArray(field, v) {
        let index = this.data[field].indexOf(v);
        if (index > -1) {
            this.data[field].splice(index, 1);
        }else{
            this.data[field].push(v);
        }
    }
    //更新监测项目数组
    @action setTestItemArray = (field, value) => {
        if(this.currentItemIndex < 0){
            return;
        }
        let exists_index = this.data.testingSamplingList[this.currentItemIndex][field].indexOf(value);
        if(value === null){
            //清空元素
            this.data.testingSamplingList[this.currentItemIndex][field].splice(0, this.data.testingSamplingList[this.currentItemIndex][field].length);
            return;
        }
        if(exists_index>-1){
            this.data.testingSamplingList[this.currentItemIndex][field].splice(exists_index, 1);
        }else{
            this.data.testingSamplingList[this.currentItemIndex][field].push(value);
        }
    }
    @action setCurrentItemIndex(index, t='test_item'){
        switch(t){
            case 'test_item':
                this.currentItemIndex = index;
                break;
            case 'pig_record':
                this.currentPigRecordIndex = index;
                break;
        }
    }
    //设置当前操作的监测大类，在弹出窗口时需要过滤出当前大项目下面的子项目及其样品部位
    @action setCurrentBigItemOrg(item){
        this.currentTestItemOrg = item;
    }
    @action setSamplingPicker(arr){
        this.currentSamplingPicker = arr;
    }

    @action setBreeds = (brees) => {
        this.picker_poultry_breeds = brees;
        this.setFetch(false);
    }
    @action setTestItems = (items) =>{
        this.poultry_test_items = items.poultry_items;
        this.livestock_test_items = items.livestock_items;
        this.setFetch(false);
    }
    @action nextStep(v) {
        if (this.step < 6) {
            v ? this.step += v : this.step++;
        }
    }

    @action prevStep(){
        if(this.data.animalType==='家禽' && this.step === 5) {
            this.step -= 2;
        }else{
            this.step>1 && this.step--;
        }
    }
    @action changeDrugTesting() {
        this.data.drugTesting = (this.data.drugTesting === '是') ? '否' : '是';
    }
    @action switchBreedsModal(){
        this.modalBreedsVisible = !this.modalBreedsVisible;
    }


    //设置审批人信息
    @action setApprovers(o){
        this.picker_approvers = o;
    }
    //添加检测项目
    @action addTestItem(){
        this.data.testingSamplingList.push(new TestItem());
    }
    @action deleteTestItem(index){
        this.data.testingSamplingList.splice(index, 1);
    }
    //猪血清学
    @action addPigSerumRecord(){
        this.data.pigSerumRecordList.push(new PigSerumRecord());
    }
    @action deletePigSerumRecord(index){
        this.data.pigSerumRecordList.slice(index, 1);
    }

    @computed get isDrug(){
        return this.data.drugTesting === '是';
    }
    @computed get poultryBreeds() {
        return this.data.poultryBreeds.length ? this.data.poultryBreeds.join(',') : '';
    }
    @computed get livestockBreeds() {
        return this.data.livestockBreeds.length ? this.data.livestockBreeds.join(',') : '';
    }
    @computed get livestockGenders(){
        return this.data.livestockGenders.length ? this.data.livestockGenders.join(',') : '';
    }

    inDataArray(field, v){
        return this.data[field].indexOf(v) > -1;
    }
    isTestItemDetailChecked(v){
        return this.currentItemIndex > -1 &&
            this.data.testingSamplingList[this.currentItemIndex].testTypeName &&
            this.data.testingSamplingList[this.currentItemIndex].testTypeName.indexOf(v) > -1
    }
    isSamplingPartChecked = (v) =>{
        return this.currentItemIndex > -1 &&
            this.data.testingSamplingList[this.currentItemIndex].testTypeDetailNames &&
            this.data.testingSamplingList[this.currentItemIndex].testTypeDetailNames.indexOf(v) > -1
    }
}

bohaiStore = new BohaiStore();
export default bohaiStore