"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
// GET /api/users/:email - Buscar usuario por email
router.get('/:email', userController.findByEmail);
// POST /api/users - Crear nuevo usuario
router.post('/', userController.create);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map