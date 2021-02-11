
import Cookies from 'js-cookie';
export class UserService {


    static me() {
        const body = {
            token: Cookies.get('instagram-user')
        };
       return fetch('http://localhost:4000/user/me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            if (res.status !== 200) {
                return null;
            }
           return  res.json();
        });

    }


}


