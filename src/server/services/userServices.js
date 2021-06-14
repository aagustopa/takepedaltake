const crudRepository = require('../repository/crudRepository');
const User = require('../models/db/userModel');
const mongoose = require('mongoose');

module.exports = {
    create: async(dataFromController) => {
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
}