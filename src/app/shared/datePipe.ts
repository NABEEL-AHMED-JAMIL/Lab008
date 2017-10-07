import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateFormat'
})
export class DateFormat implements PipeTransform {
    transform(value: any, args: string[]): any {
        if (value) {
            //var date = value instanceof Date ? value : new Date(value);
            return this.formateDate(value);
        }
    }

    // formate  the date  yyyy-mm-dd
    public formateDate(dateObj): String {
        var myDate = new Date();
        myDate.setTime(dateObj);
        // add +1 for show proper month
        let month: String = (myDate.getMonth() + 1) + "";
        let date: String = myDate.getDate() + ""
        // if length of month and date is 1 then append 0 on left side 
        month = (month.length == 1 ? month = "0" + month : month);
        date = (date.length == 1 ? date = "0" + date : date);
        return (myDate.getFullYear()) + '-' + month + '-' + date;
    }

}