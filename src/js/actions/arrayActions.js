// Returns true or false for comparing two arrays
export function equals(arr1, arr2) {
    if (!arr2 || !arr1) return true;
    if (arr1.length != arr2.length) return true;
    return (arr1.join('') == arr2.join(''));
}
