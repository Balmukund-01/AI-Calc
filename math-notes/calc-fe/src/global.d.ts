declare global {
    interface MathJax {
        // Add properties and methods you expect MathJax to have
        typeset: () => void; // Example property
        // ...other properties
    }

    interface Window {
        MathJax: MathJax; // Use the specific type here
    }
}
export {};
