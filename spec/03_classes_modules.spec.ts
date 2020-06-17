import { Employee, Retiree, Contractor, Reportable } from './hr';

describe('classes and modules', () => {
    it('creating an instance of a class', () => {
        const bob = new Employee('Bob', 'Smith');

        expect(bob.firstName,).toBe('Bob');
        expect(bob.lastName).toBe('Smith');

        bob.firstName = 'Robert';
        expect(bob.firstName).toBe('Robert');
        expect(bob.salary).toBe(100_000);
        // bob.salary = 200_000 //can't do it readonly
        bob.giveRaise(1000);
        expect(bob.salary).toBe(101000);
        console.log('Bob ID', bob.id);

    });

});