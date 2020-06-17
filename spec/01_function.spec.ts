import { isEven, doubleIt } from './utils';

describe('functions', () => {

    it('two kinds of functions', () => {
        // Named Functions
        expect(add(2, 2)).toBe(4); // only ones that can be forward-referenced
        function add(a: number, b: number): number {
            return a + b;
        }

        // Anonymous Functions
        const subtract: MathOp = function (a: number, b: number): number {
            return a - b;
        }
        expect(subtract(10, 2)).toBe(8);
        const multiply: MathOp = (a: number, b: number): number => a * b;
        expect(multiply(3, 3)).toBe(9);


        const divide = (a: number, b: number): number => {
            if (b === 0) {
                throw new Error('Are you trying to create a black hole??');
            }
            return a / b;
        }

        const formatName = (first: string, last: string): { fullName: string } => ({ fullName: `${last}, ${first}` });
        const name = formatName('Han', 'Solo');
        expect(name.fullName).toBe('Solo, Han');

        type MathOp = (a: number, b: number) => number;
        function doIt(x: number, b: number, f: MathOp): number {
            return f(x * 2, b * 2);
        }

        expect(doIt(2, 2, add)).toBe(8);
    });
    describe('arguments to functions', () => {

        it('optional, default, and rest params', () => {
            function add(a: number = 5, b: number = 10, ...allTheRest: number[]) {
                const firstTwo = a + b;
                return allTheRest.reduce((s, n) => s + n, firstTwo);
            }
            expect(add(2, 2)).toBe(4);
            expect(add(2)).toBe(12);
            expect(add()).toBe(15);
            expect(add(undefined, 5)).toBe(10);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
    });

});

describe('higher order functions', () => {

    it('basic way to solve the problem', () => {
        function tagMaker(tag: string, content: string): string {
            return `<${tag}>${content}</${tag}>`;
        }

        expect(tagMaker('h1', 'Hello')).toBe('<h1>Hello</h1>');
        expect(tagMaker('h1', 'Goodbye')).toBe('<h1>Goodbye</h1>');
        expect(tagMaker('p', 'some content')).toBe('<p>some content</p>');
    });
    it('an oop approach', () => {
        class TagMaker {

            constructor(private tag: string) { }

            make(content: string) {
                return `<${this.tag}>${content}</${this.tag}>`;
            }
        }

        const h1Maker = new TagMaker('h1');
        const pMaker = new TagMaker('p');

        expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
        expect(h1Maker.make('Goodbye')).toBe('<h1>Goodbye</h1>');
        expect(pMaker.make('some content')).toBe('<p>some content</p>');
    });
    it('functional style', () => {
        function tagMaker(tag: string): (content: string) => string {
            return (content) => `<${tag}>${content}</${tag}>`
        }

        const h1Maker = tagMaker('h1');
        const pMaker = tagMaker('p');

        expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
        expect(h1Maker('Goodbye')).toBe('<h1>Goodbye</h1>');
        expect(pMaker('some content')).toBe('<p>some content</p>');
    });
});

describe('array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    it('visiting each element in an array', () => {
        numbers.forEach((e) => console.log(e));
        numbers.forEach((element, index, collection) => console.log(element, index, collection)); // Eich
    });

    describe('methods that create new arrays', () => {
        it('has a filter', () => {
            // where
            const evens = numbers.filter(isEven); // filter returns every element that returns true from the function.
            // const evens = numbers.filter(n => isEven(n)); // filter returns every element that returns true from the function.

            expect(evens).toEqual([2, 4, 6, 8]);
            expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])

            expect(numbers.filter(() => true)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(numbers.filter(() => false)).toEqual([]);

        });

        it('has a map', () => {
            // select

            const numbersAsString = numbers.map(n => n.toString());
            expect(numbersAsString).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);

            const doubled = numbers.map(n => n * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

            const doubledEvens = numbers // [1,2,3,4,5...]
                .filter(isEven) // [2,4,6,8,10]
                .map(doubleIt);// [4, 8, 12, 16]

            expect(doubledEvens).toEqual([4, 8, 12, 16])

        });


    });
    describe('methods that return a single (scalar) value', () => {
        it('has some that allow you to test the membership', () => {

            const allEvens = numbers.every(isEven); // C# All
            expect(allEvens).toBe(false);

            const someEven = numbers.some(isEven); // C# Any
            expect(someEven).toBe(true);
        });

        it('has reduce', () => {
            expect(numbers.reduce((s, n) => s + n)).toBe(45);
            expect(numbers.reduce((s, n) => s + n, 100)).toBe(145);
        });
    });

});

