var soap = require('soap'); 

function ukTrains(token) {
  var url = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2016-02-16';
  var soapHeader = { AccessToken: { TokenValue: token } };

  var nationalRail = {
    'getDepartures': getDepartures,
    'getArrivals': getArrivals,
    'getAll': getAll,
    'getServiceDetails': getServiceDetails
  };

  return nationalRail;

  // ---------- Public methods ----------

  //  options = {
  //    toStation: 'MYB',
  //    count: 20,
  //    includeServiceDetails: false
  //  };

  function getDepartures(fromStation, options, callback) {
    var args = {
      crs: fromStation,
      filterType: 'to'
    };
    var call = 'GetDepartureBoard';

    if (options) {
      args.filterCrs = options.toStation;
      args.numRows = options.count;
      if (!!options.includeServiceDetails) { call = 'GetDepBoardWithDetails'; }
    }

    makeCall(call, args, callback);
  }

  //  options = {
  //    fromStation: 'MYB',
  //    count: 20,
  //    includeServiceDetails: false
  //  };

  function getArrivals(atStation, options, callback) {
    var args = {
      crs: atStation,
      filterType: 'from'
    };
    var call = 'GetArrivalBoard';

    if (options) {
      args.filterCrs = options.fromStation;
      args.numRows = options.count;
      if (!!options.includeServiceDetails) { call = 'GetArrBoardWithDetails'; }
    }

    makeCall(call, args, callback);
  }

  //  options = {
  //    count: 20,
  //    includeServiceDetails: false
  //  };

  function getAll(station, options, callback) {
    var args = {
      crs: station,
    };
    var call = 'GetArrivalDepartureBoard';

    if (options) {
      args.numRows = options.count;
      if (!!options.includeServiceDetails) { call = 'GetArrDepBoardWithDetails'; }
    }

    makeCall(call, args,  callback);
  }

  function getServiceDetails(serviceID, callback) {
    var args = {
      serviceID: serviceID,
    };
    var call = 'GetServiceDetails';

    makeCall(call, args, callback);
  }

  // ---------- Private methods ----------

  function makeCall(operation, args, callback) {
    soap.createClient(url, function(err, client) {
      client.addSoapHeader(soapHeader);
      return client[operation](args, function(err, result) {

        if (operation !== 'GetServiceDetails') {
          callback(result.GetStationBoardResult.trainServices.service);
        } else {
          callback(result.GetServiceDetailsResult);
        }


      });
    });
  }
}

module.exports = ukTrains;