# Sử dụng image Node.js chính thức
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và yarn.lock
COPY package.json yarn.lock ./

# Cài đặt các phụ thuộc bằng yarn
RUN yarn install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch ứng dụng
RUN yarn build

# Cài đặt server để phục vụ ứng dụng
RUN yarn global add serve

# Chạy ứng dụng
CMD ["serve", "-s", "build"]

# Mở cổng 3000
EXPOSE 3000