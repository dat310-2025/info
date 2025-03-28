"use strict";

/* BankAccount class */
class BankAccount{
    constructor(name, balance){
        this.name = name;
        this.balance = balance;
        this.log = [];
    }
    deposit(amount) {
        let oldBalance = this.balance;
        this.balance += amount;

        // log transaction
        this.log.push({
            transaction: "deposit",
            amount: amount,
            date: new Date(),
            oldBalance: oldBalance,
            newBalance: this.balance,
            success: 1  // we can always deposit
        });
    }
    withdraw(amount) {
        let oldBalance = this.balance;
        let success = 0;
        if (this.balance >= amount) {
            this.balance -= amount;
            success = 1;
        }
        else {
            console.log("Error: insufficient funds!");
        }
    
        // log transaction
        this.log.push({
            transaction: "withdraw",
            amount: amount,
            date: new Date(),
            oldBalance: oldBalance,
            newBalance: this.balance,
            success: success
        });
    }
    printLog() {
        for (let i = 0; i < this.log.length; i++) {
            console.log(this.log[i].date
                + "\t" + this.log[i].transaction
                + "\t" + this.log[i].amount
                + "\t" + this.log[i].success
                + "\t" + this.log[i].oldBalance
                + "\t" + this.log[i].newBalance);
        }
    }
}