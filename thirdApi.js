//负责与平台基础api交互
/**
 * Created by Flame on 2016/10/9.
 */
const utils = require('./baseUtils');
//用于将来的关键api监控
const monitorManager = require('./baseMonitorManager');

function wxApi(key) {
    return wxGenPromise(key, {})
}

function showToast(title, icon, duration = 2000, mask = false) {
    let reqData = {
        title: title,
        icon: icon,
        duration: duration,
        mask: mask
    }
    return wxGenPromise('showToast', reqData)
}

function hideToast() {
    wx.hideToast()
}

function showActionSheet(itemList) {
    let reqData = {
        itemList: itemList
    }
    return wxGenPromise('showActionSheet', reqData)
}

function reportMonitor(name, value) {
    wx.reportMonitor(name, value);
}

function showModal(title, content, confirmText, confirmColor, showCancel, cancelText, cancelColor) {
    const modalBuilder = new ModalBuilder();
    modalBuilder.setTitle(title);
    modalBuilder.setContent(content);
    modalBuilder.setCancelColor(cancelColor);
    modalBuilder.setCancelText(cancelText);
    modalBuilder.setConfirmColor(confirmColor);
    modalBuilder.setConfirmText(confirmText);
    modalBuilder.setShowCancel(showCancel);
    return wxGenPromise('showModal', modalBuilder.create())
}

function ModalBuilder() {
    const obj = {};

    this.setTitle = function (title) {
        if (title)
            obj.title = title;
    }

    this.setContent = function (content) {
        if (content)
            obj.content = content;
    }

    this.setShowCancel = function (showCancel) {
        if (showCancel)
            obj.showCancel = showCancel;
    }

    this.setCancelText = function (cancelText) {
        if (cancelText)
            obj.cancelText = cancelText;
    }

    this.setCancelColor = function (cancelColor) {
        if (cancelColor)
            obj.cancelColor = cancelColor;
    }

    this.setConfirmText = function (confirmText) {
        if (confirmText)
            obj.confirmText = confirmText;
    }

    this.setConfirmColor = function (confirmColor) {
        if (confirmColor)
            obj.confirmColor = confirmColor;
    }

    this.setSuccess = function (success) {
        if (success)
            obj.success = success;
    }

    this.create = function () {
        return obj;
    }
}


function chooseImage(count, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']) {
    let reqData = {
        count: count,
        sizeType: sizeType,
        sourceType: sourceType
    }
    return wxGenPromise('chooseImage', reqData)
}

function makePhoneCall(phoneNumber) {
    let reqData = {
        phoneNumber: phoneNumber
    }
    return wxGenPromise('makePhoneCall', reqData)
}

function wxUploadFile(uploadBody) {
    wx.uploadFile(uploadBody);
}

function requestPayment(timeStamp, nonceStr, pkg, signType, paySign, appId) {
    let reqData = {
        timeStamp: timeStamp + '',
        nonceStr: nonceStr,
        package: pkg,
        signType: signType,
        paySign: paySign,
        appId: appId
    }
    console.log("requestPayment", reqData)
    return wxGenPromise('requestPayment', reqData)
}

/**
 * 发起微信api请求
 * @param apiKey
 * @param reqData
 * @returns {*}
 */
function wxGenPromise(apiKey, reqData) {
    return new Promise((resolve, reject) => {
        reqData['success'] = function (res) {
            resolve(res)
            // 监控示例
            monitorManager.reportRequestSuccess(apiKey);
        }
        reqData['fail'] = function (res) {
            reject(res)
            // 监控示例
            monitorManager.reportRequestFailed(apiKey);
        }
        wx[apiKey](reqData)
    })
}

function setStorage(key, data, success, fail, complete) {
    wx.setStorage({ key: key, data: data, success: success, fail: fail, complete: complete });
}

function getStorage(key, success, fail, complete) {
    wx.getStorage({ key: key, success: success, fail: fail, complete: complete });
}

