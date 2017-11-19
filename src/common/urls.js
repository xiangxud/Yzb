// 接口服务器地址
 const apiPath = 'http://120.24.89.243/imm/api/'; // 开发服务器（外网）
// const apiPath = 'http://103.254.113.10:9090/api/'; // 生产服务器（外网）

// web服务器地址
 const webPath = 'http://120.24.89.243/imm/'; // 开发服务器（外网）
//const webPath = 'http://103.254.113.10:9090/web/'; // 生产服务器（外网）
//
// 其他
// const apiPath = 'http://192.168.0.103:2000/'; // 周明刚
// const webPath = 'http://192.168.0.204:3000/'; // 王启志



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


        //获取用户信息
        USER_DETAIL: apiPath + 'user/accountInfo',
        //修改用户信息
        USER_UPDATEUSERINFO: apiPath + 'user/updateUserInfo',
        //搜索用户
        USER_SEARCH: apiPath + 'user/searchUser',


        //搜索------------------------------------------------------------------------
        //全部搜索
        SEARCH_ALL: apiPath + 'search/searchAll',
        SEARCH_DOCTOR: apiPath + 'search/searchDoctor',
        SEARCH_INFORMATION: apiPath + 'search/searchInformation',

        // 注册登录(老)
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
        USER_GETLOGINUSER: apiPath + 'uc/get',
        //获取指定用户信息
        USER_GETUSER: apiPath + 'user/getUser',
        //重置密码
        USER_RESETPASSWORD: apiPath + "user/resetPassword",
        //基本信息
        USER_SETUSERBASEINFO: apiPath + "user/setUserBaseInfo",
        //签到
        USER_SIGNIN: apiPath + "user/signIn",
        //cms
        CMS_Publish:apiPath + "cms/Publish"
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