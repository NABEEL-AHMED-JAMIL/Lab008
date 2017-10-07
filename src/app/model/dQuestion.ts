export class DQuestion {

    public id : any;
    public title: String;
    public name: String;
    public instruction: String;
    public questions: Array<DQuestionFiled>;
    // delete note
    public deleteAble: boolean;
    public status: String;

}

export class DQuestionFiled {

    public id: String;
    public label: String;
    public value: String;
}

//  mock data
export const QUESTIONNAIRES: DQuestion[] = [
  { id:null,name:'ADDRESS',title: 'Address', instruction: 'Current Address and Past Addresses fro the Last 5 Years', questions: [], deleteAble: true,status:"Open" },
  { id:null,name:'BIOMETRIC',title: 'Biometric', instruction: 'Personal characteristics and details about you', questions: [], deleteAble: true,status:"Open" },
  { id:null,name:'PARENTS',title: 'Parents', instruction: 'Information regarding your police record or criminal history', questions: [], deleteAble: true,status:"Open" },
  { id:null,name:'INCOME',title: 'Income', instruction: 'Qualifying information regarding your income, assests, and household', questions: [], deleteAble: true,status:"Open" },
  { id:null,name:'CRIMINAL',title: 'Criminal', instruction: 'Criminal Report', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'CHILDREN',title: 'Children', instruction: 'Children Detail', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'EDUCATION',title: 'Education', instruction: 'Education Detail', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'TRAVEL',title: 'Travel', instruction: 'Travel from to destination history', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'LASTADDRESSABROAD',title: 'Lastaddressabroad', instruction: 'Last Address Abroad', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'MARRIAGE',title: 'Marriage', instruction:  'Marriage Report', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'HISTORY',title: 'History', instruction: 'History', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'CRIMINALCONVICTION',title: 'Criminalconviction', instruction: 'Criminal Conviction', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'ARRIVAL',title: 'Arrival', instruction: 'Arrival', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'I94Entries',title: 'I94entries', instruction: 'I94entries', questions: [], deleteAble: true ,status:"Open"},
  { id:null,name:'OTHER',title: 'Other', instruction: 'Other', questions: [], deleteAble: true ,status:"Open"},

];


