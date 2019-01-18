export default function (elem, klass) {
    return (` ${elem.className} `).indexOf(` ${klass} `) > -1;
}
