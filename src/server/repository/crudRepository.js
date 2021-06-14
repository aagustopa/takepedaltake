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