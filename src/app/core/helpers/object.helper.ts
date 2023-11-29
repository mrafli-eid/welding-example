export function removeEmptyObject(obj: object): object {
    const result = {};
    Object.entries(obj).forEach(([k, v]) => {
        if (v !== null && v !== '') {
            result[k] = v;
        }
    });

    return result;
}

export function notNull(input: any) {
    return input !== null && input !== undefined;
}

export function jsonToQueryParams(json: any) {
    return (
        '?' +
        Object.keys(json)
            .map(function (key) {
                return (
                    encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(json[key])
                );
            })
            .join('&')
    );
}
