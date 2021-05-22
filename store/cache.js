const cache = () => {
    let filename = '';
    return {
        getfilename: () => {
            return filename;
        },
        setFileName: (fname) => {
            filename = fname
        }

    }
}
module.exports = cache;