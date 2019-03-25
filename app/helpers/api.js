module.exports = {
    builder(response, data) {    
        if (typeof data === 'undefined') {
          data = '';
        }
    
        if (data instanceof Error) {
          let _statusCode = 500;
          if (data.statusCode) _statusCode = data.statusCode;
          response.status(_statusCode).json({ error: data.message });
        } else response.status(200).json({ data });
      }
}