import { BehaviorSubject } from 'rxjs'

const cartCountSubscriber = new BehaviorSubject(0);

const cartCountService = {
    send: function (count) {
        cartCountSubscriber.next(count);
    }
}

export {
    cartCountService,
    cartCountSubscriber
}