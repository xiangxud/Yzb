// 接口服务器地址
const apiPath = 'http://120.24.89.243/imm/api/'; // 开发服务器（外网）
// const apiPath = 'http://103.254.113.10:9090/api/'; // 生产服务器（外网）
//const apiPath = 'http://192.168.0.103/RP.Imm.WebUI/api/';

// web服务器地址
 const webPath = 'http://120.24.89.243/imm/'; // 开发服务器（外网）
//const webPath = 'http://103.254.113.10:9090/web/'; // 生产服务器（外网）
//
// 其他
// const apiPath = 'http://192.168.0.103:2000/'; // 周明刚
// const webPath = 'http://192.168.0.204:3000/'; // 王启志
const bohaiApi = 'http://120.24.89.243:8092/api/'



const urls = {
    apiPath,
    webPath,

    /**
     *  网页
     */
    pages: {
        // 隐式声明
        DECLARE: webPath + 'declare.html',
        // 用户协议
        PROTOCOL: webPath + 'protocol.html',
        // 关于养殖宝
        ARTICLE_GETARTICLE: webPath + 'about.html',
        // 检测新版本
        LATEST_VERSION: webPath + 'apk/version.json',
    },
    /**
     *  接口
     */
    apis: {

        // 通用信息 ---------------------------------------------------------

        //获取区县
        REGION_COUNTY_LIST: apiPath + 'common/getCountyList',
        //获取城市列表
        REGION_CITY_LIST: apiPath + 'common/getCityList',

        // 意见反馈
        FEEDBACK_SUBMIT: apiPath + 'common/feedback',
        ALERT_MESSAGE: apiPath + 'common/myMessage',

        //首页-------------------------------------------------------------------------
        //首页统一数据
        HOME_ALL: apiPath + 'public/getHomeData',
        //首页头条资讯列表
        HOME_INFORMATION_LIST: apiPath + 'home/getInformationList',

        // 兽医 ----------------------------------------------------------------------
        // 附近兽医
        DIDI_NEARBY_VETS: apiPath + 'vet/getVets',

        // 资讯 ----------------------------------------------------------------------

        //获取资讯栏目
        INFORMATION_CATEGORY: apiPath + 'info/getInformationCategories',
        //资讯列表
        INFORMATION_LIST: apiPath + 'info/getInfoPagers',


        // 我的收藏 ----------------------------------------------------------------------

        //获取我的收藏列表
        COLLECTION_COLLECTION_LIST: apiPath + 'user/getMyCollectionList',
        //删除(取消)我的收藏
        COLLECTION_DELETE_COLLECTION: apiPath + 'user/deleteMyCollection',




        //搜索------------------------------------------------------------------------
        //全部搜索
        SEARCH_ALL: apiPath + 'search/searchAll',
        SEARCH_DOCTOR: apiPath + 'search/searchDoctor',
        SEARCH_INFORMATION: apiPath + 'search/searchInformation',

        //文章------------------------------------------------------------------------
        //回复
        CMS_POST_COMMENT:apiPath + "info/Publish",
        //获取文章信息
        //CMS_ARTICLE:apiPath + "info/GetArticle",
        //获取文章列表
        CMS_ARTICLE_LIST:apiPath + "info/fetchInfos",
        CMS_ARTICLE_QUOTES:apiPath + 'info/getQuotes',

        //用户------------------------------------------------------------------------

        //验证手机号
        USER_CHECKPHONEREGISTERED: apiPath + 'user/checkPhoneRegistered',
        //发送验证码
        USER_SENDCODE: apiPath + 'user/sendCode',
        //验证验证码
        USER_CHECKCODE: apiPath + 'user/checkCode',
        //注册
        USER_REGISTER: apiPath + "user/register",
        //登录
        USER_LOGIN: apiPath + "auth/login",
        //获取用户信息
        USER_GETLOGINUSER: apiPath + 'public/myinfo',
        //获取指定用户信息
        USER_GETUSER: apiPath + 'user/getUser',
        //重置密码
        USER_RESETPASSWORD: apiPath + "user/resetPassword",
        //基本信息
        USER_SETUSERBASEINFO: apiPath + "user/setUserBaseInfo",
        //签到
        USER_SIGNIN: apiPath + "user/signIn",

        //获取用户信息
        USER_DETAIL: apiPath + 'user/accountInfo',
        //修改用户信息
        USER_UPDATEUSERINFO: apiPath + 'user/updateUserInfo',
        //搜索用户
        USER_SEARCH: apiPath + 'user/searchUser',
        //栋舍首页
        STYBASIC: apiPath + 'sty/GetStyHome',






        //渤海监测-----------------------------------------------------------
        //获取所有养殖场（搜索）
        BH_FARMS: apiPath + 'bh/getfarms',
        BH_BREEDS: apiPath + 'bh/getPoultryBreeds',
        BH_TEST_TYPES: apiPath + 'bh/getTestTypeDetails',
        BH_APPROVE_USERS: apiPath + 'bh/getApprovers',
        BH_IS_SALES: apiPath + 'bh/isSales',
        BH_POST_SHEET: apiPath + 'bh/postSheet',
        BH_GET_SHEETS: apiPath + 'bh/getSheets',
        BH_GET_SHEET: apiPath + 'bh/getSheet',
        BH_GET_TESTING_REPORTS: apiPath + 'bh/getReports',





        //免疫宝-------------------------------------------------------------
        //栋舍信息
        IMM_STYBASIC: apiPath + 'sty/GetStyHome',
        //字典列表
        IMM_DICTIONARY:apiPath + 'Dictionary/Get',
        //栋舍创建
        IMM_STYADD:apiPath + 'sty/Post',
        //获取栋舍详情
        IMM_GET_STY_BASE:apiPath + 'Sty/Get',
        //栋舍提交
        IMM_POST_STY:apiPath + 'sty/modify',
        //获取免疫提醒
        IMM_GET_DETAIL:apiPath + 'ImmPlan/PostQuery'
    },
    // 获取图片完整路径
    getImage(filePath, width, height){
        let url = this.apis.IMAGE + '?filePath=' + filePath;
        if (width)
            url += '&w=' + width;
        if (height)
            url += '&h=' + height;
        // console.log(url);
        return url;
    },
};
export default urls;