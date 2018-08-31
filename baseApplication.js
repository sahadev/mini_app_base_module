// 基础的Application 全局管理入口
const util = require('./baseUtils');

let applicationInstance = null;

function Application() {
    this.globalData = {
    };
}

function MFApp(applicationParams) {
    App(applicationParams);
}

function MFPage(pageParams) {
    Page(pageParams);
    pageParams.setMFData = function (pageData) {
        if (util.hasUndefinedValue(pageData)) {
            // TODO 接入监控
            util.loge('setMFData方法的参数有undefined的值，请检查确认，并做校验');
            return;
        }
        this.setData(pageData);
    }
}

function getMFApp() {
    return getApp();
}

//获取Application的实例
function getApplication() {
    if (!applicationInstance) {
        applicationInstance = new Application();
        applicationInstance.app = getMFApp();
        applicationInstance.globalData = applicationInstance.app.globalData;
    }

    return applicationInstance;
}

module.exports = {
    MFApp, MFPage, getApplication
}