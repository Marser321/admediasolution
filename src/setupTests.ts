import { Window } from "happy-dom";

const window = new Window();
const document = window.document;

// @ts-ignore
global.window = window;
// @ts-ignore
global.document = document;
// @ts-ignore
global.navigator = { userAgent: "node.js" };
// @ts-ignore
global.console = console;
// @ts-ignore
global.requestAnimationFrame = (callback: any) => setTimeout(callback, 0);
// @ts-ignore
global.cancelAnimationFrame = (id: any) => clearTimeout(id);

// Add fetch polyfill if needed
// global.fetch = fetch;
