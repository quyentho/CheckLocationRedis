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

            // this is just possible city because area and city name maybe duplicate.
            var possibleCitiesInAddress = cities.Where(city => address.Contains(city)).ToArray();
            foreach (var possibleCity in possibleCitiesInAddress)
            {
                var areas = await _repository.GetAreasFromCityAsync(possibleCity);
                var foundArea = areas.Where(a => address.Contains(a)).FirstOrDefault();
                if (foundArea != null)
                {
                    checkResult.IsValid = true;
                    checkResult.ValidLocation = new Location(possibleCity, foundArea);
                    break;
                }
            }

            checkLocationResults.Add(checkResult);
        }

        return checkLocationResults;
    }
}