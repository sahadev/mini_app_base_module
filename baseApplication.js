// 基础的Application 全局管理入口
const util = require('./baseUtils');

let applicationInstance = null;
let eventObserver = null;

function Application() {
    this.globalData = {
    };
}

function MFApp(applicationParams) {
    App(applicationParams);
}


function registObserver(observer) {
    eventObserver = observer;
}


function MFPage(pageParams) {
    pageParams.setMFData = function (pageData) {
        if (util.hasUndefinedValue(pageData)) {
            // TODO 接入监控
            util.loge('setMFData方法的参数有undefined的值，请检查确认，并做校验');
            return;
        }
        this.setData(pageData);
    }

    /**
     * 显示消息提示框
     */
    pageParams.showToast = function (title, icon, duration = 2000, mask = false) {
        if (eventObserver && eventObserver.showToast) {
            eventObserver.showToast(title, icon, duration = 2000, mask = false);
        } else {
            throw new Error("该方法未注册！")
        }
    }

    /**
     * 隐藏消息提示框
     */
    pageParams.hideToast = function () {
        if (eventObserver && eventObserver.hideToast) {
            eventObserver.hideToast();
        } else {
            throw new Error("该方法未注册！")
        }
    }

    /**
     * ​显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
     */
    pageParams.showLoading = function (title) {
        if (eventObserver && eventObserver.showLoading) {
            eventObserver.showLoading(title);
        } else {
            throw new Error("该方法未注册！")
        }
    }

    /**
     * ​隐藏 loading 提示框
     */
    pageParams.hideLoading = function () {
        if (eventObserver && eventObserver.hideLoading) {
            eventObserver.hideLoading();
        } else {
            throw new Error("该方法未注册！")
        }
    }

    /**
     * ​显示操作菜单
     * @param {Object} itemList 
     */
    pageParams.showActionSheet = function (itemList) {
        if (eventObserver && eventObserver.showActionSheet) {
            eventObserver.showActionSheet(itemList);
        } else {
            throw new Error("该方法未注册！")
        }
    }


    /**
     * 将页面滚动到目标位置。
     */
    pageParams.pageScrollTo = function (scrollTop, duration) {
        if (eventObserver && eventObserver.pageScrollTo) {
            eventObserver.pageScrollTo(scrollTop, duration);
        } else {
            throw new Error("该方法未注册！")
        }
    }

    /**
     * 动态设置当前页面的标题。
     */
    pageParams.setTitle = function (title) {
        if (eventObserver && eventObserver.setTitle) {
            eventObserver.setTitle(title);
        } else {
            throw new Error("该方法未注册！")
        }
    }

    Page(pageParams);
}

function getMFApp() {
    return getApp();
}

//获取Application的实例
function getApplication() {
    if (!applicationInstance) {

        applicationInstance = new Application();

        /**
         * 用户获取原生App实例的全局变量
         */
        applicationInstance.getNativeAppGlobalData = function () {
            applicationInstance.app = getMFApp();
            return applicationInstance.app.globalData;
        }

        /**
         * 用户获取全局变量，例如fromSource等
         */
        applicationInstance.getGlobalData = function () {
            return getApplication().globalData;
        }

        applicationInstance.getMFPages = function () {
            return getCurrentPages();
        }

        applicationInstance.getCurrentPage = function () {
            let pages = getCurrentPages();
            return pages[pages.length-1];
        }
    }

    return applicationInstance;
}

module.exports = {
    MFApp, MFPage, getApplication, registObserver
}