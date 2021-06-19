export const combineTypes = <T extends Object, M extends Object>(a: T, b: M) => {
    return {
        ...a,
        ...b,
    }
};