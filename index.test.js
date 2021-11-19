
test("when given 2 numbers", () => {

    function divide(a, b) {
        return a / b;
    }

    // it("returns the result of dividing the first by the second", () => {
    // const result = divide(10, 5);
    const expected = 2;
    expect(divide(10, 5)).toEqual(2);
    // });
});