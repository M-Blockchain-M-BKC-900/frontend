export const login = async (seed) => {
    const url = 'http://localhost:3000/auth/login';
    const formData = new URLSearchParams();
    formData.append('seed', seed);
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
    return response;
  };
  
  export const createWallet = async () => {
    const response = await fetch('http://localhost:3000/auth/create');
    return response;
  };
  