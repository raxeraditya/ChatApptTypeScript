// Mock API service for authentication
export const authApi = {
  async login(email: string, password: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!email || !password) {
      throw new Error('Invalid credentials');
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
    };
  },

  async signup(email: string, password: string, name: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    };
  }
};