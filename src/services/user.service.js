
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
        return res.json()
    }







}


