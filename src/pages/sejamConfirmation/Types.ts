export type Profile = {
    mobile: string,
    email: string,
    uniqueIdentifier: string,
    privatePerson: PrivatePerson,
    addresses: Array<Address>,
    accounts: Array<BankingAcount>,
    jobInfo: JobInfo,
    agent:Agent
}

export type PrivatePerson = {
    firstName: string,
    lastName: string,
    fatherName: string,
    gender: any,
    seriShChar: string,
    seriSh: string,
    serial: string,
    shNumber: string,
    birthDate: Date,
    placeOfIssue: string,
    placeOfBirth: string,
    signitureFile: SignitureFile,
}

export type BankingAcount = {
    accountNumber: string,
    type: BankingAccountType,
    sheba: string,
    bank: Bank,
    branchCode: string,
    branchName: string,
    branchCity: City,
    isDefault: isDefaultAccountType
}

export type JobInfo = {
    employmentDate: Date,
    companyName: string,
    companyAddress: string,
    companyPostalCode: string,
    companyEmail: string,
    companyWebSite: string,
    companyCityPrefix: string,
    companyPhone: string,
    jobDescription: string,
    position: string,
    companyFaxPrefix: string,
    companyFax: string,
    job: Job
}

export type Agent = {
    type: AgentType,
    expirationDate: Date,
    description: string,
    uniqueIdentifier: string,
    firstName: string
    lastName: string
    isConfirmed: boolean
}

export type SignitureFile = {
    fileName: string
}


export type Address = {
    postalCode: string,
    country: Country,
    province: Province,
    city: City,
    section: AddressSection,
    cityPrefix: string,
    remnantAddress: string,
    alley: string,
    plaque: string,
    tel: string,
    countryPrefix: string,
    mobile: string,
    emergencyTel: string,
    emergencyTelCityPrefix: string,
    email: string
}

export type Country = {
    id: number,
    name: string
}

export type Province = {
    id: number,
    name: string
}

export type City = {
    id: number,
    name: string
}

export type AddressSection = {
    id: number,
    name: string
}

export type Bank = {
    id: number,
    title: string
}

export type Job = {
    id: number,
    title: string
}

export type SejamAccountType = {
    id: number,
    title: string,
    fixedCommissionPercentage: number,
    variableCommissionPercentage: number,
    investmentDuration: number
}

export enum BankingAccountType {
    None = 'نامشخص',
    shortTermAccount = 'کوتاه مدت',
    currentAccount = 'جاری',
    savingAccount = 'قرضالحسنه'
}

export enum isDefaultAccountType {
    true = 'می باشد',
    false = 'نمی باشد'
}

export enum Gender {
    male = 'مرد',
    female = 'زن'
}

export enum AgentType {
    attorney = 'وکیل',
    province = 'ولی',
    conspiracy = 'قیم',
    prescriptive = 'وصی'
}