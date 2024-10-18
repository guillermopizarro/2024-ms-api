"use strict";

var _app = _interopRequireDefault(require("./app"));
var _config = _interopRequireDefault(require("./config"));
require("./database");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_app["default"].listen(_config["default"].PORT);
console.log("Server listen on port ".concat(_config["default"].PORT));