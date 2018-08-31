//序列化存储管理器
const thirdApi = require("./thirdApi");

//跟网络环境有关系的，存放在此
var CONSTANT = {}

/**
 * 与网络环境没有关系的存放在此
 */
var CONSTANT_2 = {
}

//与网络环境相关的常量，常量相关的值在地址切换时将会清空
function setNetRelativeConstant(constant) {
    if (constant) {
        CONSTANT = constant
    }
}

function setConstant(constant) {
    if (constant) {
        CONSTANT_2 = constant
    }
}

function clearAllData() {
    for (const key in CONSTANT) {
        thirdApi.setStorageSync(CONSTANT[key], null);
    }
}

//存储通用方法，但key必须需要在CONSTANT或CONSTANT2中定义
function setStorageSync(key, value) {
    checkKeyenable(key);
    thirdApi.setStorageSync(key, value);
}

//读取通用方法，但key必须需要在CONSTANT或CONSTANT2中定义
function getStorageSync(key) {
    checkKeyenable(key);
    return thirdApi.getStorageSync(key);
}

//读取通用方法，但key必须需要在CONSTANT或CONSTANT2中定义
function removeStorageSync(key) {
    checkKeyenable(key);
    return thirdApi.removeStorageSync(key);
}

//异步存储方法
function setStorage(key, value, success, fail, complete) {
    checkKeyenable(key);
    thirdApi.setStorage(key, value, success, fail, complete)
}

//异步读取方法
function getStorage(key, success, fail, complete) {
    checkKeyenable(key);
    return thirdApi.getStorage(key, success, fail, complete);
}

//检查关键字有效性
function checkKeyenable(key) {
    if (key && (CONSTANT[key] || CONSTANT_2[key])) {
        return true;
    } else {
        throw new Error('key必须通过setNetRelativeConstant方法或setConstant方法提前定义, 当前使用的Key为：' + key);
    }
}

module.exports = {
    clearAllData, setStorageSync,
    getStorageSync, setStorage, getStorage, removeStorageSync,
    setNetRelativeConstant, setConstant
}