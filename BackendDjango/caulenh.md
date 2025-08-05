mỗi lần sửa builder cần 
python manage.py makemigrations
python manage.py migrate


// b1
django-admin startproject backend .

// b2
# tạo
python -m venv venv
# kích hoạt
#   Windows
venv\Scripts\activate
#   macOS/Linux
source venv/bin/activate

# cài lib
pip install django djangorestframework

pip freeze > requirements.txt

python manage.py startapp builder

pip install django-cors-headers
