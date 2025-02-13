# 블레이버스 팀5 프론트 엔드 개발 문서

해당 문서는 블레이버스 해커톤을 참여하여 팀 `헤어 예약, 여기로 5조` 프론트 엔드 구성원들이 개발 과정을 정리한 문서로, 시간 순으로 어떤 작업을 했는지 나열하였습니다. 또한 각 작업의 필요성과 해당 작업을 선택한 이유에 대해서 서술하고 정리했습니다.

## 프로젝트를 시작하기 전

프로젝트를 시작할때 목표는 프론트엔드 개발자들이 똑같은 환경에서 개발하며, 개발 이외의 것들을 신경쓰지 않도록 하는 것으로 설정하였습니다. 즉 초기 환경 설정에 대한 부담감을 줄이고, 코드 일관성을 보장하기 위해 아래와 같은 작업을 하였습니다.

### .gitignore

깃를 사용하다보면 종종 필요없는 파일(시스템 파일 등등)이 들어가곤 합니다. 이를 사전에 방지하기 위해서 [gitignore.io](https://www.toptal.com/developers/gitignore)를 활용했습니다. 키워드로는 `windows`,`mac`을 입력하여 파일을 생성했습니다. 또한 vite의 환결설정파일도(.env 등등) 추가했습니다.

### git convention

모든 개발자가 커밋 내용을 일관되게 작성할 수 있도록 컨벤션을 정의하였습니다. 이를 통해 작업 내용을 쉽게 파악할 수 있으며, 의도적으로 작업 단위를 분리할 수 있도록 하였습니다. [Conventional Commits](https://www.conventionalcommits.org/)을 기반으로 하였고 세부 내용은 다음과 같습니다.

```text

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

```

#### type

commitlint.config.js 참고

| 타입       | 의미                                    |
| ---------- | --------------------------------------- |
| `build`    | 빌드 관련 작업 수행 (배포 파일 생성 등) |
| `chore`    | 프로젝트 설정 관련 작업 수행            |
| `ci`       | CI/CD 파이프라인 관련 작업 수행         |
| `docs`     | 문서 작성 또는 수정                     |
| `feat`     | 새로운 기능 추가                        |
| `fix`      | 버그 수정                               |
| `refactor` | 코드 리팩토링                           |
| `perf`     | 코드 성능 향상                          |
| `style`    | 스타일 변경                             |
| `comment`  | 주석 변경                               |
| `test`     | 테스트                                  |
| `rename`   | 파일 및 폴더 이름 재설정 및 이동        |
| `!HOTFIX`  | 릴리즈 버전 치명적인 버그 수정          |

### git branch 전략

위 작업까지 다 완료했다면 이제 깃을 효율적으로 사용하기 위해서 깃 브랜치 전략에 대해서 정해야합니다. git flow, github flow 등등 여러 방법이 있지만 그 중 git flow를 선택하였습니다. 프론트 팀원이 총 4명이기 때문에 효율적으로 코드를 관리 하기 위해서 선택하였습니다.

#### git-flow

해당 프로젝트에서 쓸 브랜치를 정의하겠습니다.

| 부모 브랜치 | 브랜치 명   | 역할                                     | 병합 브랜치   |
| ----------- | ----------- | ---------------------------------------- | ------------- |
|             | `main`      | product 서버에 배포 및 버전 관리         |               |
| `main`      | `dev`       | 각각의 기능 개발이 끝난 후 취합          | `main`        |
| `dev`       | `feature/*` | 기능 개발                                | `dev`         |
| `dev`       | `release`   | 배포 테스트 및 QA 진행                   | `dev`,`main`  |
| `main`      | `hotfix`    | product 서버에서 문제가 생겼을 시에 처리 | `main`, `dev` |

## 프로젝트 셋업

프론트 개발은 기본적으로 REACT로 진행하며 typescript로 개발합니다. CRA대신 VITE를 사용합니다.

```text
vite: 6.1.0
react: 19.0.0
typescript: 5.7.2
```

### ESLint

ESLint는 코드의 문제 패턴 식별을, Prettier는 코드 포맷팅을 담당합니다.
이 때 ESLint와 Prettier의 포맷팅 충돌을 방지하기 위해 `eslint-config-prettier` 라이브러리를 활용했습니다.
`eslint-config-prettier` 라이브러리는 Prettier와 충돌하는 ESLint 포맷팅 규칙을 off 처리합니다.

### Prettier

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "bracketSameLine": false,
  "arrowParens": "avoid"
}
```

`prettier` 설정은 다음과 같습니다. `useTabs` 속성을 true로 설정하면 editor 상에서 `tabWidth` 설정이 적용안되는 것처럼 보이는 이슈가 있으므로 default 값인 false를 유지합니다.

### Settings

`settings.json` 파일에서는에는 git clone 시 모든 개발자가 동일한 개발환경을 갖출 수 있도록 editor를 수정합니다. vscode 사용자를 위한 세팅으로 사용하시는 IDE에 따라 참고 부탁드립니다.

```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  // ESLint에 의한 자동 수정 활성화
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // ESLint 플러그인 사용
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  // 터미널 및 기타 파일에서의 개행 문자
  "files.eol": "\n"
}
```

## 프로젝트를 시작하며

### 폴더 구조

```text
src/
├── components/
│   ├── common/
│   └── feature/
├── hooks/
├── lib/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   └── styles/
│   ├── constants/
│   └── types/
├── pages/
├── store/
└── utils/
```

- `components`: 컴포넌트가 위치한 폴더입니다.
- `hooks`: 커스텀 훅이 위치한 폴더입니다.
- `assets`: 프로젝트에 필요한 이미지, 폰트, 디자인 파일이 위치한 폴더입니다.
- `constants` : 프로젝트에 필요한 상수가 정의되어 있습니다.
- `pages`: 페이지가 위치한 폴더입니다.
- `store`: 전역 상태를 관리하는 폴더입니다.
- `types`: 타입들을 관리하는 폴더입니다.
- `utils`: 자주 쓰는 함수 혹은 상수가 정의되어 있습니다.
