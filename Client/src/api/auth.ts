import axiosClient from "../utils/axiosClient";

// Mock API service for authentication
export const authApi = {
  async login(username:string, email: string, password: string) {
    // Simulate API call
    if (!email || !password) {
      throw new Error("Invalid credentials");
    }
    const data = {
      username,
      email,
      password
    }
    const LoginApi = axiosClient.post("/api/v1/login",data)

    return {
      LoginApi
    };
  },

  async signup(email: string, password: string, name: string) {
    // Simulate API call

    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const SignUp = await axiosClient.post("/api/v1/register")

    return {
      SignUp
    };
  },
};
