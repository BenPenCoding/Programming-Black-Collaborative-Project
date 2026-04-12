export class User{

    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private userId: number; // prinary key 

    public constructor(firstName : string, lastName : string, email : string, password : string ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userId  = 0 // remeber to change

    }   

    public getFirstName() : string{
        return this.firstName
    }
    public setFirstName(input: string){
        
        this.firstName = input;
        
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
        this.email = input;
        
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

}

export class Expense{
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

