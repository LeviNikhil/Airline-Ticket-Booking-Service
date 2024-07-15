const { StatusCodes } = require('http-status-codes');

const { AirportService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /airports 
 * req-body {name: 'IGTU', Code: 'IG' }
 */
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            cityId: req.body.cityId,
            address: req.body.address,
        });
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirports(req, res) {
    try {
        const airports=await AirportService.getAirports(); 
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
method: GET request 
URL: /airports/:id
data: req.body: {id}
*/
async function getAirport(req, res) {
    try {
        const airport=await AirportService.getAirport(req.params.id); 
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
method: DELETE request 
URL: /airplanes/:id
data: req.body: {id}
*/
async function destroyAirport(req, res) {
    try {
        const airport=await AirportService.destroyAirport(req.params.id); 
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/*
method: PATCH request 
URL: /airplanes/:id
data: req.body: {id,{data}}
*/
async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirplane(
          req.params.id,
          req.body
        );
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
      } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
      }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}