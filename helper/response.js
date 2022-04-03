exports.response_message = ({
  res,
  statusCode,
  success,
  message,
  result,
  error,
}) => {
  let obj = {
    success: success,
    message: message,
    result: result,
    error: error,
  };
  return res.send(obj);
};
