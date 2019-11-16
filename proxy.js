const axios = require("axios");

exports.proxy = async (request) => {
  const method = request.method.toLowerCase();
  const reqHeaders = request.headers;
  const fetchURL = reqHeaders.fetchurl;
  console.log('fetchURL', fetchURL);

  delete reqHeaders.fetchurl;

  // TODO - add POST support
  // x pass headers
  // * pass post body
  try {
    const response = await axios[method](fetchURL, {
      headers: {
        authorization: reqHeaders.authorization,
      },
      validateStatus: status => true,
    });
    const { data, status, headers } = response;

    delete headers['cache-control'];
    delete headers['strict-transport-security'];
    
    return({
      status,
      headers,
      data,
    });
  } catch(e) {
    //throw new Error(e);
    return({error: true, name: e.name, message: e.message, status: 500});
  }
}
