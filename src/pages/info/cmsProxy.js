import React from 'react';
class cmsProxy {
    publish = (code,content,sucess,failed) => {
        this.post(urls.apis.CMS_Publish,{code:code,content:content}).then((data)=>{
            sucess(data)
        }).catch((err)=>{
            //err.Message
            failed("网络请求失败，请检查网络设置")
        });
    };
    getArticle = (code,sucess,failed)=>{
        var url = "http://192.168.0.101/RP.Imm.WebUI/api/info/GetArticle";//urls.apis.CMS_GetArticle
        this.get(url,{code:code}).then((data)=>{
            sucess(data);
        }).catch((err)=>{
            //err.Message
            failed("网络请求失败，请检查网络设置");
        });
    };
    post = (url,p) => {
        return new Promise(function (resolve, reject) {
            request.postJson(url, p).then((data) => {
                resolve(data);
            }).catch((error)=>{
                reject(error)
            });
        });
    };
    get = (url,p) => {
        let paramsArray = [];
        Object.keys(p).forEach(key => paramsArray.push(key + '=' + p[key]));
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
        return new Promise(function (resolve, reject) {
            request.getJson(url).then((data) => {
                resolve(data);
            }).catch((error)=>{
                reject(error)
            });
        });
    };
};
export default new cmsProxy();