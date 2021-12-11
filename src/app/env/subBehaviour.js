import {BehaviorSubject } from 'rxjs'
const imagesubcriber = new BehaviorSubject({})
const imageService ={
    send : function (image){
        imagesubcriber.next(image)
    }
}

export{
    imageService,
    imagesubcriber
}
