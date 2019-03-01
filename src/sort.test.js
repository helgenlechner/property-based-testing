import { check, property, gen } from 'testcheck';
import { sort } from './sort';

describe('Sort', () => {
    it('sorts an array of numbers from smallest to largest', () => {
        const input = [8, 9, 1, 0, -2];
        const expected = [-2, 0, 1, 8, 9];
        const actual = sort(input);

        expect(actual).toEqual(expected);
    });

    it('does not modify the input', () => {
        const input = [8, 9, 1, 0, -2];
        const actual = sort(input);

        expect(actual).not.toBe(input);
        expect(input[0]).toEqual(8);
        expect(input[1]).toEqual(9);
        expect(input[2]).toEqual(1);
        expect(input[3]).toEqual(0);
        expect(input[4]).toEqual(-2);
    });

    it('sorts such that each member is greater than or equal to the previous value', () => {
        const gteThanPrevious = property(
            gen.array(gen.number),
            (input) => {
                const result = sort(input);
                result.every((member, index) => {
                    if (index === 0) {
                        return true;
                    }

                    return result[index - 1] <= member;
                })
            }
        )

        expect(check(gteThanPrevious)).toBeValidProperty();
    });

    it('doesn\'t change the length of the array', () => {
        const equalLength = property(
            gen.array(gen.number),
            (input) => sort(input).length === input.length
        )

        expect(check(equalLength)).toBeValidProperty();
    });

    it('keeps every member of the original array', () => {
        const keepAllMembers = property(
            gen.array(gen.number),
            (input) => {
                console.log(input);
                const result = sort(input);
                input.every(member => result.includes(member));
            }
        )

        expect(check(keepAllMembers)).toBeValidProperty();
    });

    it('doesn\'t add new members', () => {
        const dontAddMembers = property(
            gen.array(gen.number),
            (input) => {
                const result = sort(input);
                result.every(member => input.includes(member));
            }
        )

        expect(check(dontAddMembers)).toBeValidProperty();
    });
});
