using System.ComponentModel.DataAnnotations;

namespace CheckLocations.Dtos;

public class CheckLocationsRequest
{
    [Required]
    public string[] Addresses { get; set; }
}