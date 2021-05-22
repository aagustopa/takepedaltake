module.exports.validate = (schema) => {
    return async(req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

//https://evilnapsis.com/2018/01/30/js-mostrar-notificaciones-visuales-con-toastr/#:~:text=Toastr%20es%20una%20libreria%20javascript,c%C3%B3digo%20que%20usare%20de%20ejemplo.
// https://getflywheel.com/layout/best-javascript-libraries-frameworks-2020/