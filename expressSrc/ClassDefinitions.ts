// need to implement validation

export class User{

    private firstName: string;
    private lastName: string;
    private username: string;
    private email: string;
    private password: string;
    private userId: number; // primary key 

    public constructor(firstName : string , lastName : string,username:string, email : string, password : string ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.userId  = 0;
        this.email = email

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
    public getPassword() : string{ 
        return this.password
    }
    public setPassword(input: string){
        this.password = input;
        
    }
    public getUserId() : Number{
        return this.userId 
    }
    public setUserId(newUserId:number){

        this.userId = newUserId 
    }
    private validateEmail(inputEmail : string): boolean{ // basic email validation
        const regex : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/
        if(regex.test(inputEmail)){
            return true 

        }
        return false
    }

}

export class Expense{
    // might have to recurring part
    private expensesName: string;
    private cost: number;
    private dateAdded: Date;
    private description: string;
    private userId: number; // foreign key
    private expenseId : number; //primary key

    public constructor(expensesName: string, cost : number, dateAdded : Date, description : string, userId : number ){
        this.expensesName = expensesName
        this.cost = cost
        this.dateAdded = dateAdded
        this.description = description
        this.userId = userId
        this.expenseId = 0
    }
    public getExpensesName() : string{
        return this.expensesName
    }
    public setExpensesName(input: string){
        this.expensesName = input;
        
    }
    public getCost() : number{
        return this.cost
    }
    public setCost(input: number){
        this.cost = input;
        
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
        return this.expenseId
    }
    public setExpenseId(newExpenseId:number){
        this.expenseId = newExpenseId
    }


}

export class Income{

    private incomeName: string;
    private incomeId: number;
    private earning: number;
    private userId: number;
    private dateAdded: Date;

    public constructor(name:string,incomeId: number,earning:number,userId:number,dateAdded:Date){
        this.incomeName = name
        this.incomeId = incomeId
        this.earning = earning
        this.userId = userId
        this.dateAdded = dateAdded
    }

    public getIncomeName() : string{
        return this.incomeName

    }
    public setIncomeName(newName:string){
        this.incomeName = newName
    }
    public getIncomeId() : number{
        return this.incomeId
    }
    public setIncomeId(newIncomeId : number){
         this.incomeId = newIncomeId
    }
    public getEarning() : number{
        return this.earning
    }
    public setEarning(newEarning : number){
        this.earning = newEarning

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
}

