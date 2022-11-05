
using CheckLocations.Models;

namespace CheckLocations.Services;
public interface ICsvServices
{
    List<Location> ReadLocationsFromFile(IFormFile csvFile);
}