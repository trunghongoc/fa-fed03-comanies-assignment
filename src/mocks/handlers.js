import { rest } from "msw";

import { userController } from "./controllers/users";

export const handlers = [
  // Handles a POST /login request
  rest.post("/login", null),
  // Handles a GET /user request
  rest.get("http://localhost:3002/user", userController.getMe),
];
