export class User{

    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private readonly userExpensesID: string; // prinary key 

    public constructor(firstName : string, lastName : string, email : string, password : string ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userExpensesID  = this.generatePrimaryKey(firstName,lastName)

    }   
    private generatePrimaryKey(firstName: string, lastName: string) : string{
        
        // search through database and see if there is an instance of the same name and create primary key accordingly

        return firstName + lastName

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
    public getUserExpensesID() : string{
        return this.userExpensesID
    }

}

export class Expenses{
    private expensesName: string;
    private cost: number;
    private dateAdded: Date;
    private description: string;
    private readonly userExpensesID: string; // foreign key

    public constructor(expensesName: string, cost : number, dateAdded : Date, description : string, userExpensesID : string ){
        this.expensesName = expensesName
        this.cost = cost
        this.dateAdded = dateAdded
        this.description = description
        this.userExpensesID = userExpensesID
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
    public getUserExpensesID() : string{
        return this.userExpensesID
    }



}

