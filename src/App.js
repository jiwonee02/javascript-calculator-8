import { Console } from "@woowacourse/mission-utils";

const DEFAULT_DELIMS_REGEX = /[,:]/;
const POSITIVE_INTREGEX = /^[1-9]\d*$/;

const ERROR = {
    NOT_POSITIVE_INT: "[ERROR] 양의 정수만 입력할 수 있습니다.",
    EMPTY_BODY: "[ERROR] 숫자 부분이 비어 있습니다.",
    CUSTOM_FORMAT: "[ERROR] 커스텀 구분자 형식이 올바르지 않습니다.",
    CUSTOM_LENGTH: "[ERROR] 커스텀 구분자는 딱 1글자여야 합니다.",
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

    const { delimiter, body } = extractDelimiterAndBody(input);
    const tokens = body.split(
        delimiter instanceof RegExp ? delimiter : new RegExp(delimiter, "g")
    );

    tokens.forEach((t) => {
        if (!POSITIVE_INT_REGEX.test(t))
            throw new Error(ERROR.NOT_POSITIVE_INT);
    });
    return tokens.reduce((acc, t) => acc + Number(t), 0);
}

function extractDelimiterAndBody(input) {
    if (!input.startsWith("//")) {
        return { delimiter: DEFAULT_DELIMS_REGEX, body: input };
    }
    const nlIdx = findFirstNewlineIndex(input);
    if (nlIdx !== -1) {
        const rawDelim = input.slice(2, nlIdx);
        if (rawDelim.length !== 1) throw new Error(ERROR.CUSTOM_LENGTH);
        let bodyStart = nlIdx + 1;
        if (input[nlIdx] === "\r" && input[nlIdx + 1] === "\n")
            bodyStart = nlIdx + 2;
        const body = input.slice(bodyStart);
        if (!body.length) throw new Error(ERROR.EMPTY_BODY);
        return { delimiter: rawDelim, body };
    }

    // 리터럴 "\n"
    const escIdx = input.indexOf("\\n");
    if (escIdx !== -1) {
        const rawDelim = input.slice(2, escIdx);
        if (rawDelim.length !== 1) throw new Error(ERROR.CUSTOM_LENGTH);
        const body = input.slice(escIdx + 2);
        if (!body.length) throw new Error(ERROR.EMPTY_BODY);
        return { delimiter: rawDelim, body };
    }

    throw new Error(ERROR.CUSTOM_FORMAT);
}

function findFirstNewlineIndex(str) {
    const iLF = str.indexOf("\n");
    const iCR = str.indexOf("\r");
    if (iLF === -1) return iCR;
    if (iCR === -1) return iLF;
    return Math.min(iLF, iCR);
}
