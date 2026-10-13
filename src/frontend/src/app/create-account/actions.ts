import { CreateUserState } from "./form";

export default function createUserAction(prevState: CreateUserState, formData: FormData) {
  const newState: CreateUserState = {
    email: prevState.email,
    emailError: "",
    password: prevState.email,
    passwordError: "",
    username: prevState.email,
    usernameError: "",
  }
  return newState;

}
