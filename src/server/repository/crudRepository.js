module.exports.find = async(data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.find(data.findQuery, data.projection).skip(data.skip).limit(data.limit);
        responseObj = {
            result: docs,
            status: true
        };
    } catch (error) {
        responseObj.error = error;
        console.log('ERROR-crudRepository-find: ', error);
    }
    return responseObj;
}

module.exports.save = async(objToSave) => {
    let responseObj = { status: false };
    try {
        const doc = await objToSave.save();
        responseObj = {
            result: doc,
            status: true
        };
        console.log(responseObj);
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-crudRepository-save: ${error}`);
    }
    return responseObj;
}