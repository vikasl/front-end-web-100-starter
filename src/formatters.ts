export function formatCurrency(amount: number) {
    // see MDN NumberFormat
    const formatter = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
    });
    return formatter.format(amount);
}