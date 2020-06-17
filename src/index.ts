import './styles.css';
import { formatCurrency } from './formatters';

const tipPercentage = .20;



const btnCalculate = document.getElementById('btnCalculate') as HTMLButtonElement;
const txtAmount = document.getElementById('txtAmount') as HTMLInputElement;
const spnBillAmount = document.getElementById('spnBillAmount') as HTMLSpanElement;
const spnTipPercentage = document.getElementById('spnTipPercentage') as HTMLSpanElement;
const spnTipAmount = document.getElementById('spnTipAmount') as HTMLSpanElement;
const spnTotal = document.getElementById('spnTotal') as HTMLSpanElement;


btnCalculate.addEventListener('click', handleCalculate);

updateUi({
    billAmount: 0,
    tipAmount: 0,
    tipPercentage,
    total: 0
})

function handleCalculate() {
    const amount = txtAmount.valueAsNumber;
    const summary = getSummary(amount);
    updateUi(summary);
    txtAmount.select();
    txtAmount.focus();
}

export interface SummaryInfo {
    billAmount: number;
    tipPercentage: number;
    tipAmount: number;
    total: number;
}

function updateUi(summary: SummaryInfo) {
    spnBillAmount.innerText = formatCurrency(summary.billAmount);
    spnTipPercentage.innerText = (summary.tipPercentage * 100) + '%';
    spnTipAmount.innerText = formatCurrency(summary.tipAmount);
    spnTotal.innerText = formatCurrency(summary.total);
}

export function getSummary(billAmount: number) {
    const tip = billAmount * tipPercentage;
    return {
        billAmount,
        tipPercentage,
        tipAmount: tip,
        total: billAmount + tip
    } as SummaryInfo;
}
