import fs from 'fs/promises';
import {join} from 'path'

export const deleteFileOnError = async (error, removeEventListener, resizeBy, next) => {
    if(req.file && req.filePath){
        const filePath = join (req.filePath, req.file.fileame);
        try{
            await fs.unlink(filePath);

        }catch(error){
            console.error('Error deleting file: ', error)
        }


    }if(error.status === 400 || err.errors){
        return res.status(400).json({
            success: false,
            error: err.errors
        });
    }
    return res.status(500)({
        success: false,
        message: err.message
    })
}