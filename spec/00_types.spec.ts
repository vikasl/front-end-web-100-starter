describe('declaring variables', () => {
    it('implictly typed variables', () => {
        let x = 10; // since I initialized to a number, it inferred that I want this to be a number data type.
        x = 10;
        // x = 'tacos'; // can't do this because it is a number.
    });
    it('union types', () => {
        let y: number;
        y = 13;
        y = 13.33;
        y = 123_123_123;
        y = 0xff; // hex, base 16
        y = 0o22; // octal, base 8
        y = 0b10101; // binary, base 2

        let z: number | string;

        z = 12;

        z = 'Tacos';

    });
    it('has  const keyword', () => {
        // you cannot reassign to that variable.
        const PI = 3.14;

        // PI = 3;

        const friends = ['Sean', 'Amy', 'Chip'];
        friends[2] = 'Everett';
        expect(friends[2]).toBe('Everett');
        expect(friends).toEqual(['Sean', 'Amy', 'Everett']); // toEqual does deep equality.

        const movie = { title: 'Jaws', director: 'Spielberg' };
        movie.director = 'Steven Spielberg';


    });
    it('has a var keyword but it is evil and you should not use it or you are a bad person', () => {
        const age = 22;
        let name = 'Jeff';
        if (age > 21) {
            // tslint:disable-next-line: no-var-keyword
            var message = 'Old Enough';
        } else {
            // tslint:disable-next-line: no-var-keyword
            var message = 'Too Young';
        }

        expect(message).toBe('Old Enough')
        name = 'Putintane';
    });
})

describe('strings', () => {

    it('declaring them', () => {

        const s1 = 'Hello, World';
        // tslint:disable-next-line: quotemark
        const s2 = "Hello, World";
        expect(s1).toEqual(s2);

        const name = 'Bob';
        const salary = 123_000;

        const message1 = 'The name is ' + name + ' and the salary is ' + salary + ' Per Year';
        const message2 = `The name is ${name} and the salary is ${salary} Per Year`;

        expect(message1).toEqual(message2);

        const story = `My Life.
        It was a dark and stormy night.
        I got borned.

        The End`;


    });
    describe('array literals', () => {
        it('declaring them', () => {
            const favoriteNumbers: number[] = [];
            favoriteNumbers[0] = 12;
            // favoriteNumbers[1] = 'Dog';

            // let stuff : number | string[];
            // stuff = 32;
            // stuff = ['dog', 'cat', 'mouse', 99];

            // let stuff: (number | string) [] =[];
            const stuff: Array<number | string> = [];
            stuff[0] = 12;
            stuff[1] = 'Pizza';
        });

    });

});
describe('tuples', () => {

    it('basic example', () => {
        // typed array
        const stuff: Array<number | string> = [];
        stuff[0] = 32;
        stuff[1] = 'Dog';
        stuff[2] = 99;
        // stuff[3] = []

        type Artist = [string, string, string, number];
        const artist: Artist = ['Warren', 'Ellis', 'Musician', 58];
        const nonInferrableTypes: [boolean, string] = [true, 'thingy'];

        // const firstName = artist[0];
        // const lastName = artist[1];
        // const age = artist[3];

        const [firstName, lastName, , age] = artist;

        expect(firstName).toBe('Warren');
        expect(lastName).toBe('Ellis');
        expect(age).toBe(58);

    });

    it('type aliases', () => {
        type ThingWithLettersAndStuff = string | number;

        let userName: ThingWithLettersAndStuff;

        userName = 'Bob';
        userName = 92;

        type MathOp = (a: number, b: number) => number;

        const add: MathOp = (a, b) => a + b;
        const subtract: MathOp = (a, b) => a - b;

        function doMath(x: number, y: number, f: MathOp): number {
            return f(x + x, y + y);
        }

        expect(doMath(2, 2, add)).toBe(8);
    });

    it('the problem and solution using OOP', () => {

        interface FormattedNameResponse { formattedName: string, numberOfLetters: number };
        function formatName(first: string, last: string): FormattedNameResponse {
            const formattedName = `${last}, ${first}`;
            return {
                formattedName,
                numberOfLetters: formattedName.length
            }
        }

        const result = formatName('Han', 'Solo');
        expect(result.formattedName).toBe('Solo, Han');
        expect(result.numberOfLetters).toBe(9);
    });

    it('using a tuple', () => {

        function formatName(first: string, last: string): [string, number] {
            const formattedName = `${last}, ${first}`;
            return [formattedName, formattedName.length];
        }

        // const result = formatName('Han', 'Solo');

        // expect(result[0]).toBe('Solo, Han');
        // expect(result[1]).toBe(9);

        const [n1, n2] = formatName('Han', 'Solo');

        expect(n1).toBe('Solo, Han');
        expect(n2).toBe(9);

        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const [first, , third] = numbers;
        expect(first).toBe(1);
        expect(third).toBe(3);

        const [head, ...tail] = numbers; // the three dots here are called the 'spread' operator.
        expect(head).toBe(1);
        expect(tail).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    });

});

