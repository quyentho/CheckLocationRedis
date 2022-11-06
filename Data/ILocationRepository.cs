using CheckLocations.Models;

namespace CheckLocations.Data;
public interface ILocationRepository
{
    Task SetLocationAsync(Location location);

    Task<string[]> GetAllCitiesAsync();

    Task<string[]> GetAreasFromCityAsync(string city);

    // Task<bool> CityExists(string city);
}