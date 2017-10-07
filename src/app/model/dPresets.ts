import { DTask } from './dTask';
import { DQuestion } from './dQuestion';
export class Presets {
    public id:any;
    public title: String;
    public description: String;
    public questionnaires: Array<DQuestion> = new Array();
    public checklists: Array<DTask> = new Array();
    

}