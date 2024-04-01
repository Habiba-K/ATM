import inquirer from "inquirer";

let pin : number = 1234;
let ans = await inquirer.prompt({
    name : 'pinNumber',
    type : 'number',
    message : 'Enter PIN number =  ',
});
console.log(ans.pinNumber);