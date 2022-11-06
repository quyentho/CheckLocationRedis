using CheckLocations.Models;

namespace CheckLocations.Dtos;

public class CheckLocationsResponse
{
    public string Address { get; set; }

    public CheckLocationsResponse(string address)
    {
        Address = address;
    }

    public bool IsValid { get; set; } = false;
    public Location? ValidLocation { get; set; }
}