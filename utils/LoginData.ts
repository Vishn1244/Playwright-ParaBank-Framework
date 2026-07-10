import * as fs from 'fs';
import * as path from 'path';

export class LoginData {

    static getLoginData() {

        const filePath = path.join(
            process.cwd(),
            'data',
            'login',
            'loginData.json'
        );

        const file = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(file);

        return {
            ...data,
            username: data?.validUser?.username ?? '',
            password: data?.validUser?.password ?? '',
            validUser: data?.validUser ?? {
                username: '',
                password: ''
            },
            invalidUser: data?.invalidUser ?? {
                username: '',
                password: ''
            }
        };
    }
}