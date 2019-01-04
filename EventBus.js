//EventBus 简单的观察者消费者模型

export function EventBus() {

    //消息队列
    this.messageQueue = []

    this.observers = {

    }

    this.observersQueue = [];

    this.onEvent = function () { }

    this.postMessage = function (message) {
        this.observersQueue.forEach(element => {
            element.onEvent(message);
        });
    }

    /**
     * 注册观察者, 观察者需要实现onEvent方法，由该方法接收消息
     * @param {*} observer 
     * @param {EventType} 观察者关心的事件类型
     */
    this.register = function (observer, EventType) {
        this.observersQueue.push(observer);
    }

    /**
     * 解除观察者
     * @param {*} observer 
     */
    this.unregister = function (observer) {
        this.observersQueue.splice(this.observersQueue.indexOf(observer));
    }

    return this;
}

// 事件类型，Event将会根据观察者关心的事件类型进行消息分发
export class EventType {
    message;
}


