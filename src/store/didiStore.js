/**
 * Created by TomChow on 2017/11/13.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'
import {RefreshState} from 'react-native-refresh-list-view';
import { persist } from 'mobx-persist'

useStrict(true);
class DidiStore {
    @observable pageIndex = 1;
    @observable pageSize = 5;
    @observable refreshState = RefreshState.Idle;
    @persist @observable vets = [];
    @observable current = {};
    @observable currentType = 'list';
    @observable errorMsg = '';
    @observable isFetching = false;
    @observable locationInterval = 2000;
    @observable position = {
        accuracy: 1,
        latitude: 39.13,
        longitude: 117.20,
    }
    @action setCurrent(vet){
        this.current = vet;
    }
    @action switch(){
        if(this.isFetching){
            tools.showToast('正在获取您的位置，请稍后再试');
            return;
        }
        this.currentType = this.currentType === 'map'? 'list': 'map';
    }
    @action fetchVets = (page) => {
        const params = {count: this.pageSize, page: page, latitude: this.position.latitude, longitude: this.position.longitude};
        request.getJson(urls.apis.DIDI_NEARBY_VETS, params).then((res) => {
            runInAction(() => {
                if(this.pageIndex === 1){
                    this.vets.replace(res);
                }else{
                    this.vets.splice(this.vets.length, 0, ...res);
                }
                this.refreshState = res.length > this.pageSize ? RefreshState.NoMoreData : RefreshState.Idle,
                this.pageIndex++;
                this.isFetching = false;
            });
        }, (error) => {
            runInAction(() => {
                this.isFetching = false;
                this.refreshState = RefreshState.Failure;
            });
            tools.showToast(JSON.stringify(error))
        });
    }
    @action onHeaderRefresh=()=>{
        this.pageIndex = 1;
        this.refreshState = RefreshState.HeaderRefreshing;
        this.fetchVets(this.pageIndex);
    }
    @action onFooterRefresh=()=>{
        this.refreshState = RefreshState.FooterRefreshing;
        this.fetchVets(this.pageIndex);
    }
    @action setMyPosition(po){
        this.position = po;
        this.locationInterval = 120000;
        this.vets = [
            {
                "id": 4213,
                "name": "丁毛宁",
                "phone": "15924324916",
                "head_photo": "https://m.ringpu.com/assets/images/user/201607/1C76D21B84D8F480A6A0160915170F61_HD.png",
                "skill": "全科 场舍建设",
                "major_skill": "全科",
                "title": "丁毛宁",
                "subtitle": "丁毛宁",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.4165630128824,
                "longitude": 116.79203343400361,
                "vitae": ""
            },
            {
                "id": 1353,
                "name": "丁邦标",
                "phone": "13851165012",
                "head_photo": "https://m.ringpu.com/assets/images/user/201604/199A399F2FF4BA2C1ECCC5039BC472B9_HD.png",
                "skill": "水禽 饲养管理",
                "major_skill": "水禽",
                "title": "丁邦标",
                "subtitle": "丁邦标",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.331043565851196,
                "longitude": 116.37011205859953,
                "vitae": ""
            },
            {
                "id": 2816,
                "name": "丁飞",
                "phone": "18920795905",
                "head_photo": "https://m.ringpu.com/assets/images/user/201605/275E1F85C6193815877395A0214C2730_HD.png",
                "skill": "鸡 疫病预防  临床诊断",
                "major_skill": "鸡",
                "title": "丁飞",
                "subtitle": "丁飞",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.1233317345536,
                "longitude": 116.99631041027433,
                "vitae": ""
            },
            {
                "id": 1119,
                "name": "万事顺",
                "phone": "15342232798",
                "head_photo": "https://m.ringpu.com/assets/images/user/201603/14F0D7BCC2AA2EAE02DEECEDE1DC3CD7_HD.png",
                "skill": "猪 临床诊断",
                "major_skill": "猪",
                "title": "万事顺",
                "subtitle": "万事顺",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.685253608410832,
                "longitude": 116.39471764154487,
                "vitae": ""
            },
            {
                "id": 5411,
                "name": "万永刚",
                "phone": "13863655960",
                "head_photo": "https://m.ringpu.com/assets/images/user/201609/63E55A30FB3209712697A2D126976FF1_HD.png",
                "skill": "水禽 疫病预防  临床诊断 生物安全控制",
                "major_skill": "水禽",
                "title": "万永刚",
                "subtitle": "万永刚",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.512445413331712,
                "longitude": 116.85769464320396,
                "vitae": ""
            },
            {
                "id": 4786,
                "name": "上官",
                "phone": "13032358557",
                "head_photo": "https://m.ringpu.com/assets/images/user/201608/4BED36ED250F709709412A94B37BDD21_HD.png",
                "skill": "牛 实验室诊断 临床诊断",
                "major_skill": "牛",
                "title": "上官",
                "subtitle": "上官",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.352888963866462,
                "longitude": 116.83357464207037,
                "vitae": ""
            },
            {
                "id": 4009,
                "name": "东东",
                "phone": "18801356732",
                "head_photo": "https://m.ringpu.com/assets//images/user/avatar/default_avatar.png",
                "skill": "牛",
                "major_skill": "牛",
                "title": "东东",
                "subtitle": "东东",
                "star": 5,
                "service_count": 2,
                "clinic_year": null,
                "latitude": 39.111035605995468,
                "longitude": 116.37940261642422,
                "vitae": ""
            },
            {
                "id": 5096,
                "name": "东哥",
                "phone": "18879906012",
                "head_photo": "https://m.ringpu.com/assets/images/user/201608/11ED57C4951A36AEB6696122CB7D50D8_HD.png",
                "skill": "猪 临床诊断",
                "major_skill": "猪",
                "title": "东哥",
                "subtitle": "东哥",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.968586518931481,
                "longitude": 116.52681529285704,
                "vitae": ""
            },
            {
                "id": 8714,
                "name": "严泽杰",
                "phone": "13934892954",
                "head_photo": "https://m.ringpu.com/assets/images/user/201612/C64476D56C0E5DBFC448275669B47745_HD.png",
                "skill": "全科 疫病预防  临床诊断",
                "major_skill": "全科",
                "title": "严泽杰",
                "subtitle": "严泽杰",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.8440015548626,
                "longitude": 116.28937579257851,
                "vitae": ""
            },
            {
                "id": 472,
                "name": "严闻振",
                "phone": "15897593948",
                "head_photo": "https://m.ringpu.com/assets//images/user/avatar/default_avatar.png",
                "skill": "鸡 疫病预防 临床诊疗",
                "major_skill": "鸡",
                "title": "严闻振",
                "subtitle": "严闻振",
                "star": 5,
                "service_count": 1,
                "clinic_year": null,
                "latitude": 38.99194783116782,
                "longitude": 116.57006879102907,
                "vitae": ""
            },
            {
                "id": 1320,
                "name": "严闻振",
                "phone": "18163558532",
                "head_photo": "https://m.ringpu.com/assets/images/user/201604/B2689B5FAABDEAF348804A769481D63D_HD.png",
                "skill": "鸡 疫病预防   生物安全控制   饲养管理",
                "major_skill": "鸡",
                "title": "严闻振",
                "subtitle": "严闻振",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.41839517025668,
                "longitude": 117.07655647372667,
                "vitae": ""
            },
            {
                "id": 11117,
                "name": "丰丰",
                "phone": "13568661321",
                "head_photo": "https://m.ringpu.com/assets/images/user/201703/8F60F695567E56C6082E745AA7FBC642_HD.png",
                "skill": "鸡 疫病预防",
                "major_skill": "鸡",
                "title": "丰丰",
                "subtitle": "丰丰",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.594036827191729,
                "longitude": 116.5911789429333,
                "vitae": ""
            },
            {
                "id": 5195,
                "name": "乐伟",
                "phone": "18680217710",
                "head_photo": "https://m.ringpu.com/assets/images/user/201704/DA90CCCE6679F5BD53E5CFFAF23AF951_HD.png",
                "skill": "鸡 疫病预防  临床诊断    饲养管理 动物营养",
                "major_skill": "鸡",
                "title": "乐伟",
                "subtitle": "乐伟",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.663850498280418,
                "longitude": 117.1093510559338,
                "vitae": ""
            },
            {
                "id": 4285,
                "name": "乐恩贝",
                "phone": "18663240007",
                "head_photo": "https://m.ringpu.com/assets/images/user/201607/B4334DFFAE32D88FEEB3CBA2EE3CD0DF_HD.png",
                "skill": "猪 饲养管理 动物营养 生产效益分析",
                "major_skill": "猪",
                "title": "乐恩贝",
                "subtitle": "乐恩贝",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.039654714590711,
                "longitude": 116.20620376272416,
                "vitae": "毕业于山东畜牧兽医职业学院"
            },
            {
                "id": 5390,
                "name": "乔明虎",
                "phone": "13834701662",
                "head_photo": "https://m.ringpu.com/assets/images/user/201609/6DC4942D8D9E2E2FE3D713CD17505623_HD.png",
                "skill": "鸡 疫病预防      饲养管理",
                "major_skill": "鸡",
                "title": "乔明虎",
                "subtitle": "乔明虎",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.987550934356427,
                "longitude": 116.78446054141246,
                "vitae": ""
            },
            {
                "id": 5041,
                "name": "乔海峰",
                "phone": "15234806387",
                "head_photo": "https://m.ringpu.com/assets/images/user/201608/D2E08E81AF973C191E0D207D0E2114AA_HD.png",
                "skill": "猪 疫病预防 实验室诊断 临床诊断 生物安全控制 遗传育种 场舍建设 饲养管理 动物营养",
                "major_skill": "猪",
                "title": "乔海峰",
                "subtitle": "乔海峰",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.43613842481102,
                "longitude": 116.21999519906007,
                "vitae": ""
            },
            {
                "id": 3622,
                "name": "于小勇",
                "phone": "17736196658",
                "head_photo": "https://m.ringpu.com/assets/images/user/201606/2531C7102095AD1284FCFADB18092CEC_HD.png",
                "skill": "羊 饲养管理",
                "major_skill": "羊",
                "title": "于小勇",
                "subtitle": "于小勇",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.3209573437604,
                "longitude": 117.17396065572927,
                "vitae": ""
            },
            {
                "id": 3946,
                "name": "于彦君",
                "phone": "13305350387",
                "head_photo": "https://m.ringpu.com/assets/images/user/201607/A6078408342CAF4AE23C5C2801EE7663_HD.png",
                "skill": "肉鸡 疫病预防  临床诊断 生物安全控制  场舍建设 饲养管理  生产效益分析 笼养肉鸡的饲养管理",
                "major_skill": "肉鸡",
                "title": "于彦君",
                "subtitle": "于彦君",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.099186383285186,
                "longitude": 116.68064213408188,
                "vitae": ""
            },
            {
                "id": 12123,
                "name": "于江伟",
                "phone": "18678807971",
                "head_photo": "https://m.ringpu.com/assets/images/user/201704/069024AB892DFB0419F9EE9D5BE11C71_HD.png",
                "skill": "鸡 疫病预防  临床诊断 生物安全控制  场舍建设 饲养管理 动物营养 生产效益分析",
                "major_skill": "鸡",
                "title": "于江伟",
                "subtitle": "于江伟",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.910047384453961,
                "longitude": 116.87219264464089,
                "vitae": ""
            },
            {
                "id": 328,
                "name": "于洪意",
                "phone": "18773377388",
                "head_photo": "https://m.ringpu.com/assets/images/user/201604/246E1C487C9A7E4992CDE2F1181FAEE4_HD.png",
                "skill": "猪 疫病预防 实验室诊断 临床诊断    饲养管理 动物营养",
                "major_skill": "猪",
                "title": "于洪意",
                "subtitle": "于洪意",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.273104816387928,
                "longitude": 116.24909226999111,
                "vitae": ""
            },
            {
                "id": 3748,
                "name": "于特权",
                "phone": "13991025681",
                "head_photo": "https://m.ringpu.com/assets/images/user/201606/76659DAD557A8A5DE6FA6AFD62887E5D_HD.png",
                "skill": "猪 疫病预防  临床诊断   场舍建设",
                "major_skill": "猪",
                "title": "于特权",
                "subtitle": "于特权",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.200290209758236,
                "longitude": 116.60244493745381,
                "vitae": ""
            },
            {
                "id": 3403,
                "name": "于英良",
                "phone": "13832125030",
                "head_photo": "https://m.ringpu.com/assets/images/user/201605/5A4C7A43ABE4B8A122FC02ECD4FFFC53_HD.png",
                "skill": "鸡 疫病预防 实验室诊断 临床诊断    饲养管理",
                "major_skill": "鸡",
                "title": "于英良",
                "subtitle": "于英良",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.557318107070088,
                "longitude": 116.60973622417531,
                "vitae": "县级拔节人才，多篇论文"
            },
            {
                "id": 5518,
                "name": "于金龙",
                "phone": "18845660677",
                "head_photo": "https://m.ringpu.com/assets/images/user/201609/E5C7BE6FD924604AFAD1AC2D305715BA_HD.png",
                "skill": "鸡 疫病预防  临床诊断 生物安全控制  场舍建设   生产效益分析",
                "major_skill": "鸡",
                "title": "于金龙",
                "subtitle": "于金龙",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.207199300321378,
                "longitude": 116.30648938180249,
                "vitae": ""
            },
            {
                "id": 2679,
                "name": "于长海",
                "phone": "15542467877",
                "head_photo": "https://m.ringpu.com/assets/images/user/201605/601C488C55AB8AAC45D39B6049665D9B_HD.png",
                "skill": "肉鸡 饲养管理",
                "major_skill": "肉鸡",
                "title": "于长海",
                "subtitle": "于长海",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.242417186662749,
                "longitude": 116.77071674222626,
                "vitae": ""
            },
            {
                "id": 3780,
                "name": "云泉",
                "phone": "13910651238",
                "head_photo": "https://m.ringpu.com/assets/images/user/201606/8B36173A6F4ED4210756E3DBC3473BE0_HD.png",
                "skill": "猪 饲养管理",
                "major_skill": "猪",
                "title": "云泉",
                "subtitle": "云泉",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.947755272527111,
                "longitude": 116.77259085195726,
                "vitae": ""
            },
            {
                "id": 11100,
                "name": "亳州天达一张辉",
                "phone": "15956789711",
                "head_photo": "https://m.ringpu.com/assets/images/user/201703/CDA0F90503EA23894B48C568430DD361_HD.png",
                "skill": "蛋鸡 疫病预防  临床诊断     动物营养",
                "major_skill": "蛋鸡",
                "title": "亳州天达一张辉",
                "subtitle": "亳州天达一张辉",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.929472835752868,
                "longitude": 116.56599640379008,
                "vitae": ""
            },
            {
                "id": 15393,
                "name": "付方岐",
                "phone": "15898246292",
                "head_photo": "https://m.ringpu.com/assets/images/user/201709/C91617BC39EE2AAAECBF32558D6807F4_HD.png",
                "skill": "猪 疫病预防   生物安全控制   饲养管理",
                "major_skill": "猪",
                "title": "付方岐",
                "subtitle": "付方岐",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.039386326051037,
                "longitude": 116.68679515788648,
                "vitae": ""
            },
            {
                "id": 5044,
                "name": "何生",
                "phone": "15360191826",
                "head_photo": "https://m.ringpu.com/assets/images/user/201608/792289137341E3ECD6810BC5CEE20D84_HD.png",
                "skill": "猪 疫病预防  临床诊断 生物安全控制  场舍建设 饲养管理 动物营养 生产效益分析",
                "major_skill": "猪",
                "title": "何生",
                "subtitle": "何生",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.129029943719054,
                "longitude": 116.93218369983704,
                "vitae": ""
            },
            {
                "id": 5072,
                "name": "何酬运",
                "phone": "13536160868",
                "head_photo": "https://m.ringpu.com/assets/images/user/201703/76DAA9E95976814C50F2EC0419A064C1_HD.png",
                "skill": "鸡 临床诊断",
                "major_skill": "鸡",
                "title": "何酬运",
                "subtitle": "何酬运",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.094550075104721,
                "longitude": 116.98618423351375,
                "vitae": ""
            },
            {
                "id": 1128,
                "name": "何金星",
                "phone": "13072252285",
                "head_photo": "https://m.ringpu.com/assets/images/user/201703/8CEB64B67ED9AEB5F9C366747DA93330_HD.png",
                "skill": "全科 疫病预防 实验室诊断 临床诊断 生物安全控制  场舍建设 饲养管理 动物营养 生产效益分析",
                "major_skill": "全科",
                "title": "何金星",
                "subtitle": "何金星",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.157626028762962,
                "longitude": 117.11688188301254,
                "vitae": ""
            }
        ];
        if(po.accuracy > 0 && this.vets.length === 0){
            //this.fetchVets(this.pageIndex);
        }
    }
}

didiStore = new DidiStore();
export default didiStore