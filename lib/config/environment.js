"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Solo cargar .env en desarrollo local
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
exports.config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigins: process.env.NODE_ENV === 'production'
        ? [
            'https://atomfullstack.web.app',
            'https://atomfullstack.firebaseapp.com',
            'https://atomfullstack.firebaseapp.com/',
            'https://atomfullstack.web.app/'
        ]
        : ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:8080']
};
//# sourceMappingURL=environment.js.map