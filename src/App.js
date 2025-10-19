import { Console } from "@woowacourse/mission-utils";

const DEFAULT_DELIMS_REGEX = /[,:]/;

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
    const parts = input.split(DEFAULT_DELIMS_REGEX);
    return parts.map(Number).reduce((a, b) => a + b, 0);
}
