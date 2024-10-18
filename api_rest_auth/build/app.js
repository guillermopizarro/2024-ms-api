"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.set('pkg', _package["default"]);
app.set('json spaces', 4);
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));

//app.use('/users', userRoutes)
//app.use('/auth', userRoutes)
//app.use('/products', productsRoutes)
var _default = exports["default"] = app;