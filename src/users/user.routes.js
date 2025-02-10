import {Router} from "express";
import {check} from "express-validator";
import {getUsers, getUserById, updateUser, deleteUser} from './user.controller.js';
import {existeUsuarioById} from '../helpers/db.validator.js';
import {validarCampos} from '../moddlewares/validar-campos.js';
import { uploadProfilePicture } from "../moddlewares/multer-upload.js";
import { tieneRole } from "../moddlewares/validar-roles.js";
import { validarJWT } from "../moddlewares/validar-jwt.js";

const router = Router();

router.get("/", getUsers)

router.get(
    "/findeUser/:id",
    [
        check("id", "No es un Id valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    getUserById
)

router.put(
    "/:id",
    uploadProfilePicture.single('profilePicture'),
    [
        check("id", "No es un Id valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    updateUser
)

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
        check("id", "No es un Id válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    deleteUser
)

export default router;