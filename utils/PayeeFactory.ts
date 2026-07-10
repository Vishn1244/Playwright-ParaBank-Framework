import { faker } from '@faker-js/faker';
import { Payee } from '../models/Payee';

export class PayeeFactory {

    static createPayee(): Payee {

        const accountNumber = faker.string.numeric(8);

        return {

            name: faker.person.fullName(),

            address: faker.location.streetAddress(),

            city: faker.location.city(),

            state: faker.location.state(),

            zipCode: faker.location.zipCode(),

            phone: faker.string.numeric(10),

            account: accountNumber,

            verifyAccount: accountNumber,

            amount: faker.number.int({
                min: 100,
                max: 5000
            }).toString()

        };

    }

}