import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

    constructor(private mensajesServices: MensajesService){

    }

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        //return 'Mensaje Creado';
        this.mensajesServices.createMensaje(createMensajeDto).then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la creacion del mensaje'});
        });
    }

    @Get()
    getAll(@Res() response){
        //return 'lista de mensajes';
        this.mensajesServices.getAll().then(mensajesList => { 
            response.status(HttpStatus.OK).json(mensajesList);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtención de los mensajes'});
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje){
        //return 'Mensaje Actualizado';
        this.mensajesServices.updateMensaje(idMensaje, updateMensajeDto).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje)
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la actualización del mensaje'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje){
        //return 'Mensaje Eliminado';
        this.mensajesServices.deleteMensaje(idMensaje).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la eliminación del mensaje'});
        });
    }

}
