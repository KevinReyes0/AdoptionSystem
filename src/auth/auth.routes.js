import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from './auth.controllers.js';
import { vaidarCampos } from '../moddlewares/validar-campos.js';
import { existeEmail, esRoleValido } from '../helpers/db.validator.js';
const router =  Router ();

router.post(
    '/login',
    [
        check('correo', 'Este no es un correo valido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        vaidarCampos
    ],
    login
);

router.post(
    '/register',
    [
        check('nombre', 'El nonmbre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 caracters').isLength({ min: 6 }),
        check('correo', 'Este no es un correo valido').isEmail(),
        check('correo').custom(esRoleValido),
        check('phone', 'El telefono debe tner 8 numeros').isLength({min:8, max:8}),
        vaidarCampos
    ]
)

export default router;