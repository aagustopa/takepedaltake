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

module.exports.findOneAndUpdate = async(data) => {
    const response = { status: 500 };
    try {
        const doc = await data.model.findOneAndUpdate(
            data.findQuery,
            data.updateQuery, { new: true, projection: data.projection, useFindAndModify: false });
        if (doc) {
            response.status = 200;
            response.result = doc;
        } else {
            response.status = 404;
        }
    } catch (error) {
        response.error = error;
        console.log(`ERROR-crudRepository-findOneAndUpdate: ${error}`);
    }
    return response;
};