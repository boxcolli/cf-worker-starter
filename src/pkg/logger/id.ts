/**
 * getId is a id generator that provides a unique tag for each
 * request. When there are many fragmented logs from concurrent
 * requensts, it will help recognize which logs belong to which
 * request.
 */
export function getId(): string {
    /**
     *  11 hex digits from unix millisecond time
     *
     *  | unix millisec   | date         | hexadecimal   | digits |
     *  |----------------:|-------------:|--------------:|-------:|
     *  | `1715104691153` | `2024.05.07` | `18f543bb78b` | 11     |
     *  | `4113364018000` | `2100.05.07` | `3BDB799E350` | 11     |
     *  | `9999999999999` | `2286.11.20` | `9184E729FFF` | 11     |
     *
     *  @description
     *  11 digits will be enough up to 22th century
     */
    const timestamp = Date.now().toString(16).padStart(11, '0');

    /**
     *  8 hex digits (32 bits) from random string (uuidv4)
     *
     *  2^32 / 1 ms
     *   = 2^32*1000 / 1s
     *   = 4,294,967,296,000 uniqueness / 1s
     */
    const randomness = crypto.randomUUID().substring(0, 8);

    /**
     *  [11]:[8] => total 20 characters
     *
     *  ex) 18f545d8060:b593f5e4
     */
    return `${timestamp}:${randomness}`;
}
