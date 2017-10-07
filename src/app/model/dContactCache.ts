import { ChildrenInfromation } from './dChildrenInformation';
import { Education } from './deducation';
import { History } from './dhistory';
import { CriminalConvictions } from './dCriminalConvictions';
import { Other } from './dOther';
import { Arrivals } from './darrivals';
import { I94Entries } from './I94Entries';
import { Questionnaire } from './dQuestionnaire';
import { DTask } from './dTask';
import { Account } from './dAccount';
import { DQuestion } from './dQuestion';

export class ContactCache {
    public id: Number;
    public accountId: Number;
    //ok start
    public isLollyContact: boolean; // Ni
    public defaultAlertEmail: String; // Ni
    //
    public firstName: String; // used
    public middleName: String; // used
    public lastName: String; // used
    public birthLastName: String; // used
    public birthFirstName: String; // used
    public birthMiddleName: String; // used
    public email: String;   //NI
    public active: boolean;  // Ni
    // public etag: string;
    public phonePrimary: String; // used
    public phonePrimaryExt: Number; // used
    public phoneMobile: String; // used
    public phoneHome: String; // used
    public phoneEmergency: String; // used
    public emergencyContactName: String; // used
    public emergencyContactRelation: String; // used

    public addressMainInCareOf: String; // used
    public addressMainStreet: String; // used
    public addressMainBldType: String; // used
    public addressMainNum: Number; // used
    public addressMainCity: String; // used
    public addressMainProvince: String; // used
    public addressMainCounty: String; // used
    public addressMainState: String; // used
    public addressMainZip: String; // used
    public addressMainPostal: String; // used

    public addressMailingInCareOf: String; // used
    public addressMailingBldType: String; // used
    public addressMailingNum: Number; // used
    public addressMailingCity: String; // used
    public addressMailingProvince: String; // used
    public addressMailingCounty: String; // used
    public addressMailingState: String; // used 
    public addressMailingZip: String; // used
    public addressMailingPostal: String; // used

    public isEnglishSpeaking: String; // Ni
    public nativeLanguage: String; // used
    public gender: String; // Ni
    public birthDate: any; // Ni
    public birthDateComponent: any; // Ni
    public birthCity: String; // used
    public birthState: String; // used
    public birthProvince: String; // used
    public birthCountry: String; // used
    public ssn: String; // used
    public alienNum: String; // used
    public kind: String;    //NI

    public visaType: String; // used
    public elisnum: String; // used
    public I94Num: String; // used
    public I94FullName: String; // used
    public passportNum: String; // used
    public passportIssueDate: any; // Ni
    public passportIssueDateComponent: any; // Ni
    public passportExpireDate: any; // Ni
    public passportExpireDateComponent: any; // Ni
    public passportPlace: String; // used
    public travelDocumentNumber: String; // used
    public priorityDate: any; // Ni
    public priorityDateComponent: any; // Ni
    public everInUS: String; // used
    public arrivalUSLastEntryDate: any; // Ni
    public arrivalUSLastEntryDateComponent: any; // Ni
    public arrivalUSLastEntryPlace1: String; // used
    public arrivalUSLastEntryPlace2: String; // used
    public arrivalUSLastEntryStatus: String; // used
    public countryIssuance: String; // used
    public marriageStatus: String; // used
    public marriageStartDate: any; // Ni
    public marriageStartDateComponent: any; // Ni
    public marriageStartPlace: String; // used
    public motherLastName: String; // used 
    public motherFirstName: String; // used
    public motherMiddleName: String; // used
    public motherMaidenName: String; // used
    public motherBirthCity: String; // used
    public motherBirthCountry: String; // used
    public motherBirthDate: any; // Ni
    public motherBirthDateComponent: any; // Ni
    public motherResidenceCity: String; // used
    public motherResidenceCountry: String; // used
    public motherEmployed: String; // used
    public fatherLastName: String; // used
    public fatherFirstName: String; // used 
    public fatherMiddleName: String; // used
    public fatherBirthCity: String; // used
    public fatherBirthCountry: String; // used
    public fatherBirthDate: any; // Ni
    public fatherBirthDateComponent: any; // Ni
    public fatherResidenceCity: String;  // used
    public fatherResidenceCountry: String; // used
    public fatherEmployed: String; // used
    public spouseLastName: String; // used
    public spouseFirstName: String; // used
    public spouseMiddleName: String; // used
    public spouseMaidenName: String; // used
    public spouseImmigrationStatus: String; // used
    public spouseGender: String; // Ni
    public spouseSsn: Number; // used
    public spouseAlienNum: String; // used
    public spouseBirthDate: any; // Ni
    public spouseBirthDateComponent: any; // Ni
    public spouseBirthCity: String; // used
    public spouseBirthState: String; // used
    public spouseBirthCountry: String; // used
    public spouseCitizenship: String; // used
    public spouseCountryNationality: String; // used
    public spousePassportNum: Number; // used
    public spousePassportPlace: String; // used
    public spousePassportIssueDate: any;  // Ni
    public spousePassportIssueDateComponent: any;  // Ni
    public spousePassportExpiryDate: any;  // Ni
    public spousePassportExpiryDateComponent: any;  // Ni

    public employer: String; // used
    public jobTitle: String; // used
    public workLocations: String; // used 
    public salary: Number;  // used 
    public employFromDate: any; // Ni
    public employFromDateComponent: any; // Ni
    public employToDate: any; // Ni
    public employToDateComponent: any; // Ni
// ok end bool and date ni only input box
    public q1: String;
    public q2: String;
    public q3: String;
    public q4: String;
    public q5: String;
    public q6: String;
    public q7: String;
    public children: Array<ChildrenInfromation>; // data will be in json format
    public educations: Array<Education>;
    public histories: Array<History>;
    public criminalConvictions: Array<CriminalConvictions>;
    //  
    public others: Array<Other>;
    public arrivals: Array<Arrivals>;
    public i94Entries: Array<I94Entries>;
    // question to id
    public questionnaire: Array<Questionnaire>;
    public folderId: string;

    public tasks: Array<DTask>;
    public account:Account;
    public customQuestionnaire: Array<DQuestion>;
    public activeQuestionnaire:any;

}