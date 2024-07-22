
interface LoginProps {
    username: string;
    password: string;
}


const authProvider = {
    login: async ({ username, password }: LoginProps) => {
        const request = new Request('http://localhost:4000/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
          });

        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }

        const { token } = await response.json();
        localStorage.setItem('authToken', token);
    },
    logout: () => {
        localStorage.removeItem('authToken');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('authToken') ? Promise.resolve() : Promise.reject();
    },
    checkError: (error: any) => {
        const status = error.status
        if(status === 401 || status === 403) {
            localStorage.removeItem('authToken');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
}

export default authProvider;