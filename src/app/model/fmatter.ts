export class FMatter{

  constructor(
        public ordered: boolean,
        // filter.contactId == accountId~contact
        public contactId: string,
        // boolean = true
        public populate: boolean,
        // boolean = true
        public isActive: boolean,
        ){}
}

// filter.contactId == accountId~contact
