const { getApplication } = require('./baseApplication');
const { logi } = require('./baseUtils');
const app = getApplication();
//是否输出插桩方法调用栈
const DEBUG_STACK_MODE = false;
var index = 0;

//同来统计方法调用的时间间隔，用来优化性能
function logTime(arg) {

    if (!DEBUG_STACK_MODE) {
        return;
    }

    index++;

    let current_date = new Date();

    let offsetTime = 0;
    if (app && app.globalData.lastTimeLogFunctionCallTime !== 0) {
        if (app.globalData.startTotalTime == 0) {
            app.globalData.startTotalTime = current_date.getTime();
        }
        offsetTime = current_date.getTime() - app.globalData.lastTimeLogFunctionCallTime;
    }

    let desc = current_date.getMinutes() + "分" + current_date.getSeconds() + '秒' + current_date.getMilliseconds() + "毫秒";

    if (app && app.globalData.startTotalTime != 0) {
        let totalStartTime = new Date(current_date.getTime() - app.globalData.startTotalTime);
        desc += ", 启动总耗时: " + totalStartTime.getMinutes() + "分" + totalStartTime.getSeconds() + "秒" + totalStartTime.getMilliseconds() + "毫秒";
    }
    if (offsetTime != 0) {
        let time = new Date(offsetTime);
        desc += ", 与上一次调用的差值为: " + time.getSeconds() + "秒" + time.getMilliseconds() + "毫秒";
        if (DEBUG_STACK_MODE) {
            let currentCallStack = (new Error).stack;
            desc += ", 当前的调用栈为: " + currentCallStack;
        }
    }

    logi('TIME_TAG ==> ' + index + (arg ? " " + arg : "") + ' 当前方法的调用时间为: ' + desc);

    if (app) {
        app.globalData.lastTimeLogFunctionCallTime = current_date.getTime();
    }
}

module.exports = {
    logTime
}