"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
let pin = 1234;
let ans = await inquirer_1.default.prompt({
    name: 'pinNumber',
    type: 'number',
    message: 'Enter PIN number =  ',
});
console.log(ans.pinNumber);
