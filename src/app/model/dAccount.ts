
import { Settings } from './dSettings';
import { DTask } from './dTask';
import { DQuestion } from '../model/dQuestion';

export class Account {

    public id: String;
    public googleId: String;
    public lollyFolder: String;
    public contactsFolder: String;
    public mattersFolder: String;
    public libraryFolder: String;
    public templatesFolder: String;
    public trialExpire: Number;
    public customerId: String;
    public billId: String;
    public billEmail: String;
    public last4: String;
    public offices: Array<String>;
    public fileTracker: boolean;
    // firm attribute
    public firmLogoCB: String;
    public firmNameCB: String;
    public googleEmail: String;
    public firmCal: String;
    public defaultAlertEmail: String;
    public firmFax: String;
    public customUrl: String;
    private addressl1:String;
    private addressCity:String;
    //------------
    public firmSupportURLCB: String;
    public showCaseBalance: boolean;
    public showCaseProgress: boolean;
    public useCB: boolean;
    public eventTypes: Array<String>;
    public notifyAllAssigned: boolean;
    public useMatterCopy: boolean;
    public contactInfoBlocks: Array<String>;
    public contactPreset: Number;
    public secondaryStatuses: Array<String>;
    public defaultTasksCB: Array<String>;
    public defaultTasksToPrimary: boolean;
    public reconcileAtClose: boolean;
    public userDisplayPref: Number;
    public lastBillingCycleSweep: Number;
    public settings: Settings;
    public taskSets: Array<DTask>;
    // new fileds
    public questionnaires: Array<DQuestion>;

}