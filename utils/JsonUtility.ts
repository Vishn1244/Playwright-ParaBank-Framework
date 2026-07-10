import * as fs from 'fs';
import * as path from 'path';

export class JsonUtility {

    private static readonly filePath = path.join(
        process.cwd(),
        'data',
        'users',
        'user.json'
    );

    static saveUser(username: string, password: string): void {

        const user = {
            username,
            password
        };

        fs.writeFileSync(
            JsonUtility.filePath,
            JSON.stringify(user, null, 4),
            'utf8'
        );
    }

    static getUser(): { username: string; password: string } {

        const file = fs.readFileSync(
            JsonUtility.filePath,
            'utf8'
        );

        return JSON.parse(file);
    }
}