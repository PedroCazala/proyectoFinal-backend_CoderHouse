import multer from 'multer'

// const storage = multer.diskStorage({
//     // destination:(req,file,cb)=>{
//     //     cb(null,'/public/uploads')
//     // },
//     filename:(req,file,cb) => {
//         cb(null,file.originalname)
//         console.log(file);
//     }
// })
let storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${req.body.name}.jpg`)
    }
})

export const upload = multer({storage:storage})
