using CheckLocations.Models;

namespace CheckLocations.Dtos;

public class CheckLocationsResponse
{

    public CheckLocationsResponse(string address)
    {
        Address = address;
    }

    public string Address { get; set; }
    public bool IsDeliverable { get; set; } = false;
    public List<Location>? ValidLocations { get; set; }
}