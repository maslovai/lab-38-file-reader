const multer = require('multer');
const bodyParser = require('body-parser');
const upload = multer({dest: `${__dirname}/../../../temp`});

module.exports = (req, res, next) => {
    let contentType = req.headers['content-type'];
    let a = contentType.indexOf('multipart/form-data')
    // console.log('in body parser', a);
    if (contentType.indexOf('application/json') >=0){
        return bodyParser.json()(req, res, next)
    }

    if (contentType.indexOf('multipart/form-data') >=0){
        // console.log('in body parser, upload', upload.any(req, res, next));
        return upload.any()(req, res, next)
    }
}