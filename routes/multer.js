const multer=require('multer');
const {v4:uuidv4}=require('uuid');//uuidv4 provide unique name for each image
const path=require('path');//inbuilt in node js provides extensions to file

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },

    filename: function (req, file, cb) {
      const uniquename=uuidv4();
      cb(null, uniquename+path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage });
  module.exports=upload;