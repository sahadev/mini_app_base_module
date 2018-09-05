//关键位置监控管理器，主要实现事件转发功能，它在底层的功能为监控api的调用情况
const baseNetManager = require('./baseNetRequestManager');
const util = require('./baseUtils');

var eventObserver = null;

// 注意：这里注册的observer必须含有reportRequestSuccess，reportRequestFailed方法。
function registObserver(observer) {
    if (observer && observer.reportRequestSuccess && typeof observer.reportRequestSuccess == "function" && observer.reportRequestFailed && typeof observer.reportRequestFailed == "function") {
        eventObserver = observer;
    } else {
        throw new Error('请检查监视器对象是否符合要求！');
    }
}

function logoutObserver(observer) {
    eventObserver = null;
}

function reportRequestSuccess(res) {
    //走网络监控
    if (eventObserver) {
        eventObserver.reportRequestSuccess(res)
    }else{
        throw new Error('未初始化监控管理器！请在app.js的onLuanch中初始化监控管理器');
    }


}
function reportRequestFailed(error) {
    //走网络监控
    util.loge('调用失败，请关注: ' + error);
    if (eventObserver) {
        eventObserver.reportRequestFailed(error)
    }else{
        throw new Error('未初始化监控管理器！请在app.js的onLuanch中初始化监控管理器');
    }
}

module.exports = {
    reportRequestSuccess, reportRequestFailed, registObserver, logoutObserver
}