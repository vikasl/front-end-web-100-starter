describe('declaring variables', () => {
    it('implicitly typed variables', () => {
        let x = 10; // initialized to a number , it inferred that number data type
        x = 10;
        // x="string" not allowed as x is a number
    });
    it('union types', () => {
        let y: number;
        y = 13;
        y = 13.33;
        y = 123_123_123;
        y = 0xff;
        let z: number | string;
        z = 12;
        z = 'test';


    });

    it('has a var keyword but it is evil and dont use it', () => {
        const age = 22;
        if (age > 21) {
            // tslint:disable-next-line: prefer-const
            let message = 'test'
        }
        else {
            // let newmsg = 'done';
            const test = 'hello';
        }
    }
    );

});

describe('strings', () => {
    const s1 = 'Hello, world';

});