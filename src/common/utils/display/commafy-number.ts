export const commafyNumber = (num: number | string): string => {
  if (isNaN(+num)) {
    console.error('commafyNumber error: argument is not a number');
    return;
  }
  let counter = 0;
  let intString = num.toString();
  let decString = '';
  if (intString.includes('.')) {
    const decIndex = intString.indexOf('.');
    decString = intString.substring(decIndex);
    intString = intString.substring(0, decIndex);
  }
  for (let i = intString.length; i > 0; i--) {
    if (counter === 3) {
      intString = intString.substring(0, i) + ',' + intString.substring(i);
      counter = 0;
    }
    counter++;
  }
  return intString + decString;
};
