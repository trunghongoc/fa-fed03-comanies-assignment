import { getMe } from "./getMe";

interface IUserController {
  getMe: any;
}
export const userController: IUserController = {
  getMe,
};
