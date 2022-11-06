using System.Text.Json;
using CheckLocations.Models;
using StackExchange.Redis;

namespace CheckLocations.Data;
public class RedisLocationRepository : ILocationRepository
{
    private readonly IDatabase _redisDatabase;
    public RedisLocationRepository(IConnectionMultiplexer redis)
    {
        _redisDatabase = redis.GetDatabase();
    }

    public async Task<string[]> GetAllCitiesAsync()
    {
        var citiesFromRedis = await _redisDatabase.SetMembersAsync("Cities");
        return citiesFromRedis.ToStringArray();
    }

    public async Task<string[]> GetAreasFromCityAsync(string city)
    {
        var areas = await _redisDatabase.SetMembersAsync(city);
        return areas.ToStringArray();
    }

    // simplest version
    public async Task SetLocationAsync(Location location)
    {
        // duplicated key - values will only exists once, so we don't have to check for existancy
        await _redisDatabase.SetAddAsync("Cities", location.City);

        await _redisDatabase.SetAddAsync(location.City, location.Area);
    }

    // public async Task<bool> CityExists(string city)
    // {
    //     return await _redisDatabase.SetCombine(city);
    // }

    // public async Task SetLocationAsync(Location location)
    // {
    //     _redisDatabase.HashSetAsync(location.City, new HashEntry[] {
    //         new HashEntry()
    //     })
    // }

}