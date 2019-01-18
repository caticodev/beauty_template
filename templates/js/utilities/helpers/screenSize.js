const mediumWidth = 768;
const largeWidth = 1024;
let screenSize;
let changed = false;
let currentScreen = 'small';

export default screenSize = {
    // medium
    md: () => window.matchMedia(`(min-width: ${mediumWidth}px) and (max-width: ${largeWidth - 1}px)`).matches,
    // not small (medium and large)
    ns: () => window.matchMedia(`(min-width: ${mediumWidth}px)`).matches,
    // not large (small and medium)
    nlg: () => window.matchMedia(`(max-width: ${largeWidth - 1}px)`).matches,
    // large
    lg: () => window.matchMedia(`(min-width: ${largeWidth}px)`).matches,
    changed: () => {
        let newScreen;
        if (screenSize.md()) {
            newScreen = 'medium';
        } else if (screenSize.lg()) {
            newScreen = 'large';
        } else {
            newScreen = 'small';
        }
        if (currentScreen !== newScreen) {
            changed = true;
            currentScreen = newScreen;
        } else {
            changed = false;
        }
        return changed;
    }
};
