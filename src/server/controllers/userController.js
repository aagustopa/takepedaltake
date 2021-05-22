const userService = require('../services/userServices');

module.exports.getAllUsers = async(req, res) => {
    console.log('list of users');
    const responseObj = { status: 500, msg: 'Internal server error' };
    try {
        const data = {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        };
        const responseFromService = await userService.getAllUsers(data);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.msg = 'Users fetched succesfully';
                responseObj.status = 200;
            } else {
                responseObj.msg = 'No users found';
                responseObj.status = 404;
            }
        }
    } catch (error) {
        console.log('ERROR-userController-getAllUsers: ', error);
    }
    res.status(responseObj.status).send(responseObj);
}

module.exports.create = async(req, res) => {
    console.log('creating user');
    const responseObj = { status: 500, msg: 'Internal server error' };

    try {
        const data = req.body;
        const responseFromService = await userService.create(data);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.msg = `User created succesfully`;
            responseObj.status = 201;
            res.redirect('/');
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-userController-create ${error}`);
    }
    res.status(responseObj.status).send(responseObj);
}