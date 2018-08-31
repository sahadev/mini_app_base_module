// 基础网络访问框架
const thirdNetApi = require('./thirdNetApi');

/**
 * 发起网络请求
 * @param url
 * @param method
 * @param data
 * @param header
 * @returns {*}
 */
function request(url, method = 'GET', data = {}, header = {}, successCB, failCB) {
    const requestBody = {
        url: url,
        header: header,
        success: function (res) {
            let statusCode = res.statusCode;
            if (statusCode == 200) {
                if (successCB) { successCB(res) }
            } else {
                if (failCB) { failCB(res) }
            }
        },
        fail: function (res) {
            if (failCB) { failCB(res) }
        },
        method: method,
        data: data,
        dataType: 'json'
    };
    thirdNetApi.wxRequest(requestBody);
}

module.exports = {
    request
}