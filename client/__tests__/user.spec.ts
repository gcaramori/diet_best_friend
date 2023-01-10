import { double } from '../src/index';

describe('testing index file', () => {
    test('double function', () => {
        expect(double(5)).toBe(10);
    });
});