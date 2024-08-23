export function getSortedRandomValues(): number[] {
    // Generate two random values between 0 and 100
    const rand1 = Math.random() * 100;
    const rand2 = Math.random() * 100;

    // Sort the two random values
    const [first, second] = [rand1, rand2].sort((a, b) => a - b);

    // Calculate the three values
    const value1 = first;
    const value2 = second - first;
    const value3 = 100 - second;

    // Return sorted values in ascending order
    return [Math.round(value1), Math.round(value2), Math.round(value3)].sort(
        (a, b) => a - b
    );
}
