const {StatusCodes} = require('http-status-codes');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
   //trips = DLI - DEL
   let customFilter = { };
   let sortFilter = {};
   const endingtriptime="23:59:00";
   if(query.trips)
   {
      [arrivalAirportId,departureAirportId]=query.trips.split('-');
      customFilter.departureAirportId=departureAirportId;
      customFilter.arrivalAirportId=arrivalAirportId;
      //TODO - add a check for that they are not same
   }
   
   if(query.price)
   {
       [minPrice,maxPrice]=query.price.split('-');
       customFilter.price={
           [Op.between]: [minPrice, (maxPrice===undefined) ? 10000 : maxPrice]
       };
   }

   if(query.travellers){
       customFilter.totalSeats={
         [Op.gte]: query.travellers
       }
   }

   if(query.tripdate){
       customFilter.departureTime={
          [Op.between]: [query.tripdate,query.tripdate+endingtriptime]
       }
   }
   
   if(query.Sort){
        const params = query.Sort.split(',');
        const sortFilters = params.map((param)=> param.split('_'));
        sortFilter = sortFilters;
   }
   try {
      const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
      return flights;
   } catch (error) {
    throw new AppError('Cannot fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR);
   }
   
}


module.exports = {
    createFlight,
    getAllFlights
}