import { UserService } from "./user.service";
import environment from "../environments/index";

export class PostService {



    //-----------GET POSTS TO SHOW ON FEED-------///
    static async feed() {
        const res = await fetch(environment.apiUrl + '/post?sort=-1', {
            headers: {
                Authorization: UserService.getToken()
            }
        })
        const json = await res.json()
        return json


    }

    //-----------GET POSTS TO SHOW ON POST PAGE-------///
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


    //-----------GET POSTS TO SHOW ON PROFILE PAGE-------///
    static async getPosts(username) {
        const res = await fetch(environment.apiUrl + `/user/${username}/posts`, {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return res.json()
    }


    //-----------SEND REQUEST TO BACKEND TO ADD "LIKE" (USER ID) TO POST-------///
    static async like(id) {
        const res = await fetch(environment.apiUrl + `/post/${id}/like`, {
            method: 'POST',
            headers: {
                Authorization: UserService.getToken(),
                'Content-Type': 'application/json',
            },
        });
        return res.json()
    }

    //-----------SEND REQUEST TO BACKEND TO REMOVE "LIKE" (USER ID) TO POST-------///
    static async unLike(postId, userId) {
        const res = await fetch(environment.apiUrl + `/post/${postId}/like/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: UserService.getToken(),
                'Content-Type': 'application/json',
            },
        })
        return res.json()
    }



    static async addComment(postId, content) {
        const res = await fetch(environment.apiUrl + `/post/${postId}/comment`, {
            method: 'PUT',
            headers: {
                Authorization: UserService.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        console.log(res)
        return res.json()
    }


    static async getComments(postId) {
        const res = await fetch(environment.apiUrl + `/post/${postId}/comment`, {
            headers: {
                Authorization: UserService.getToken()
            }
        });
        return res.json()
    }

    static async deleteComment(commentId) {
        console.log(commentId)
        const res = await fetch(environment.apiUrl + `/post/${commentId}/delete-comment`, {
            method: 'DELETE',
            headers: {
                Authorization: UserService.getToken()
            }

        })
        return res.json()
    }

    static async likeComment(id) {
        const res = await fetch(environment.apiUrl + `/comment/${id}/like`, {
            method: 'POST',
            headers: {
                Authorization: UserService.getToken(),
                'Content-Type': 'application/json',
            },
        });
        return res.json()
    }
    static async unLikeComment(commentId, userId) {
        const res = await fetch(environment.apiUrl + `/comment/${commentId}/unLike/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: UserService.getToken(),
                'Content-Type': 'application/json',
            },
        })
        return res.json()
    }






}