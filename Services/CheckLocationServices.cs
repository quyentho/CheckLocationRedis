using CheckLocations.Data;
using CheckLocations.Dtos;
using CheckLocations.Models;

namespace CheckLocations.Services;
public class CheckLocationServices : ICheckLocationServices
{
    private readonly ILocationRepository _repository;

    public CheckLocationServices(ILocationRepository repository)
    {
        this._repository = repository;
    }

    public async Task<List<CheckLocationsResponse>> CheckLocationsAsync(string[] addresses)
    {
        string[] cities = await _repository.GetAllCitiesAsync();
        List<CheckLocationsResponse> checkLocationResults = new List<CheckLocationsResponse>();
        foreach (var address in addresses)
        {
            var checkResult = new CheckLocationsResponse(address);

            // this is just possible cities because area and city name maybe duplicate.
            var possibleCitiesInAddress = cities.Where(city => address.Contains(city)).ToArray();
            foreach (var possibleCity in possibleCitiesInAddress)
            {
                var areas = await _repository.GetAreasFromCityAsync(possibleCity);

                // find all matches instead of 1, because:
                // eg: Correct Area: "Al Faiha" and "Al Faiha something"
                // address contains "Al Faiha something else" which will matches with "Al Faiha" 
                // but may not what we want.
                var foundAreas = areas.Where(a => address.Contains(a));
                if (foundAreas.Any())
                {
                    checkResult.IsDeliverable = true;
                    checkResult.ValidLocations = foundAreas.Select(area => new Location(possibleCity, area)).ToList();
                    break;
                }
            }

            checkLocationResults.Add(checkResult);
        }

        return checkLocationResults;
    }
}