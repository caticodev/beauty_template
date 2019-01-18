export default function (element) {
    return Array.from(element.parentNode.children).indexOf(element);
}
