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
                "id": 6051,
                "name": "ggggg",
                "phone": "10011112222",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "猪 疫病预防",
                "major_skill": "猪",
                "title": "ggggg",
                "subtitle": "ggggg",
                "star": 5,
                "service_count": 1,
                "clinic_year": null,
                "latitude": 38.780986175821624,
                "longitude": 116.37649553072475,
                "vitae": ""
            },
            {
                "id": 599,
                "name": "liuzhen",
                "phone": "15601136975",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "产检、各种医疗产检病",
                "major_skill": null,
                "title": "liuzhen",
                "subtitle": "liuzhen",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.636609065228427,
                "longitude": 116.22223240026378,
                "vitae": "无塑料袋科技来谁看得见历史课老师肯定录数据来谁看得见蓝思科技录数据历史课"
            },
            {
                "id": 6382,
                "name": "一起粉",
                "phone": "18702264810",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 遗传育种",
                "major_skill": "鸡",
                "title": "一起粉",
                "subtitle": "一起粉",
                "star": 0,
                "service_count": 1,
                "clinic_year": null,
                "latitude": 38.921189669068525,
                "longitude": 116.39317545238565,
                "vitae": ""
            },
            {
                "id": 4213,
                "name": "丁毛宁",
                "phone": "15924324916",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "全科 场舍建设",
                "major_skill": "全科",
                "title": "丁毛宁",
                "subtitle": "丁毛宁",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.135352426788472,
                "longitude": 116.99925715075771,
                "vitae": ""
            },
            {
                "id": 1353,
                "name": "丁邦标",
                "phone": "13851165012",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "水禽 饲养管理",
                "major_skill": "水禽",
                "title": "丁邦标",
                "subtitle": "丁邦标",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.9762785816967,
                "longitude": 116.30699967812141,
                "vitae": ""
            },
            {
                "id": 2816,
                "name": "丁飞",
                "phone": "18920795905",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 疫病预防  临床诊断",
                "major_skill": "鸡",
                "title": "丁飞",
                "subtitle": "丁飞",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.22090379350395,
                "longitude": 116.32037156807276,
                "vitae": ""
            },
            {
                "id": 1119,
                "name": "万事顺",
                "phone": "15342232798",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "猪 临床诊断",
                "major_skill": "猪",
                "title": "万事顺",
                "subtitle": "万事顺",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.581504674484727,
                "longitude": 116.96358961908314,
                "vitae": ""
            },
            {
                "id": 5411,
                "name": "万永刚",
                "phone": "13863655960",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "水禽 疫病预防  临床诊断 生物安全控制",
                "major_skill": "水禽",
                "title": "万永刚",
                "subtitle": "万永刚",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.307855141078058,
                "longitude": 116.44887846282165,
                "vitae": ""
            },
            {
                "id": 4786,
                "name": "上官",
                "phone": "13032358557",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "牛 实验室诊断 临床诊断",
                "major_skill": "牛",
                "title": "上官",
                "subtitle": "上官",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.766163052002049,
                "longitude": 117.07607429543327,
                "vitae": ""
            },
            {
                "id": 4009,
                "name": "东东",
                "phone": "18801356732",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "牛",
                "major_skill": "牛",
                "title": "东东",
                "subtitle": "东东",
                "star": 5,
                "service_count": 2,
                "clinic_year": null,
                "latitude": 38.467112296995296,
                "longitude": 116.5907053593503,
                "vitae": ""
            },
            {
                "id": 5096,
                "name": "东哥",
                "phone": "18879906012",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "猪 临床诊断",
                "major_skill": "猪",
                "title": "东哥",
                "subtitle": "东哥",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.217992618832739,
                "longitude": 116.32674471183063,
                "vitae": ""
            },
            {
                "id": 8714,
                "name": "严泽杰",
                "phone": "13934892954",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "全科 疫病预防  临床诊断",
                "major_skill": "全科",
                "title": "严泽杰",
                "subtitle": "严泽杰",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.343447879167954,
                "longitude": 116.42156875264904,
                "vitae": ""
            },
            {
                "id": 472,
                "name": "严闻振",
                "phone": "15897593948",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 疫病预防 临床诊疗",
                "major_skill": "鸡",
                "title": "严闻振",
                "subtitle": "严闻振",
                "star": 5,
                "service_count": 1,
                "clinic_year": null,
                "latitude": 38.440278925257864,
                "longitude": 116.61219479144188,
                "vitae": ""
            },
            {
                "id": 1320,
                "name": "严闻振",
                "phone": "18163558532",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 疫病预防   生物安全控制   饲养管理",
                "major_skill": "鸡",
                "title": "严闻振",
                "subtitle": "严闻振",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.962614307213862,
                "longitude": 116.45944721943674,
                "vitae": ""
            },
            {
                "id": 11117,
                "name": "丰丰",
                "phone": "13568661321",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 疫病预防",
                "major_skill": "鸡",
                "title": "丰丰",
                "subtitle": "丰丰",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.709979628128927,
                "longitude": 116.44369507247754,
                "vitae": ""
            },
            {
                "id": 5195,
                "name": "乐伟",
                "phone": "18680217710",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 疫病预防  临床诊断    饲养管理 动物营养",
                "major_skill": "鸡",
                "title": "乐伟",
                "subtitle": "乐伟",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.933020316084395,
                "longitude": 116.47840493213312,
                "vitae": ""
            },
            {
                "id": 4285,
                "name": "乐恩贝",
                "phone": "18663240007",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "猪 饲养管理 动物营养 生产效益分析",
                "major_skill": "猪",
                "title": "乐恩贝",
                "subtitle": "乐恩贝",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.101214414560808,
                "longitude": 116.80072273835573,
                "vitae": "毕业于山东畜牧兽医职业学院"
            },
            {
                "id": 5390,
                "name": "乔明虎",
                "phone": "13834701662",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 疫病预防      饲养管理",
                "major_skill": "鸡",
                "title": "乔明虎",
                "subtitle": "乔明虎",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.010434401743318,
                "longitude": 116.88438276820089,
                "vitae": ""
            },
            {
                "id": 5041,
                "name": "乔海峰",
                "phone": "15234806387",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "猪 疫病预防 实验室诊断 临床诊断 生物安全控制 遗传育种 场舍建设 饲养管理 动物营养",
                "major_skill": "猪",
                "title": "乔海峰",
                "subtitle": "乔海峰",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.285777270046893,
                "longitude": 116.51851082589408,
                "vitae": ""
            },
            {
                "id": 3622,
                "name": "于小勇",
                "phone": "17736196658",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "羊 饲养管理",
                "major_skill": "羊",
                "title": "于小勇",
                "subtitle": "于小勇",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.1273645978595,
                "longitude": 116.88360719954763,
                "vitae": ""
            },
            {
                "id": 3946,
                "name": "于彦君",
                "phone": "13305350387",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "肉鸡 疫病预防  临床诊断 生物安全控制  场舍建设 饲养管理  生产效益分析 笼养肉鸡的饲养管理",
                "major_skill": "肉鸡",
                "title": "于彦君",
                "subtitle": "于彦君",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.625138711060927,
                "longitude": 117.1825532431633,
                "vitae": ""
            },
            {
                "id": 12123,
                "name": "于江伟",
                "phone": "18678807971",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 疫病预防  临床诊断 生物安全控制  场舍建设 饲养管理 动物营养 生产效益分析",
                "major_skill": "鸡",
                "title": "于江伟",
                "subtitle": "于江伟",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.966983789613934,
                "longitude": 116.76705799632103,
                "vitae": ""
            },
            {
                "id": 328,
                "name": "于洪意",
                "phone": "18773377388",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "猪 疫病预防 实验室诊断 临床诊断    饲养管理 动物营养",
                "major_skill": "猪",
                "title": "于洪意",
                "subtitle": "于洪意",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.591840864951649,
                "longitude": 116.71230382524072,
                "vitae": ""
            },
            {
                "id": 3748,
                "name": "于特权",
                "phone": "13991025681",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "猪 疫病预防  临床诊断   场舍建设",
                "major_skill": "猪",
                "title": "于特权",
                "subtitle": "于特权",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 38.37491978215283,
                "longitude": 116.47560054383968,
                "vitae": ""
            },
            {
                "id": 3403,
                "name": "于英良",
                "phone": "13832125030",
                "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
                "skill": "鸡 疫病预防 实验室诊断 临床诊断    饲养管理",
                "major_skill": "鸡",
                "title": "于英良",
                "subtitle": "于英良",
                "star": 0,
                "service_count": 0,
                "clinic_year": null,
                "latitude": 39.0006121439443,
                "longitude": 116.77603489494699,
                "vitae": "县级拔节人才，多篇论文"
            }
        ];
        if(po.accuracy > 0 && this.vets.length === 0){
            //this.fetchVets(this.pageIndex);
        }
    }
}

didiStore = new DidiStore();
export default didiStore