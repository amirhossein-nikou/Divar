const multer = require('multer');
const fs = require('fs');
const path = require('path');
const createHttpError = require('http-errors');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        fs.mkdirSync(path.join(process.cwd(), "public","upload",),{recursive:true})
        cb(null,"public/upload")
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        const whiteFormatList = [".jpg",".jpeg",".webp",".png"];
        if(whiteFormatList.includes(ext)){
            const filename = Date.now() + ext
            cb(null,filename)
        }else{
            cb(new createHttpError.BadRequest(""),null)
        }
    }
})
const upload = multer({
    storage,
    limits:{
        fileSize: 10*1000*1000
    }
})
module.exports = {
    upload
}