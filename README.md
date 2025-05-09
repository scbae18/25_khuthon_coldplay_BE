# 🌱 2025 쿠톤(KHUThon) Coldplay 팀 - Backend


## 프로젝트 개요

## 🔧 주요 기능

## ⚙️ 기술 스택

## API
# 헅톱보기 포부: Farm Funding API

> 통합된 노랑 펀딩 프로젝트를 위한 REST API 명세서입니다.
> Base URL: `https://your-api-url.com`

---

## ✨ Auth - 인증

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/auth/register` | 회원가입 (이메일, 비밀번호, 이름) |
| POST   | `/auth/login`    | 로그인                  |
| GET    | `/auth/me`       | 가입자 정보 + NBTI 결과 조회  |

---

## 🌱 NBTI - 농비티아이 결정

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/nbti/questions` | 질문 목록 조회            |
| POST   | `/nbti/info`      | 사용자 role + crops 저장 |
| POST   | `/nbti/submit`    | NBTI 응답 제출 및 결과 계산  |
| GET    | `/nbti/result`    | 복사가능한 NBTI 결과 보기    |

---

## 💼 Projects - 노랑 펀딩 프로젝트

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/projects`          | 프로젝트 생성 (기본정보 + teamRecruit) |
| GET    | `/projects`          | 목록 조회                        |
| GET    | `/projects/:id`      | 상세 조회                        |
| PATCH  | `/projects/:id`      | 펀딩 금액 업데이트                   |
| PATCH  | `/projects/:id/join` | 프로젝트 참여 (역할 지정)              |

---

## 💸 Funds - 펀딩 가능 프로젝트

| Method | Endpoint    | Description    |
| ------ | ----------- | -------------- |
| GET    | `/fund`     | 가능 프로젝트 목록     |
| GET    | `/fund/:id` | 특정 프로젝트 계획서 조회 |

---

## 📅 Planners - 계획서 가상 API

| Method | Endpoint    | Description                       |
| ------ | ----------- | --------------------------------- |
| POST   | `/planners` | 계획서 생성 (goal, region, nbtiRef...) |

---

## 🔹 요청 예시

### 회원가입

```bash
POST /auth/register
{
  "name": "배승찬",
  "email": "scbae18@example.com",
  "password": "123456"
}
```

### NBTI 제출

```bash
POST /nbti/submit
{
  "answers": [
    { "id": 1, "value": 3, "type": "S" },
    { "id": 2, "value": 4, "type": "P" }
    // ...
  ]
}
```

### 프로젝트 생성

```bash
POST /projects
{
  "title": "도시 텃밭 프로젝트",
  "description": "옥상에서 상추 키우기",
  "teamRecruit": {
    "브랜딩": 2,
    "일꾼": 3,
    "펀딩자": 1
  }
}
```


## 👨‍👩‍👧‍👦 팀원
김재욱
박태권
배승찬
이지민
## 📌 기타
