const crudRepository = require('../repository/crudRepository');
const User = require('../models/db/userModel');
const mongoose = require('mongoose');

module.exports.getAllUsers = async(dataFromController) => {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {},
            model: User,
            projection: {
                __v: false
            }
        };
        if (dataFromController.skip && dataFromController.limit) {
            data.skip = dataFromController.skip;
            data.limit = dataFromController.limit;
        }

        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error) {
        console.error('ERROR-userService-findById: '.error);
    }
    return responseObj;
}

module.exports.create = async(dataFromController) => {
    const responseObj = { status: false };
    try {
        const user = new User(dataFromController);
        const responseFromRepository = await crudRepository.save(user);
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result;
            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-userService-create: ${error}`);
    }
    return responseObj;
}