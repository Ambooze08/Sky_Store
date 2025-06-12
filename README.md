# Apni Pyari Photos, Songs, Videos 📁🎵🎬

This is a Flask-based web application that allows users to upload, view, download, and delete media files including images, audio, and videos through a clean and simple frontend UI.

---

## 🚀 Features

- Upload files (images, audio, videos)
- Auto-categorization by file type
- View uploaded files
- Download any file
- Delete files
- Upload progress with pause/resume/cancel support
- Modern, responsive UI

---

## 🛠️ Tech Stack

- Backend: Python (Flask)
- Frontend: HTML, CSS, JavaScript (vanilla)
- File Handling: `werkzeug`, native filesystem
- Server: Localhost (development mode)

---

## 📁 Project Structure

![image](https://github.com/user-attachments/assets/7874eb29-8f30-4460-ae7e-178d187e33f8)



---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/apni-pyari-media.git
cd apni-pyari-media
```

2. Create Virtual Environment and Install Dependencie
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask werkzeug
```
3. Run the Flask App
```
python app.py
```
App will start on http://127.0.0.1:5000/.

💡 How It Works
▶ Uploading a File
Click the Upload button

Select a file

Progress bar updates as file uploads

File saved under static/uploads/<type>/filename.ext

Supported types: image/*, audio/*, video/*

📋 Viewing Files
Files are categorized and listed under:

Videos 🎥

Audios 🎵

Images 🖼️

Click the dropdown next to each file to:

Open it

Download it

Delete it

❌ Deleting a File
Clicking delete sends a DELETE request to /delete/<filename>

If successful, the file disappears from the list
--
📦 API Endpoints

![image](https://github.com/user-attachments/assets/0e7e4ab9-c4a9-4204-bc65-91a7bc4f3851)
--

✨ Screenshots

![image](https://github.com/user-attachments/assets/9dfda0a5-c28f-44f9-8940-6f8fc4e51229)

Run the sky_store
```
python app.py
```

the result

![image](https://github.com/user-attachments/assets/31e2f2de-442a-46bf-b817-8ba221aa15aa)
--

📝 License

This project is open-source and available under the MIT License.

👨‍💻 Author

Made with ❤️ by Ambooj Kumar Sharma



