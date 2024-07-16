export function generateCodeFromUniqueId(uniqueId: string): string {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';

    // Convert the unique ID to a hash-like string
    let hash = 0;
    for (let i = 0; i < uniqueId.length; i++) {
        hash = (hash << 5) - hash + uniqueId.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    // Convert the hash to a base-36 string (using 0-9 and A-Z)
    let base36Hash = Math.abs(hash).toString(36).toUpperCase();

    // Take the last 4 characters of the base-36 string
    base36Hash = base36Hash.slice(-4);

    // Ensure the base36Hash is exactly 4 characters long
    if (base36Hash.length < 4) {
        base36Hash = base36Hash.padStart(4, '0');
    }

    // Map the base-36 characters to the desired characters set
    for (let i = 0; i < base36Hash.length; i++) {
        const char = base36Hash.charAt(i);
        code += characters.includes(char) ? char : characters[0];
    }

    return code;
}
