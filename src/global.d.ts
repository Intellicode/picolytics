
export {}

declare global {
    interface Window {
      // add you custom properties and methods
      picolyticsObject: string;
      pl: PicolyticsObject
    }
  }
