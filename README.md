# ToonViewer

웹툰을 세로 스크롤 형태로 감상할 수 있는 뷰어 애플리케이션입니다.
iPhone 14에 최적화된 모바일 우선 디자인으로 제작되었습니다.

## 주요 기능

- 📱 iPhone 14 최적화 (390x844)
- 🎨 깔끔한 세로 스크롤 뷰어
- 📊 Google Sheets 연동 CMS
- 🖼️ 이미지 Lazy Loading
- 👆 몰입 모드 (탭하여 UI 숨기기)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 서버 실행
npm start

# 개발 모드 (nodemon)
npm run backend
```

서버 실행 후 `http://localhost:3000`에 접속

## Google Sheets 연동

1. Google Sheets 생성 (열: `id`, `title`, `author`, `thumbnail`, `images`)
2. 파일 → 공유 → 웹에 게시 → CSV 형식 선택
3. `.env` 파일에 URL 추가:
   ```
   SHEET_URL=발행된_CSV_URL
   ```

## 이미지 관리

- 이미지 저장 위치: `public/images/`
- 구글 시트의 경로 형식: `/images/파일명.jpg`

## 기술 스택

- **Backend**: Node.js, Express
- **Frontend**: Vanilla JavaScript
- **Data**: Google Sheets (CSV)
- **Styling**: CSS3

## 프로젝트 구조

```
toonViewer/
├── public/
│   ├── images/          # 웹툰 이미지 저장
│   ├── index.html       # 인트로 페이지
│   ├── viewer.html      # 뷰어 페이지
│   ├── style.css
│   └── app.js
├── services/
│   └── sheetService.js  # Google Sheets 연동
├── server.js            # Express 서버
├── .env                 # 환경변수 (Git 제외)
└── package.json
```

## 라이선스

MIT
