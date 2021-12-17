import {BehaviorSubject } from 'rxjs'
const subCategoryIdsubcriber = new BehaviorSubject({})
const subCategoryIdService ={
    send : function (subCategoryId){
        subCategoryIdsubcriber.next(subCategoryId)
    }
}

export{
    subCategoryIdService,
    subCategoryIdsubcriber
}
