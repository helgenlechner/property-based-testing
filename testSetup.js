const customMatchers = {
    toBeValidProperty(received) {
        if (received.result === true) {
            return {
                message: () => `Test succeeded; ran ${received.numTests} tests.`,
                pass: true,
            };
        }

        return {
            message: () => {
                if (received.shrunk) {
                    return `Test failed. Result: ${received.shrunk.result}. Smallest failing input: ${JSON.stringify(received.shrunk.smallest)}`;
                }

                return `Test failed with arguments ${received.fail}`;
            },
            pass: false,
        };
    }
};

expect.extend(customMatchers);
