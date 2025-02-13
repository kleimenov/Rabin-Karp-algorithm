/*
String searching algorithms The Rabin-Karp algorithm function
*/

const rabinKarp = (text, pattern) => {
    const d = 256; // Number of characters in the input alphabet
    const q = 101; // A prime number to use for hashing (can be increased for larger inputs)
    const m = pattern.length;
    const n = text.length;
    let p = 0; // Hash value for the pattern
    let t = 0; // Hash value for the current substring of text
    let h = 1;

    // Calculate h = d^(m-1) % q
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    // Calculate hash values for the pattern and the first window of text
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    // Slide the pattern over the text one by one
    for (let i = 0; i <= n - m; i++) {
        // Check if the hash values match
        if (p === t) {
            // If hash values match, check characters one by one
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                console.log('***************************');
                console.log(`Pattern found at index ${i}`);
                console.log('***************************');

            }
        }

        // Calculate the hash value for the next window of text
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) {
                t += q; // Ensure t is positive
            }
        }
    }
};

// Example usage
const text = "ABCCDDAEFGYYYYYYOFDDSSEEEOOO";
const pattern = "CDD";
rabinKarp(text, pattern);