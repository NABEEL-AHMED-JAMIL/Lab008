import {Duser} from '../model/duser.model';

export class Matter{

  constructor(    
    public id: number,
    public createdDate: Date,
    public receiptNum: number,
    public name: string,
    public search: string,
    public keyWords:any[],
    public contacts: any[],
    public contactName: string,
    public  open: boolean,
    public folderId: string,
    public contactType: any[],
    public updateDate: Date,
    public pending: boolean,
    public chargeForTime: boolean,
    public kind: string,
    public assignees:Duser[]){}
}
