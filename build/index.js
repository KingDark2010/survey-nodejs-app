"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv = __importStar(require("dotenv"));
var hbs_1 = __importDefault(require("hbs"));
var path_1 = __importDefault(require("path"));
dotenv.config();
var PORT = process.env.PORT || 3000;
var viewsPath = process.env.views_path || "App/Views";
// create an instance server
var app = (0, express_1.default)();
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/bootstrap', express_1.default.static(path_1.default.join(__dirname, '../node_modules/bootstrap/dist')));
//use hbs template engine
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, viewsPath, 'Layouts'));
//add hbs partials
hbs_1.default.registerPartials(path_1.default.join(__dirname, viewsPath, "Partials"));
// add routing for / path
app.get('/', function (req, res) {
    res.render('home');
});
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at prot:".concat(PORT));
});
exports.default = app;
