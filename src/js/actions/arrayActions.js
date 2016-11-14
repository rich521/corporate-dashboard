// Returns true or false for comparing two arrays
export function equals(arr1, arr2) {
	let aLength = arr1.length;
    if (aLength !== arr2.length) return true;
    for (var i = aLength - 1; i >= 0; i--) {
    	if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return true;
    }
    return false;
}
