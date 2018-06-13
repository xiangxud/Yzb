// 接口服务器地址
// const apiPath = 'http://192.168.43.71/breed/api/'; // 开发服务器（外网）
const apiPath = 'http://imm.ringpu.com/breed/api/'; // 生产服务器（外网）
// const apiPath = 'http://192.168.0.103/RP.Imm.WebUI/api/';

// web服务器地址
// const webPath = 'http://192.168.43.71/breed/'; // 开发服务器（外网）
const webPath = 'http://imm.ringpu.com/breed/'; // 生产服务器（外网）
//
// 其他
// const apiPath = 'http://192.168.0.103:2000/'; // 周明刚
// const webPath = 'http://192.168.0.204:3000/'; // 王启志
// const bohaiApi = 'http://120.24.89.243:8092/api/'



const urls = {
    apiPath,
    webPath,
    pages: {
        // 关于养殖宝
        ABOUT_US: webPath + 'yzb/about',
        // 联系我们
        CONTACT: webPath + 'yzb/about/contact',
        // 用户协议
        PROTOCOL: webPath + 'yzb/about/protocol',
        // 隐式声明
        DECLARE: webPath + 'yzb/about/protocol',
    },
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
        //获取文章信息
        //CMS_ARTICLE:apiPath + "info/GetArticle",
        //获取文章列表
        CMS_ARTICLE_LIST: apiPath + 'info/getInfoPager',
        CMS_ARTICLE_QUOTES: apiPath + 'info/getQuotes',
        //获取直播
        CMS_LIVE_LIST: apiPath + 'content/getLives',
        CMS_LIVE_FOCUS: apiPath + 'content/getFocusLive',

        //获得文章分类列表
        CMS_CATEGORIES: apiPath + 'info/getCategories',
        //获取收藏的文章列表
        CMS_ARTICLE_COLLECTION: apiPath + 'info/getCollectionInfos',
        //获取文章汇总
        CMS_ARTICLE_SUMMARY: apiPath + 'info/getArticleSummary',
        //文章回复
        CMS_POST_COMMENT: apiPath + 'info/postComment',
        //点赞文章
        CMS_POST_COLLECT: apiPath + 'info/postOperate',
        //获得文章详情
        CMS_GET_ARTICLE: apiPath + 'info/getUserArc',


        //用户------------------------------------------------------------------------
        //登录
        USER_LOGIN: apiPath + "auth/login",
        //发送验证码
        USER_GET_PHONE_CODE: apiPath + 'auth/getValidateCode',
        USER_GET_REBIND_CODE: apiPath + 'uc/getVcode',
        USER_REBIND: apiPath + 'uc/bind',
        UPDATE_USERLABLES:apiPath + 'uc/PostUserLables',
        //注册
        USER_REGISTER: apiPath + "auth/register",
        //获取用户信息
        USER_GET_MINE: apiPath + 'auth/getProfile',
        //修改用户信息
        USER_UPDATE_PROFILE: apiPath + 'auth/updateProfile',
        //重置密码
        USER_RESET_PASSWORD: apiPath + "auth/resetPassword",
        //获取指定用户信息
        //USER_GET: apiPath + 'user/getUser',
        //签到
        //USER_SIGN: apiPath + "user/signIn",

        //获取积分记录
        USER_SCORE_RECORD: apiPath + 'operateLog/getScoreRecord',
        //搜索用户
        //USER_SEARCH: apiPath + 'user/searchUser',


        //渤海监测-----------------------------------------------------------
        BH_GET_FARM_PARAMS: apiPath + 'bh/getFarmParams',
        BH_POST_SAVE_FARM: apiPath + 'bh/saveFarm',
        //获取所有养殖场（搜索）
        BH_FARMS: apiPath + 'bh/getFarms',
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
        IMM_STY_BASIC: apiPath + 'sty/getStyHome',
        //字典列表
        IMM_DICTIONARY:apiPath + 'dictionary/get',
        //栋舍创建
        IMM_STY_ADD:apiPath + 'sty/post',
        //获取栋舍详情
        IMM_GET_STY_BASE:apiPath + 'sty/get',
        //栋舍提交
        IMM_POST_STY:apiPath + 'sty/modify',

        IMM_STY_DAYREPORT:apiPath + 'sty/getDayRecords',

        //获取免疫提醒
        IMM_GET_DETAIL:apiPath + 'immPlan/postQuery',
        //获取出栏配置
        IMM_GET_OUT_PET_CONFIG:apiPath + 'sty/getOutPetConfig',
        //获取栋舍的历史环控数据
        IMM_GET_GetSensorHistory:apiPath + 'sty/getSensorHistory',
        //出栏
        IMM_POST_REMOVE_PET:apiPath + 'sty/postRoutine',
        //出栏
        IMM_POST_ADD_PET:apiPath + 'sty/postAddPet',
        //执行
        IMM_POST_IMPLEMENT:apiPath + 'immPlan/postImplement',
        //增加摄像头
        IMM_POST_CAMERA:apiPath + 'sty/postCamera',
        //修改摄像头
        IMM_UPDATE_CAMERA:apiPath + 'sty/updateCamera',
        //删除摄像头
        IMM_REMOVE_CAMERA:apiPath + 'sty/removeCamera',
        //设置默认摄像头
        IMM_DEFAULT_CAMERA:apiPath + 'sty/changeCamera',
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