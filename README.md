# javascript-calculator-precourse

</br>

## 🛠️ 기능 구현

-   문자열을 입력받고 결과를 출력한다.
-   커스텀 구분자 포맷(`//구분자\n`)이 있으면 인식한다.
-   기본 구분자 배열에 `,`, `:`를 포함하고, 커스텀이 있으면 배열에 추가한다.
-   커스텀 구분자 추출 로직은 **파싱 메서드 내부**에서 처리한다.
-   (커스텀｜기본) 구분자를 기준으로 분리된 숫자를 모두 더한 결과를 출력한다.

## 🤔 예외 상황

-   음수가 포함된 경우 → `[ERROR] 음수는 허용되지 않습니다.`
-   기본/커스텀 이외의 문자 사용 → `[ERROR] 허용되지 않은 문자입니다.`
-   문자열의 마지막이 구분자 등 특수문자인 경우(연속·선·후행 구분자 포함) → `[ERROR] 잘못된 구분자 배치입니다.`
-   빈 문자열("") → 합계 0 반환(예외 아님)

## 📁 디렉터리 구조

```
javascript-calculator-8/
├── _test_/                 # 테스트
├── node_modules/
├── src/
│   ├── App.js              # 엔트리(run), 입출력 흐름
│   ├── CalcModel.js        # 파싱/계산 핵심 로직
│   ├── CalcView.js         # Console 입·출력
│   ├── Controller.js       # 검증 및 전체 흐름 제어
│   ├── Constant.js         # 상수/정규식
│   └── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
