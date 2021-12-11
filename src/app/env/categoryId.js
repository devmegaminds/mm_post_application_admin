import {BehaviorSubject } from 'rxjs'
const idsubcriber = new BehaviorSubject({})
const idService ={
    send : function (categoryId){
        idsubcriber.next(categoryId)
    }
}

export{
    idService,
    idsubcriber
}
