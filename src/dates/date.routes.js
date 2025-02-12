import { Router } from "express";
import { check } from "express-validator";
import { saveCita, getDates } from "./date.controller.js";
import { validarCampos } from "../moddlewares/validar-campos.js";
import { validarJWT } from "../moddlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    saveCita
)

router.get ("/", getDates)


export default router;