describe('object literals and interfaces', () => {
    it('an anonymous objects type is an interface ', () => {
        interface Movie {
            title: string;
            director: string;
            yearReleased: number;
        };
        const thor: Movie = {
            title: 'Thor Ragnorak',
            director: 'Taika Waititi',
            yearReleased: 2017
        };

        const knivesOut: Movie = {
            title: 'Knives Out',
            director: 'Rian Johnson',
            yearReleased: 2019
        };

        function attendMovie(theMovie: Movie) {
            // do something
        }

    });
    it('duck typing (structural typing)', () => {

        interface MessageAble { message: string }
        function logIt(thingy: MessageAble) {

            console.log(thingy.message);
        }

        // logIt('tacos');

        const phoneCall = {
            from: 'Sean',
            message: 'Practice Tonight?'
        }

        logIt(phoneCall);
        logIt({ message: 'Time for lunch' });

    });

    it('making extensible interfaces', () => {
        interface Role { role: string; actor: string }
        interface Dictionary<T> {
            [key: string]: T
        }
        interface Movie {
            title: string;
            director: string;
            yearReleased: number;
            cast: Dictionary<Role>
        };
        const thor: Movie = {
            title: 'Thor Ragnorak',
            director: 'Taika Waititi',
            yearReleased: 2017,
            cast: {
                thor: { role: 'Thor', actor: 'Chris Hemsworth' },
                odin: { role: 'Odin', actor: 'Anthony Hopkins' },
                'Loki the Brother': { role: 'Loki', actor: 'Tom Hiddelston' }
            }

        }

        expect(thor.cast.thor.actor).toBe('Chris Hemsworth');
        expect(thor.cast['Loki the Brother'].actor).toBe('Tom Hiddelston');

        interface Person {
            firstName: string;
            lastName: string;
            age?: number,
            [key: string]: any
        }

        const joe: Person = {
            firstName: 'Joseph',
            lastName: 'Schmidt',
            age: 56
        }

        const sue: Person = {
            firstName: 'Susan',
            lastName: 'Schneider'
        }
        const sean: Person = {
            firstName: 'Sean',
            lastName: 'Carlin',
            age: 62,
            occupation: 'Musician',
            eyeColor: 'blue'
        }

        function doIt(p: Person) {
            if (p.age) {
                // we have an age.
            }
        }

    });

});
describe('truth table', () => {

    it('truth table', () => {
        expect('').toBeFalsy();
        expect(undefined).toBeFalsy();
        expect(null).toBeFalsy();
        expect(0).toBeFalsy();
        expect(NaN).toBeFalsy();

        expect(' ').toBeTruthy();
        expect(-1).toBeTruthy();
        expect({}).toBeTruthy();
        expect([]).toBeTruthy();
    });
});

describe('enums and string unions', () => {
    it('has enums but they are a bit heavy', () => {
        enum SeatType { Window, Aisle, Middle };

        const mySeat: SeatType = SeatType.Window;
    });

    it('has union types for strings', () => {
        type SeatType = 'aisle' | 'window' | 'middle';

        const mySeat: SeatType = 'middle';

        type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

        function makeCall(url: string, method: HttpMethods) {

        }
    });

});
describe('spread operator', () => {

    it('as used on arrays', () => {
        const numbers = [2, 3, 4, 5, 6];
        const newNumbers = [1, ...numbers, 7];
        expect(newNumbers).toEqual([1, 2, 3, 4, 5, 6, 7]);
        // note:
        expect(numbers).toEqual([2, 3, 4, 5, 6]);
    });

    it('used on objects', () => {
        const movie = {
            title: 'Jaws',
            director: 'Spielberg',
            yearReleased: 1981
        };

        const newMovie = { ...movie, yearReleased: 1977 };
        expect(newMovie).toEqual({
            title: 'Jaws',
            director: 'Spielberg',
            yearReleased: 1977
        })

        expect(movie).toEqual({
            title: 'Jaws',
            director: 'Spielberg',
            yearReleased: 1981
        })

        const another = { ...movie, lead: 'Roy Scheider' };
        expect(another.lead).toBe('Roy Scheider');
    });
});