function isSorted(arr: number[], isAsc: boolean): boolean {
    if (arr.length <= 1) return true;

    if (!isAsc) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) {
                return false;
            }
        }
        return true;
        } else if (isAsc) {
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] < arr[i - 1]) {
                    return false;
                }
            }
            return true;
        }
    
        // If isAsc is neither true nor false, return false by default
        return false;
    }
    
    export { isSorted };