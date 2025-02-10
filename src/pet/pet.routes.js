import { Router } from "express";
import { check } from "express-validator";
import { savePet, getPets, searchPet, deletePet} from "./pet.controller.js";
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
    savePet
)

router.get("/", getPets)

router.get(
    "/:id",
    [   
        validarJWT,
        check("id", "No es un id Valido").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un id Valido").isMongoId(),
        validarCampos         
    ],
    deletePet
)


export default router;