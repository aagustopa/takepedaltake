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
    },
    update: async(dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(dataFromController.id)
                },
                model: Drone,
                projection: { __v: false },
                updateQuery: {}
            };
            if (dataFromController.firstName) data.updateQuery.firstName = dataFromController.firstName;
            if (dataFromController.lastName) data.updateQuery.lastName = dataFromController.lastName;
            if (dataFromController.email) data.updateQuery.email = dataFromController.email;
            if (dataFromController.password) data.updateQuery.username = dataFromController.username;
            if (dataFromController.birthDate) data.updateQuery.birthDate = dataFromController.birthDate;

            const responseFromDB = await crudRepository.findOneAndUpdate(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-userService-update: ${error}`);
        }
        return response;
    }
}