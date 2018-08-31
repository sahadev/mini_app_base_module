const DEBUG_MODE = true;

//与业务无关的基础公共组件
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function logi() {
    if (DEBUG_MODE) {
        console.info(...arguments);
    }
}

function logDebugInfo() {
    if (DEBUG_MODE) {
        console.log(...arguments);
    }
}

function loge() {
    if (DEBUG_MODE) {
        console.error(...arguments);
    }
}

function createUUID() {
    return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function hasUndefinedValue(obj) {
    for (let t in obj) {
        if (obj[t] == undefined) {
            return true;
        }
    }
    return false
}


module.exports = {
    formatTime, logDebugInfo, logi, loge, createUUID, hasUndefinedValue, DEBUG_MODE
}
