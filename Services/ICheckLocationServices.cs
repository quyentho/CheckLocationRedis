using CheckLocations.Dtos;

namespace CheckLocations.Services
{
    public interface ICheckLocationServices
    {
        Task<List<CheckLocationsResponse>> CheckLocationsAsync(string[] addresses);
    }
}