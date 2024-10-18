"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("./config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_mongoose["default"].set('strictQuery', false);
_mongoose["default"].connect(_config["default"].MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (data) {
  return console.log('DB se encuentra conectada.');
})["catch"](function (error) {
  return console.log(error);
});