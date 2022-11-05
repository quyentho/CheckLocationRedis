namespace CheckLocations.Models;
public class Location
{
    public Location() { }
    public Location(string city, string area)
    {
        City = city;
        Area = area;
    }

    public string City { get; set; }
    public string Area { get; set; }
}