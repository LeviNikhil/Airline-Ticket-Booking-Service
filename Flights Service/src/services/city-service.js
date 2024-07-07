const {StatusCodes} = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const cityRepository = new CityRepository();

async function createCity(data) {
    try {
      const city = await cityRepository.create(data);
      return city;
    } catch (error) {
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        "Cannot create a new City Object!",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async function updateCity(id, data) {
    try {
      const response = await cityRepository.update(id, data);
      return response;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
          "For the request you made, there is no city / column available to update!",
          error.statusCode
        );
      }
      throw new AppError(
        `The city's data cannot be updated!`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function destroyCity(id)
{
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode==StatusCodes.NOT_FOUND)
        {
            throw new AppError('City you reuqested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities() {
    try {
      const cities = await cityRepository.getAll();
      return cities;
    } catch (error) {
      throw new AppError(
        "Data for all cities cannot be retrieved!",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

module.exports = {
    createCity,
    updateCity,
    destroyCity,
    getCities
    
}