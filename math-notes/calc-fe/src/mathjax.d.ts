declare global {
    interface MathJax {
      Hub: {
        Queue: (commands: any[]) => void;
        Config: (config: any) => void;
      };
      // Add any additional properties or methods here if needed
    }
  
    interface Window {
      MathJax: MathJax;
    }
  }
  
  // This line is necessary to treat this file as a module
  export {};
  