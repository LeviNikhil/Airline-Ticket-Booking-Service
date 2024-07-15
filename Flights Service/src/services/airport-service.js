const {StatusCodes} = require('http-status-codes');

const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch(error) {
        throw new AppError('Cannot fetch data of all airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND)
        {
            throw new AppError('Airport you reuqested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data) {
    try {
      const response = await airportRepository.update(id, data);
      return response;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
          "For the request you made, there is no airport / column available to update!",
          error.statusCode
        );
      }
      throw new AppError(
        `The airport's data cannot be updated!`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function destroyAirport(id)
{
    try {
        const response = await airportRepository.destroy(id);
        console.log(response);
        return response;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND)
        {
            throw new AppError('Airport you reuqested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    updateAirport,
    destroyAirport
}