export default function init(fn, containers, ...args) {
    if (containers) {
        try {
            if (NodeList.prototype.isPrototypeOf(containers)) {
                return [...containers].map(container => fn(container, ...args));
            } else {
                return fn(containers, ...args);
            }
        } catch (e) {
            /* eslint-disable */
            console.error(e);
            /* eslint-enable */
        }
    }
    return null;
}
