import {KeyValuePair} from '../model/keyValuePair';
import { DTask } from '../model/dtask';
export class MatterDetail {
  
  constructor(
    public balance: number,
    public receipts: KeyValuePair[],
  ){}
}
