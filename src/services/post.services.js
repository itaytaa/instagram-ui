import { UserService } from "./user.service";
import environment from "../environments/index";
export class PostService {
    static async feed() {
        const res = await fetch(environment.apiUrl + '/post?sort=-1', {
            headers: {
                Authorization: UserService.getToken()
            }
        })
        const json = await res.json()
        return json


    }

    static async getPost(id) {
        try {
            const res = await fetch(environment.apiUrl + '/post/' + id, {
                headers: {
                    Authorization: UserService.getToken()
                }
            });
            return res.json()
        } catch (err) {
            console.log(err);
        }

    }
    static async getPosts(username) {
        const res = await fetch(environment.apiUrl + `/user/${username}/posts`, {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return res.json()

    }





}