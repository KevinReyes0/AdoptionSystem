import multer from 'multer';
import {dirname, extname, join} from "path";
import  {fileURLToPath} from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MYMETYPES = ["image/jpeg", "image/png", "image/jpg"]; 
const MAX_SIZE = 10000000;

const createMulterConfig = (destinationPath) =>{
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const fullPath = join(CURRENT_DIR, destinationPath);
                req.filePath = fullPath;
                cb(null, fullPath);
            },
            filename: (req, file, cb) => {
                const fileExtension = extname (file.originalname);
                const fileName = file.originalname.spliy(fileExtension)[0];
                cb(null, `${filename}-${Date.now()}${fileExtension}`);
            } 
        }),
        fileFilter:(req, file, cb) => {
            if(MYMETYPES.includes(file.mimetype)) cb (null, true);
            else cb(new Error(`Only ${MYMETYPES.join(" ")} mimetypes are allowed`))
        },
        limits: {
            fileSIze: MAX_SIZE
        }

        
    })
}

export const uploadProfilePicture = createMulterConfig("../public/uploads/profile-picture");
export const uploadPetPicture = createMulterConfig("../public/uploads/pet-pictures");

