FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Install curl nodejs
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl gnupg2
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt -y install nodejs

# install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install yarn

WORKDIR /app
COPY . ./

RUN dotnet restore

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
# This need to match with RootPath in Program.cs
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "CheckLocations.dll"]