const CrudRepository = require('./crud-repository');
const {Flight}=require('../models');


class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter,Sort){
        const response = await Flight.findAll({
            where: filter,
            order: Sort
        });
        return response;
    }
}

module.exports = FlightRepository;