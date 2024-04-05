#! /usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
import chalk from "chalk";
let currentBalance = 10000;
let pin = 1234;
let correct = false;
let count = 1;
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
async function welcome() {
    await sleep();
    rainbowTitle.stop();
}
let rainbowTitle = chalkAnimation.rainbow(`
\t--------------------------\n\t   Welcome to CLI ATM   \n\t--------------------------`); // Animation starts
await welcome();
do {
    let ans = await inquirer.prompt({
        name: 'pinNumber',
        type: 'input',
        message: chalk.yellowBright('Please enter your PIN to proceed: '),
    });
    if (ans.pinNumber != pin) {
        if (count === 3) {
            console.log(chalk.red.bold("Your account has been temporarily locked due to three consecutive incorrect password attempts."));
            break;
        }
        else {
            console.log(chalk.red.bold("\tPlease Enter correct Pin Number"));
            count += 1;
            correct = true;
        }
    }
    else {
        // console.log(`Your current balance is: ${currentBalance}`);
        correct = false;
    }
} while (correct);
if (correct == false) {
    do {
        let select = await inquirer
            .prompt({
            type: "list",
            name: "op",
            message: "Options: \n",
            choices: ["1. Check Balance",
                "2. Deposit",
                "3. Withdraw",
                "4. Exit"]
        });
        if (select.op === "1. Check Balance") {
            console.log(chalk.rgb(0, 237, 194).bold(`\n\tYour current balance is: ${currentBalance}\n`));
        }
        else if (select.op == "2. Deposit") {
            do {
                let cashDeposit = await inquirer
                    .prompt({
                    type: "number",
                    name: "amount",
                    message: "Enter your amount = ",
                });
                var cond = false;
                if (cashDeposit.amount < 500) {
                    console.log(chalk.red.bold('Deposit amount must be at least 500. Unable to deposit.'));
                    cond = true;
                }
                else if (isNaN(cashDeposit.amount)) {
                    console.log(chalk.red.bold("Please enter a valid positive number."));
                    cond = true;
                }
                else {
                    currentBalance = currentBalance + cashDeposit.amount;
                    console.log(chalk.rgb(0, 237, 194).bold(`\n\tDeposit successful. New balance = ${currentBalance}\n`));
                }
            } while (cond);
        }
        else if (select.op === "3. Withdraw") {
            let methodAns = await inquirer
                .prompt({
                type: "list",
                name: "method",
                message: "Select a withdrawl method = ",
                choices: ["Fast Cash", "Cash Withdrawal"],
            });
            if (methodAns.method === "Fast Cash") {
                let fashCashAns = await inquirer.prompt({
                    type: "list",
                    name: "amount",
                    message: "Select amount which you want to withdraw ",
                    choices: ["1000", "2000", "5000", "10000"],
                });
                currentBalance = currentBalance - fashCashAns.amount;
                console.log(chalk.rgb(0, 237, 194).bold(`\n\tWithdrawal successful. Your remaining balance is  ${currentBalance}\t\n`));
            }
            else if (methodAns.method === "Cash Withdrawal") {
                do {
                    let cashWithdrawalMethod = await inquirer
                        .prompt({
                        type: "number",
                        name: "amount",
                        message: "Enter your amount = ",
                    });
                    var cond = false;
                    if (cashWithdrawalMethod.amount <= 0 || cashWithdrawalMethod.amount > currentBalance) {
                        console.log(chalk.red.bold('Insufficient Balance! Unable to withdraw.'));
                    }
                    else if (isNaN(cashWithdrawalMethod.amount)) {
                        console.log(chalk.red.bold("Please enter a valid positive number."));
                        cond = true;
                    }
                    else {
                        currentBalance = currentBalance - cashWithdrawalMethod.amount;
                        console.log(chalk.rgb(0, 237, 194).bold(`\n\tWithdrawal successful. Your remaining balance is : ${currentBalance}\t\n`));
                    }
                } while (cond);
            }
        }
        else if (select.op == "4. Exit") {
            console.log(chalk.rgb(0, 237, 194).bold("\n\tExiting......\t\n"));
            break;
        }
        var again = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: chalk.yellowBright("Do you want to continue? Press (y/n): ")
        });
        console.log("\n");
    } while (again.restart == 'y' || again.restart == 'Y' || again.restart == 'yes' || again.restart == 'YES');
}
