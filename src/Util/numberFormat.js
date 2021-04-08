const options = {style: 'currency', currency: 'USD'};
export const numberFormat = new Intl.NumberFormat('en-US', options);

export let formatValueToUSD = (value) => {
    return numberFormat.format(value);
}