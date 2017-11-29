/**
 * Created by TomChow on 2017/11/28.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
useStrict(true);

class Poultry{

}
class Livestock{

}

class BohaiStore {
    @observable step = 1;
    @observable data = {
        phoneNo : '',
        animalType : '',
        farmName : '',
        drugTesting : '否',
        poultryTotalCount : 0,
        poultrySingleCount : 0,
        poultryMonthCount : 0,
        poultryBreeds : [],
        poultryGenerations : '',
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

    @action set = (field, value) => {
        this.data[field] = value;
    }

    @action nextStep = () =>{
        this.step<5 && this.step++;
    }

    @action prevStep = () =>{
        this.step>1 && this.step--;
    }
    @action changeDrugTesting() {
        this.data.drugTesting = (this.data.drugTesting === '是') ? '否' : '是';
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