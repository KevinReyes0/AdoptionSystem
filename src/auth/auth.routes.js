import { Router } from "express";
import { login, register } from "./auth.controllers.js";
import { registerValidator, loginValidator } from "../moddlewares/validator.js";
import { uploadPetPicture, uploadProfilePicture } from "../moddlewares/multer-upload.js";
import { deleteFileOnError } from "../moddlewares/deleteFileOnErros.js";
 
const router = Router();
 
router.post(
    '/login',
    loginValidator,
    login
);
 
router.post(
    '/register',
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFileOnError,
    register
);
 
export default router;