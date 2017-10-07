import {Duser} from './duser.model';

export class DApiAuthToken {
  
  constructor(
    public id: number,
    public token: string,
    public date: Date,
    public user: Duser){}
}