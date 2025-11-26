# 🎨 ToonViewer

웹툰을 세로 스크롤 형태로 감상할 수 있는 뷰어 애플리케이션입니다.  
Google Sheets로 웹툰을 관리하고, 모바일에 최적화된 뷰어로 감상할 수 있습니다.

## ✨ 주요 기능

- 📱 모바일 최적화 디자인 (iPhone 14 기준)
- 📖 에피소드별 네비게이션 (이전화/다음화)
- 📊 Google Sheets로 간편한 콘텐츠 관리
- 🖼️ 이미지 Lazy Loading으로 빠른 로딩
- 👆 몰입 모드 (화면 터치로 UI 숨기기/보이기)

---

## 🚀 빠른 시작 (완전 초보자용)

### 1단계: 필수 프로그램 설치

#### Node.js 설치
1. [Node.js 공식 사이트](https://nodejs.org/) 접속
2. **LTS 버전** (왼쪽 버튼) 다운로드
3. 다운로드한 파일 실행하여 설치
4. 설치 완료 후 확인:
   ```bash
   node --version
   # v18.0.0 이상이 나오면 성공!
   ```

#### Git 설치 (선택사항)
- 프로젝트를 다운로드하려면 Git이 필요합니다
- [Git 공식 사이트](https://git-scm.com/) 에서 다운로드

---

### 2단계: 프로젝트 다운로드

#### 방법 1: Git 사용 (추천)
```bash
# 원하는 폴더에서 실행
git clone https://github.com/ShiftSol-Code/toonViewer.git
cd toonViewer
```

#### 방법 2: ZIP 파일 다운로드
1. GitHub 페이지에서 **Code** → **Download ZIP** 클릭
2. 압축 해제 후 폴더로 이동

---

### 3단계: 프로젝트 설정

#### 3-1. 의존성 설치
프로젝트 폴더에서 터미널(명령 프롬프트)을 열고:

```bash
npm install
```

> 💡 **팁**: Windows에서는 폴더에서 `Shift + 우클릭` → "여기서 PowerShell 창 열기"

#### 3-2. 환경 변수 설정
프로젝트 폴더에 `.env` 파일을 만들고 아래 내용 입력:

```
SHEET_URL=여기에_구글시트_CSV_URL_입력
```

> ⚠️ **중요**: `.env` 파일은 Git에 업로드되지 않습니다 (보안상 이유)

---

### 4단계: Google Sheets 설정

#### 4-1. Google Sheets 만들기
1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 만들기
3. 첫 번째 행에 다음 열 이름 입력:

| id | title | author | thumbnail | episode | episodeTitle | images |
|----|-------|--------|-----------|---------|--------------|--------|

#### 4-2. 데이터 입력 예시

| id | title | author | thumbnail | episode | episodeTitle | images |
|----|-------|--------|-----------|---------|--------------|--------|
| 1 | 내 웹툰 | 홍길동 | /images/thumb.jpg | 1 | 1화 | /images/ep1_01.jpg,/images/ep1_02.jpg |
| 1 | 내 웹툰 | 홍길동 | /images/thumb.jpg | 2 | 2화 | /images/ep2_01.jpg,/images/ep2_02.jpg |

> 📝 **참고**: 
> - `id`는 같은 웹툰의 에피소드끼리 동일하게 입력
> - `images`는 쉼표(,)로 구분하여 여러 이미지 입력 가능

#### 4-3. 웹에 게시하기
1. **파일** → **공유** → **웹에 게시** 클릭
2. **전체 문서** 선택
3. **쉼표로 구분된 값(.csv)** 선택
4. **게시** 클릭
5. 생성된 URL 복사
6. `.env` 파일의 `SHEET_URL`에 붙여넣기

---

### 5단계: 이미지 준비

1. 웹툰 이미지를 `public/images/` 폴더에 저장
2. Google Sheets의 경로는 `/images/파일명.jpg` 형식으로 입력

**예시:**
```
실제 파일 위치: public/images/ep1_01.jpg
시트에 입력: /images/ep1_01.jpg
```

---

### 6단계: 서버 실행

```bash
npm start
```

성공하면 다음 메시지가 표시됩니다:
```
Webtoon Viewer app listening at http://localhost:3000
```

---

### 7단계: 웹 브라우저에서 확인

브라우저 주소창에 입력:
```
http://localhost:3000
```

🎉 **완료!** 웹툰 목록이 보이면 성공입니다!

---

## 📱 사용 방법

### 메인 페이지 (http://localhost:3000)
- 웹툰 목록이 카드 형태로 표시됩니다
- 카드를 클릭하면 해당 웹툰의 1화로 이동합니다

### 뷰어 페이지
- **이전화/다음화 버튼**: 하단에 표시 (스크롤하면 자동으로 숨김)
- **화면 터치**: UI 숨기기/보이기 전환
- **스크롤**: 위로 스크롤하면 UI 자동 표시, 아래로 스크롤하면 자동 숨김

---

## 🛠️ 문제 해결

### "npm을 찾을 수 없습니다" 오류
→ Node.js가 제대로 설치되지 않았습니다. 1단계부터 다시 진행하세요.

### 이미지가 안 보여요
1. 이미지 파일이 `public/images/` 폴더에 있는지 확인
2. Google Sheets의 경로가 `/images/파일명.jpg` 형식인지 확인
3. 파일명 대소문자가 정확히 일치하는지 확인

### Google Sheets 데이터가 안 불러와져요
1. `.env` 파일에 `SHEET_URL`이 올바르게 입력되었는지 확인
2. Google Sheets가 "웹에 게시" 되었는지 확인
3. CSV 형식으로 게시되었는지 확인

### 서버가 실행되지 않아요
```bash
# 기존 서버 종료 후 재시작
# Windows PowerShell:
Get-Process -Name node | Stop-Process -Force
npm start

# Mac/Linux:
killall node
npm start
```

---

## 📁 프로젝트 구조

```
toonViewer/
├── public/                 # 정적 파일 (브라우저에서 접근 가능)
│   ├── images/            # 웹툰 이미지 저장 폴더
│   ├── index.html         # 메인 페이지 (웹툰 목록)
│   ├── viewer.html        # 뷰어 페이지 (웹툰 보기)
│   ├── style.css          # 스타일시트
│   └── app.js             # 프론트엔드 JavaScript
├── services/              # 백엔드 서비스
│   └── sheetService.js    # Google Sheets 데이터 가져오기
├── server.js              # Express 서버 (메인)
├── .env                   # 환경 변수 (직접 생성 필요)
├── .gitignore             # Git 제외 파일 목록
├── package.json           # 프로젝트 정보 및 의존성
└── README.md              # 이 파일
```

---

## 🔧 기술 스택

- **Backend**: Node.js, Express
- **Frontend**: Vanilla JavaScript (프레임워크 없음)
- **Data Source**: Google Sheets (CSV)
- **Styling**: CSS3

---

## 📚 추가 정보

### 개발 모드로 실행 (자동 재시작)
```bash
npm run backend
```
> 코드를 수정하면 서버가 자동으로 재시작됩니다 (nodemon 사용)

### 포트 변경하기
`server.js` 파일에서 포트 번호 수정:
```javascript
const port = 3000; // 원하는 포트 번호로 변경
```

---

## 📄 라이선스

MIT License

---

## 🤝 기여하기

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/ShiftSol-Code/toonViewer/issues)에 등록해주세요!

---

## 📞 도움이 필요하신가요?

문제가 해결되지 않으면 다음 정보와 함께 문의해주세요:
1. 운영체제 (Windows/Mac/Linux)
2. Node.js 버전 (`node --version` 결과)
3. 오류 메시지 전체 내용
4. 어떤 단계에서 문제가 발생했는지
