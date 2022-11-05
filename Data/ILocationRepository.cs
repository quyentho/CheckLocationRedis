using CheckLocations.Models;

namespace CheckLocations.Data;
public interface ILocationRepository
{
    Task SetLocationAsync(string city, string area);
    Task<List<Location>?> GetLocationsByCity(string city);
}