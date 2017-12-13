// import tools from "./tools";
import userStore from "../store/userStore";
/**
 * network request
 */
const request = {
    /**
     * GET请求，返回Json数据。
     *
     * 支持方法重载：
     * getJson(url, callback)
     * getJson(url, params, callback)
     *
     * @param url 请求地址，type：string
     * @param params 请求类型
     * @param callback 回调方法， type: function
     */
    getJson(url, params){
        return this._fetchGet(url, params);
    },

    _fetchGet(url, params){
        let _fetchGet2 = this._fetchGet2;
        return new Promise(function (resolve, reject) {
            let successCallback = (result) => {
                resolve(result)
            };
            let errorCallback = (error) => {
                //登录过期
                if (error.status == 450) {
                    //tools.showToast('认证未通过，已为您重新登录')
                    userStore.relogin(() => {
                        _fetchGet2(url, params, successCallback, errorCallback);
                    });
                }else{
                    reject(error)
                }
            };
            _fetchGet2(url, params, successCallback, errorCallback)
        })
    },

    _fetchGet2(url, params, successCallback, errorCallback){
        if (params) {
            let paramsArray = []
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //alert(url+JSON.stringify(userStore))
        fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',
                'Authorization': 'Bearer ' + userStore.token.access_token,
            }
        }).then((response) => response.json())
            .then((responseData) => {
            if (responseData.successful) {
                successCallback(responseData.data)
            } else {
                //alert(JSON.stringify(responseData))
                errorCallback(responseData);
            }
        }).catch((error) => {
            errorCallback(error);
            // tools.showToast('网络异常，请重试！')
        });
    },


    /**
     * POST请求，返回Json数据。
     *
     * 支持方法重载：
     * postJson(url, callback)
     * postJson(url, body, callback)
     * postJson(url, headers, body, callback)
     *
     * @param url 请求地址，type：string
     * @param headers 请求头，type：json
     * @param body 请求类型，type：string or json
     * @param callback 回调方法， type: function
     */
    postJson(url, params){
        return this._fetchPost(url, params, 'json');
    },

    _fetchPost(url, params, type){
        let headers = {
                'Authorization': 'Bearer ' + userStore.token.access_token,
            },
            body = null;

        if (params) {
            if (typeof params == 'object' && params.constructor == Object) {
                // let paramsArray = []
                // Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
                // body = paramsArray.join('&');
                // headers["Content-Type"] = "application/x-www-form-urlencoded";
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(params);
            } else if (typeof params == 'object' && params instanceof FormData) {
                body = params;
                headers["Content-Type"] = 'multipart/form-data';
            }
            else {
                body = params;
            }
        }
debugger;
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers,
                body
            })
                .then((response) => type == 'text' ? response.text() : response.json())
                .then((responseData) => {
                    if (responseData.successful) {
                        resolve(responseData.data)
                    }
                    else{
                        reject(responseData.message)
                    }
                })
                .catch((error) => {
                    //tools.showToast('服务器异常，请重试!');
                    reject(error);
                }).done();
        })
    },
};
export default request;