# uk-trains
A tiny NodeJS wrapper for the National Rail SOAP api, requiring only node-soap.

The National Rail SOAP api is pretty nasty to get your head around for someone used to a RESTful architecture.  This wrapper aims to simplify the experience using callbacks and json.

## Usage

Go to `http://realtime.nationalrail.co.uk/OpenLDBWSRegistration/` and register for an api key.

After that, install this package.
```npm i uk-trains```
 
Within your NodeJS app, load the package, supply your api key, and then use the returned service. 

``` js
var ukTrains = require('uk-trains');
var rail = ukTrains('xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx')

rail.getDepartures('MYB', undefined, console.log);
```

## Public methods:

### getDepartures(fromStation, options, callback)

Get Departures from a specific station.  Optionally you can request where the services depart to, how many services to request, and whether to include specific details about each train.

**fromStation** (String) the three letter station code you are requesting departures from

**options** (Object) *optional* or `undefined` 

    toStation: (String) the three letter station code you are requesting departures to
    count: 20 (Number) the maximum number of services to request
    includeServiceDetails: (Boolean) the api can also return information about each service (train) This is usually a long request, so only use it when you need it

**callback** (Function) Function to call with the result upon completion of the request

### getArrivals(atStation, options, callback)

Get arrivals at a specific station.  Optionally you can request where the services are arriving from, how many services to request, and whether to include specific details about each train.

**atStation** (String) the three letter station code you are requesting arrivals at

**options** (Object) *optional* or `undefined` 

    fromStation: (String) the three letter station code you are requesting departures to
    count: 20 (Number) the maximum number of services to request
    includeServiceDetails: (Boolean) the api can also return information about each service (train) This is usually a long request, so only use it when you need it

**callback** (Function) Function to call with the result upon completion of the request

### getAll(station, options, callback)

Get all services relating to a station.  Optionally you can request how many services to request, and whether to include specific details about each train.

**station** (String) the three letter station code you are requesting services at

**options** (Object) *optional* or `undefined` 

    count: 20 (Number) the maximum number of services to request
    includeServiceDetails: (Boolean) the api can also return information about each service (train) This is usually a long request, so only use it when you need it

**callback** (Function) Function to call with the result upon completion of the request

### getServiceDetails(serviceID, callback)

Get specific details about an individual service (train).

**serviceID** (String) the service code you are requesting details regarding

**callback** (Function) Function to call with the result upon completion of the request

