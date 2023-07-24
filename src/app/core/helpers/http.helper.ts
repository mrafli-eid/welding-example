export function downLoadFile(data: any, type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    let blob = new Blob([ data ], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert('Please disable your Pop-up blocker and try again.');
    }
}
