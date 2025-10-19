import { Console } from "@woowacourse/mission-utils";

const DEFAULT_DELIMS_REGEX = /[,:]/;
const POSITIVE_INTREGEX = /^[1-9]\d*$/;

const ERROR = {
    NOT_POSITIVE_INT: "[ERROR] 양의 정수만 입력할 수 있습니다.",
};

class App {
    async run() {
        Console.print("덧셈할 문자열을 입력해 주세요.");
        const input = await Console.readLineAsync();
        const result = calculate(input);
        Console.print(`결과: ${result}`);
    }
}

export default App;

export function calculate(input) {
    if (input === "") return 0;
    const tokens = input.split(DEFAULT_DELIMS_REGEX);
    tokens.forEach((t) => {
        if (!POSITIVE_INTREGEX.test(t)) throw new Error(ERROR.NOT_POSITIVE_INT);
    });
    return tokens.reduce((acc, t) => acc + Number(t), 0);
}
