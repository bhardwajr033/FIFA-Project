const query = `SELECT City,count(City) as matches FROM worldCupMatches group by City;`;
module.exports = query;