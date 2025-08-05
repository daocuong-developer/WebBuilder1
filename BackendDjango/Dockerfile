FROM python:3.10

# Tạo thư mục làm việc
WORKDIR /app

# Copy file requirements trước để tận dụng cache
COPY requirements.txt .

# Cài thư viện
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ source vào container
COPY . .

