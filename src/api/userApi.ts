const UserAPI = {
   login: (email: string, password: string) =>
      fetch('http://localhost:5173/api/user/token/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email,
            password: password,
         }),
      }),
   register: () => {},
   get: () => {},
};

export { UserAPI };