function setStorageSync(key, data) {
    wx.setStorageSync(key, data)
}

function getStorageSync(key) {
    return wx.getStorageSync(key)
}

function removeStorageSync(key) {
    return wx.removeStorageSync(key)
}

function clearStorageSync() {
    return wx.clearStorageSync()
}

function clearStorage() {
    wx.clearStorage();
}

function getLocation() {
    let reqData = {
        type: 'wgs84'
    }
    return wxGenPromise('getLocation', reqData)
}

function getUserInfo() {
    return wxGenPromise('getUserInfo', {})
}

function pageScrollTo(scrollTop, duration = 300) {
    let reqData = { scrollTop, duration }
    return wxGenPromise('pageScrollTo', reqData)
}

//根据类型查找，只查找第一个匹配的。queryCallback有3个参数：dataset,width,height
function selectorQuery(_class, queryCallback) {
    var query = wx.createSelectorQuery()
    var nodesRef = query.select(_class)
    nodesRef.fields({
        dataset: true,
        size: true,
    })

    const that = this;
    nodesRef.boundingClientRect(function (rect) {
        if (queryCallback && rect) {
            queryCallback(rect.dataset, rect.width, rect.height);
        } else if (!rect) {
            //如果取到的为Null，则再走一次
            utils.logi('selectorQuery request.');
            that.selectorQuery(_class, queryCallback);
        }
    })
    setTimeout(() => {
        query.exec()
    }, 1000);
}

function pageScrollTo(num) {
    let reqData = {
        scrollTop: num
    }
    return wxGenPromise('pageScrollTo', reqData)
}

function setTitle(title) {
    if (typeof title === 'string') {
        wx.setNavigationBarTitle({ title })
    }
}

/**
 * 检查session是否有效
 */
function checkSession(successCb, failedCb) {
    wx.checkSession({
        success: function () {
            //session_key 未过期，并且在本生命周期一直有效
            utils.logi('session继续有效，直接成功回调');
            if (successCb) { successCb() }

        },
        fail: function () {
            // session_key 已经失效，需要重新执行登录流程
            utils.logi('session已过期，需要重新登录');
            if (failedCb) {
                failedCb();
            }
        }
    })
}

function showLoading(title = "加载中") {
    wx.showLoading({
        title: title,
        mask: true,
    })
}

function hideLoading() {
    wx.hideLoading();
}

/*
 * 更新购物车tab显示数量@guozhen
 */
function updateCartNum(count) {
    // 只有购物车数量大于零时才显示购物车tab数量标识
    if (count > 0) {
        // 设置购物车tab数量标识
        if (wx.setTabBarBadge) {
            wx.setTabBarBadge({
                index: 2,
                text: count.toString()
            })
        }
    } else {
        if (wx.removeTabBarBadge) {
            wx.removeTabBarBadge({
                index: 2,
            })
        }
    }
}

function getSystemInfoSync() {
    return wx.getSystemInfoSync();
}

function stopPullDownRefresh(){
    return wx.stopPullDownRefresh();
}

module.exports = {
    wxApi: wxApi,
    showToast: showToast,
    hideToast: hideToast,
    showActionSheet: showActionSheet,
    showModal: showModal,
    makePhoneCall: makePhoneCall,
    requestPayment: requestPayment,
    setStorageSync: setStorageSync,
    getStorageSync: getStorageSync,
    getLocation: getLocation,
    removeStorageSync: removeStorageSync,
    clearStorageSync: clearStorageSync,
    wxGenPromise,
    getUserInfo,
    setTitle,
    pageScrollTo,
    chooseImage,
    wxUploadFile,
    selectorQuery,
    setStorage,
    getStorage,
    clearStorage,
    checkSession,
    showLoading,
    hideLoading, reportMonitor,
    updateCartNum, ModalBuilder, getSystemInfoSync, stopPullDownRefresh
}