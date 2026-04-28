// 3 classes users,income,expenses

export class User{

    private firstName: string;
    private lastName: string;
    private username: string;
    private email: string;
    private hashedPassword: string; // hashed 
    private userId: number; // primary key 
    private salt : string

    public constructor(firstName : string , lastName : string,username:string, email : string, password : string,salt : string ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.hashedPassword = password;
        this.userId  = 0;
        this.salt = salt
        if(this.validateEmail(email)){
            this.email = email
        }
        else{
            throw new Error("Invalid Email")
        }

    }   

    public getFirstName() : string{
        return this.firstName
    }
    public setFirstName(input: string){
        
        this.firstName = input;
        
    }
    public getUserName() : string{
        return this.username
    }
    public setUserName(input: string){
        
        this.username = input;
        
    }
    public getLastName() : string{
        return this.lastName
    }
    public setLastName(input: string){
        this.lastName = input;
        
    }
    public getEmail() : string{
        return this.email
    }
    public setEmail(input: string){

        if(this.validateEmail(input)){
            this.email = input;
        }
        
    }
    public getHashedPassword() : string{ 
        return this.hashedPassword
    }
    public setHashedPassword(input: string){
        this.hashedPassword = input;
        
    }
    public getUserId() : number{
        return this.userId 
    }
    public setUserId(newUserId:number){

        this.userId = newUserId 
    }
    private validateEmail(inputEmail : string): boolean{ // basic email validation
        const regex : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(regex.test(inputEmail)){
            return true 

        }
        return false
    }
    public getSalt() : string{
        return this.salt
    }
    public setSalt(newSalt : string){
        this.salt = newSalt
    }

}
class cashFlow {
    
    
    protected name: string;
    protected cashFlowInstance: number;
    protected dateAdded: Date;
    protected description: string;
    protected userId: number; // foreign key
    protected id : number; //primary key
    protected recurring : boolean
    protected recurringFreq: number;
    
    public constructor(name: string, cashFlowInstance : number, dateAdded : Date, description : string, userId : number,recurring: boolean,recurringFreq?: number ){
        this.name = name
        this.cashFlowInstance = cashFlowInstance
        this.dateAdded = dateAdded
        this.description = description
        this.userId = userId
        this.id = 0
        this.recurring = recurring
        if(recurringFreq){
            this.recurringFreq = recurringFreq
        }
        else{
            this.recurringFreq = -1
        }
    }

    

} 
export class Expense extends cashFlow{
    

    public constructor(expensesName: string, cost : number, dateAdded : Date, description : string, userId : number,recurring: boolean,recurringFreq?: number ){
        super(expensesName,cost,dateAdded,description,userId,recurring,recurringFreq)
       
    }
    public getExpensesName() : string{
        return this.name
    }
    public setExpensesName(input: string){
        this.name = input;
        
    }
    public getCost() : number{
        return this.cashFlowInstance
    }
    public setCost(input: number){
        this.cashFlowInstance = input;
        
    }
    public getDateAdded() : Date{
        return this.dateAdded
    }
    public setDateAdded(input: Date){
        this.dateAdded = input;
        
    }
    public getDescription() : string{
        return this.description
    }
    public setDescription(input: string){
        this.description = input;
        
    }
    public getUserId() : number{
        return this.userId
    }
    public setUserId(newUserId: number){
        this.userId = newUserId
    }
    public getExpenseId(): number{
        return this.id
    }
    public setExpenseId(newExpenseId:number){
        this.id = newExpenseId
    }
    public getRecurring() : boolean{
        return this.recurring
    }
    public setRecurring(newRecurring : boolean){
        this.recurring = newRecurring
    }
    public getRecurringFreq() : number{
        return this.recurringFreq
    }
    public setRecurringFreq(newRecurringFreq : number){
        this.recurringFreq = newRecurringFreq
    }
    

}

export class Income extends cashFlow{

  

    public constructor(name:string,earning:number,userId:number,dateAdded:Date,description : string,recurring : boolean,recurringFreq : number){
        super(name,earning,dateAdded,description,userId,recurring,recurringFreq)
    } 

    public getIncomeName() : string{
        return this.name

    }
    public setIncomeName(newName:string){
        this.name = newName
    }
    public getIncomeId() : number{
        return this.id
    }
    public setIncomeId(newIncomeId : number){
         this.id = newIncomeId
    }
    public getEarning() : number{
        return this.cashFlowInstance
    }
    public setEarning(newEarning : number){
        this.cashFlowInstance = newEarning

    }
    public getUserId() : number{
        return this.userId
    }
    public setUserId(newUserId : number){
        this.userId = newUserId
    }
    public getDateAdded() : Date{
        return this.dateAdded
    }
    public setDateAdded(newDate: Date){
        this.dateAdded = newDate
    }
    public getDescription() : string {
        return this.description
    }
    public setDescription(newDescription : string){
        this.description = newDescription
    }
    public getRecurring() : boolean{
        return this.recurring
    }
    public setRecurring(newRecurring : boolean){
        this.recurring = newRecurring
    }
    public getRecurringFreq() : number{
        return this.recurringFreq
    }
    public setRecurringFreq(newRecurringFreq : number){
        this.recurringFreq = newRecurringFreq
    }

}