describe('some examples', () => {

    it('a shopping cart', () => {

        // I have a cart, I want to know the total bill.
        interface CartItem {
            name: string;
            qty: number;
            price: number;
        }
        const cart: CartItem[] = [
            { name: 'Eggs', qty: 1, price: 2.99 },
            { name: 'Bread', qty: 3, price: 3.57 },
            { name: 'Shampoo', qty: 2, price: 7.25 }
        ];

        interface ShippingInfo {
            totalQty: number;
            totalPrice: number;
        }

        const answer: ShippingInfo = cart.reduce((state: ShippingInfo, next: CartItem) => {
            return {
                totalQty: state.totalQty + next.qty,
                totalPrice: state.totalPrice + (next.price * next.qty)
            }
        }, {
            totalQty: 0,
            totalPrice: 0
        });

        expect(answer.totalQty).toBe(6);
        expect(answer.totalPrice).toBe(28.2);

    });
    it('practice', () => {
        // Bowling!
        // Figure out who has the higest score. who has the lowest score, and what the highest and lowest score are.
        // For this practice THERE WILL BE NO TIES. (if you want extra credit, change your code to allow ties)

        interface Results {
            highScorer: string | string[];
            highScore: number;
            lowScorer: string;
            lowScore: number;
        }

        interface BowlingGame {
            name: string;
            score: number;
        }

        const bowlers: BowlingGame[] = [
            { name: 'Jeff', score: 127 },
            { name: 'Henry', score: 227 },
            { name: 'Violet', score: 128 }
        ];

        // YOUR CODE GOES HERE
        // I'm going to to this all silent, Aikido style. Then we'll talk about it.
        const initialState: Results = {
            highScore: -1,
            highScorer: null,
            lowScore: 301,
            lowScorer: null
        }
        const results: Results = bowlers.reduce((state: Results, game: BowlingGame) => {
            // there might be more elegant ways to do this...
            return {
                highScorer: game.score > state.highScore ? game.name : state.highScorer,
                highScore: game.score > state.highScore ? game.score : state.highScore,
                lowScorer: game.score < state.lowScore ? game.name : state.lowScorer,
                lowScore: game.score < state.lowScore ? game.score : state.lowScore
            }
        }, initialState)

        expect(results.highScorer).toBe('Henry');
        expect(results.highScore).toBe(227);
        expect(results.lowScorer).toBe('Jeff');
        expect(results.lowScore).toBe(127)
    });
    it('combining a few things', () => {
        interface Vehicle {
            vin: string;
            make: string;
            model: string;
            mileage: number;
        }

        const vehicles: Vehicle[] = [
            { vin: '9999', make: 'Ford', model: 'Escort', mileage: 210_000 },
            { vin: '838', make: 'Chevy', model: 'Bolt', mileage: 87_000 },
            { vin: '89df', make: 'Honda', model: 'Pilot', mileage: 218_000 }
        ];


        // write some code to give me the make and model of the high mileage vehicles (high mileage >= 200_000)
        const highMileageVehicles = vehicles // all the vehicles (3 vehicles)
            .filter(v => v.mileage >= 200_000) // just the ones with 200k or more mileage (2 vehicles)
            .map(v => `${v.make} ${v.model}`); // an array of strings with make and model (what we want)

        expect(highMileageVehicles).toEqual(['Ford Escort', 'Honda Pilot'])
    });
});
describe('misc', () => {
    it('has object destructuring', () => {
        // arrays as a review
        const friends = ['Sean', 'Billy', 'Jessika'];
        const [, bestFriend] = friends;
        // const bestFriend = friends[1];
        expect(bestFriend).toBe('Billy');

        const policyHolder = {
            firstName: 'Bob',
            lastName: 'Smith',
            addres: {
                street: '152 Mocking bird ct'
            },
            age: 47,
            email: 'bob@aol.com'
        }

        const { lastName: last, email } = policyHolder;
        // const lastName = policyHolder.lastName;
        // const email = policyHolder.email;

        expect(last).toBe('Smith');
        expect(email).toBe('bob@aol.com');
    });

});
describe('weak redux', () => {
    it('a demonstration', () => {
        interface State {
            count: number;
        }

        const initialState: State = {
            count: 0
        }

        interface Action {
            type: string;
        }

        const history: Action[] = [
            { type: 'Increment' },
            { type: 'Increment' },
            { type: 'Increment' },
            { type: 'Increment' },
            { type: 'Reset' },
            { type: 'Increment' },
            { type: 'Increment' },
            { type: 'Increment' },
            { type: 'Decrement' }
        ]

        const finalState: State = history.reduce((state: State, action: Action) => {
            switch (action.type) {
                case 'Increment': {
                    return { count: state.count + 1 }
                }
                case 'Decrement': {
                    return { count: state.count - 1 }
                }
                case 'Reset': {
                    return { count: 0 }
                }
            }
        }, initialState);

        expect(finalState.count).toBe(2);
    });

});