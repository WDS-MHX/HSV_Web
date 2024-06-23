# HSV_Web

Dự án website của Hội sinh viên trường Đại học Công nghệ Thông tin - ĐHQG-HCM, nhằm mục tiêu sau cho các đối tượng là sinh viên UIT:

- Vinh danh tuyên dương những cá nhân có thành tích xuất sắc trong quá trình học tập, các lĩnh vực nghiên cứu khoa học,...
- Tuyên truyền những hình ảnh, câu chuyện đẹp của Sinh viên, Câu lạc bộ, đội, nhóm đến cộng động Sinh viên UIT.
- Đẩy mạnh phong trào và tuyên dương danh hiệu Sinh viên năm tốt qua các năm học,...
- Lưu giữ những văn bản, kế hoạch, công văn quan trọng của Hội Sinh viên qua từng năm.

## Setup local dev

Project gồm 2 branches, bao gồm `main` (production) và `dev` (dev/test).

Để đóng góp vào project, các bạn thực hiện:

1. Cài đặt các công cụ, ngôn ngữ lập trình hỗ trợ như NodeJs (https://nodejs.org/en), git và git bash (https://www.git-scm.com/downloads)
2. Clone the project

- Tùy vào hệ điều hành mà bạn chọn, có thể clone bằng nhiều cách khác nhau

3. Chạy các lệnh sau để setup và build được framework trên máy local

## Contribute

Để đóng góp vào các quy trình mới, các bạn hãy thực hiện theo hướng dẫn

## Tạo các file với đúng biểu mẫu

- Trước khi tạo và push project, đảm bảo rằng project đã chạy và build thành công theo hướng dẫn tại phần [Setup](README.md#setup-local-dev)
- Đảm bảo rằng các tài liệu bạn tạo đúng với chuẩn đươc hướng dẫn tại [Hướng dẫn soạn tài liệu](source/huong-dan.md)

### Step by step push new document

1. Check out new branch

```bash
git checkout -b feature/AmazingFeature
```

2. Add new feature

```bash
git add .
```

3. Commit your change

```bash
git commit -m 'feat: Add some AmazingFeature'
```

4. Push your change

```bash
git push --set-upstream origin feature/AmazingFeature
```

5. Go to [pull request](https://github.com/WDS-MHX/HSV_Web/pulls) and create pull request to dev branch.

## ❔ **How to push**

- Role commit
  `{type}: {subject}`
  - type: build | chore | ci | docs | feat | fix | perf | refactor | revert | style | test
  - subject: 'Write a short, imperative tense description of the change'
- Automatic: check lint and format pre-commit

- Example:

```bash
git commit -m "{type}: {subject}"
```

Description
|**Types**| **Description** |
|:---| :--- |
|feat| A new feature|
|fix| A bug fix|
|docs| Documentation only changes|
|style| Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
|refactor| A code change that neither fixes a bug nor adds a feature |
|perf| A code change that improves performance |
|test| Adding missing tests or correcting existing tests |
|build| Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
|ci| 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
|chore| Other changes that don't modify src or test files |
|revert| Reverts a previous commit |
