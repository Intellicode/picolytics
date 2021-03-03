
interface PicolyticsObject {
    (...args: string[]): void;
    q: string[][];
}

// Pass window as parameter is slightly faster and minimizes better
(function(window: Window) {
    const picolyticsObject = window.picolyticsObject;
    const queue = (window[picolyticsObject as "pl"] as PicolyticsObject).q || [];
    
    const functions  = {
        'pageview': () => {
            console.log('pageview')
        },
        'create': () => {
            console.log('created')
        },
        'event': () => {
            console.log('event')
        }
    }

    const picolyticsFunction: PicolyticsObject = Object.assign((...args: string[]) => {
        const [functionName, ...functionArgs]: string[] = args;
        if (functions[functionName as keyof typeof functions]) {
            functions[functionName as keyof typeof functions].apply(this as any, functionArgs as any);
        }
    }, {"q": [] as string[][] });

    window[picolyticsObject as "pl"] = picolyticsFunction;

  // process existing queue
  queue.forEach((i: string[]) => window[picolyticsObject as "pl"].apply(this, i));

})(window);
