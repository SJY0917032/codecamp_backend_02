import { User } from "../../models/user.model.js";

export class UserService {
  getUsers = async () => {
    const users = await User.find();
    return users;
  };
}
