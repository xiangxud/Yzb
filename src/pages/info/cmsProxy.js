import React from 'react';
class cmsProxy {
    publish = (code,content) => {
        return new Promise(function (resolve, reject) {
            request.postJson(urls.apis.CMS_Publish, {
                code: code,
                content:content
            }).then((data) => {
                resolve(data);
            }).catch((error)=>{
                reject(error)
            }).done();
        });
    }
};
export default new cmsProxy();