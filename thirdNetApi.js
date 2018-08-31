//负责与平台基础api交互
const utils = require('./baseUtils')

function wxRequest(requestBody) {
    utils.logi('这次请求的url = ' + requestBody.url);
    wx.request(requestBody);
}

module.exports = {
    wxRequest
}