const axios = require("axios");

exports.proxy = async (request) => {
  const fetchURL = request.header('fetchURL');
  const method = request.method.toLowerCase();
  // TODO - add POST support
  // * pass headers
  // * pass post body
  try {
    const response = await axios[method](fetchURL, {
      validateStatus: status => true,
    });
    const { data, status, headers } = response;
    
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
