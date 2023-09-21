export function downLoadFile(data: any, fileName = 'excel.xlsx') {
    const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    let blob = new Blob([ data ], { type: type });
    let url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
}
