const promisify = (api) => {
    return (options, ...params) => {
        return new Promise((resolve, reject) => {
            api(Object.assign({}, options, {
                success: resolve,
                fail(res) {
                    console.error('request error ', res);
                    reject(res);
                }
            }), ...params);
        });
    };
};

const complete = (api) => {
    return (options, ...params) => {
        return new Promise((resolve, reject) => {
            api(Object.assign({}, options, {complete: resolve}), ...params);
        });
    };
};

export {promisify, complete};
