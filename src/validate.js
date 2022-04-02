import { object, string } from "yup";

let userSchema = object({
  name: string().required(),
  userName: string().required().min(4),
  password: string().required().min(8),
});

export default {userSchema}