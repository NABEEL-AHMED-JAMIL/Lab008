import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'QuestionnaireFilterPipe',
})
export class QuestionnaireFilterPipe implements PipeTransform {
    
    transform(fileds: any[], input: any) {
        // fileds [{id: "", label: "", value: ""}...] 
        console.log("Value "+ fileds + "Input " + input);
        if (input) {
            input = input.toLowerCase();
            return fileds.filter((el: any) => {
                console.log(el);
                return el['label'].toLowerCase().indexOf(input) > -1;
            })
        }
        return fileds;
    }
}