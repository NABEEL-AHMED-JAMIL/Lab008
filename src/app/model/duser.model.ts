import { Account }  from './dAccount';


export class Duser {

   constructor(
      id:string,
      email:string,
      firstName:string,
      account:Account,
      accountId: number,
      active: boolean,
      admin: boolean,
      attorney: boolean,
      calendarId:string,
      canAccessBilling: boolean,
      canCompleteOthersTask:boolean,
      canCreateActivity:boolean,
      canCreateConsult:boolean,
      canCreateExpense:boolean,
      canCreateMatter:boolean,
      canCreatePayment:boolean,
      canEditActivityOthers:boolean,
      canEditActivitySelf:boolean,
      canEditConsult:boolean,
      canEditExpense:boolean,
      canEditMatter:boolean,
      canEditPayment:boolean,
      canEditTask:boolean,
      dContact:string,
      etag:string,
      isHR:boolean,
      kind:string,
      lastLogin:number,
      lastName:string,
      oauthId:number,
      profilePic:string,
      showTutorial:boolean,
      userPhoneNumberExt: string
      ){}

}
