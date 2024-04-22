interface loginUser {
  username: string;
  password: string;
}

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export { loginUser, UserData };
