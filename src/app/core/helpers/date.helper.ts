export function toIsoString(date: Date) {
    const pad = function (num: number) {
        return (num < 10 ? '0' : '') + num;
    };

    return (
        date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        ' ' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes()) +
        ':' +
        pad(date.getSeconds())
    );
}
