using CheckLocations.Models;

namespace CheckLocations.Services;
public class CsvServices : ICsvServices
{
    public List<Location> ReadLocationsFromFile(IFormFile csvFile)
    {
        if (csvFile is null) throw new ArgumentNullException(nameof(csvFile));

        var locations = new List<Location>();
        using (var stream = csvFile.OpenReadStream())
        using (StreamReader sr = new StreamReader(stream))
        {
            sr.ReadLine(); // remove headers
            string currentCity = string.Empty;
            while (!sr.EndOfStream)
            {
                string[]? cols = sr.ReadLine()?.Split(',');

                if (cols is null) throw new ArgumentNullException(nameof(csvFile));

                var location = new Location();
                if (cols[0] != string.Empty)
                {
                    currentCity = cols[0];
                }

                if (currentCity == string.Empty)
                {
                    throw new Exception("Invalid file format, first row must contains city");
                }
                location.City = currentCity;
                location.Area = cols[1];

                locations.Add(location);
            }
        }
        return locations;
    }
}