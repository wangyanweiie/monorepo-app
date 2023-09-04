/**
 * @link https://github.com/scopsy/await-to-js
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = Error>(promise?: Promise<T>): Promise<[U, undefined] | [null, T]> {
    if (!promise) {
        return Promise.reject([new Error('error'), undefined]);
    }

    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            return [err, undefined];
        });
}

export default to;
