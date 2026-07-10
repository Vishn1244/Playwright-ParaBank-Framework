import { faker } from '@faker-js/faker';
import { User } from '../models/User';

export class TestDataFactory {

    static createUser(): User {

        const randomNumber = faker.number.int({
            min: 1000,
            max: 9999
        });

        return {

            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),

            phone: `9${faker.string.numeric(9)}`,

            ssn: faker.string.numeric(9),

            username: `user${randomNumber}`,

            password: 'Password@123'

        };
    }

}