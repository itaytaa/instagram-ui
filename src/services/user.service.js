
import Cookies from 'js-cookie';
import enviroment from '../environments/index';

export class UserService {

    static getToken() {
        return Cookies.get('instagram-user')
    }

    static async me() {
        const res = await fetch(enviroment.apiUrl + '/user/me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: UserService.getToken()
            },
        })

        if (res.status !== 200) {
            return null;
        }
        return res.json(); // to use user details to show avatar and details in App
    }

    static register(values) {
        console.log(values)
        return fetch(enviroment.apiUrl + '/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

    }

    static login(values) {
        return fetch(enviroment.apiUrl + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

    }

    static async getUser(username) {
        const res = await fetch(enviroment.apiUrl + `/user/${username}`, {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return res.json()

    }

    static async search(username) {
        const res = await fetch(enviroment.apiUrl + `/user?username=${username}`, {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        console.log(res)
        return res.json()
    }


    static async edit(values, userId) {
        const data = new FormData();
        if (values.image) {
            data.append('image', values.image);
        }
        data.append('username', values.username);
        data.append('email', values.email);
        data.append('bio', values.bio);
        const res = await fetch(enviroment.apiUrl + `/user/edit/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: UserService.getToken()
            },
            body: data
        })
        return res.json()
    }


    static async follow(id) {
        const res = await fetch(enviroment.apiUrl + `/user/${id}/follow`, {
            method: 'POST',
            headers: {
                Authorization: UserService.getToken()
            }
        })
        return res.json()

    }
    static async unFollow(id) {
        const res = await fetch(enviroment.apiUrl + `/user/${id}/unFollow`, {
            method: 'POST',
            headers: {
                Authorization: UserService.getToken()
            }
        })
        return res.json()

    }

}


