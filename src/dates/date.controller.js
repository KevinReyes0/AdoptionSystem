import User from '../users/user.model.js'
import Date from './date.model.js'

export const saveCita = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({email: data.email});
        
        if(!user){
            return res.status(404).json({
                succes: false,
                message: 'Email no encontrado'
            })
        }

        const cita = new Date({
            ...data,
            keeper: user._id
        });

        await cita.save();

        res.status(200).json({
            succes: true,
            cita
        });


    } catch (error) {
        res.status(500).json({
            succes: false,
            msj: "No se pudo agregar la cita",
            error
        })
    }
}

export const getDates = async (req, res) => {
    const {limite = 10, desde = 0} = req.query;
    const query = {status: true};

    try {
        const dates = await Date.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Date.countDocuments(query);

        res.status(200).json({
            succes: true,
            total,
            dates
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al obtener citas',
            error
        })
    }
} 