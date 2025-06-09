from flask import Flask, request, jsonify, send_from_directory, render_template
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = os.path.join('static', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file_type = file.content_type.split('/')[0]
    folder = os.path.join(app.config['UPLOAD_FOLDER'], file_type)
    os.makedirs(folder, exist_ok=True)
    filename = secure_filename(file.filename)
    filepath = os.path.join(folder, filename)
    file.save(filepath)
    return 'OK', 200

@app.route('/files')
def list_files():
    all_files = []
    for type_folder in ['video', 'audio', 'image']:
        folder = os.path.join(app.config['UPLOAD_FOLDER'], type_folder)
        if os.path.exists(folder):
            for f in os.listdir(folder):
                all_files.append(f"{type_folder}/{f}")
    return jsonify(all_files)

@app.route('/open/<path:filename>')
def open_file(filename):
    folder = os.path.join(app.config['UPLOAD_FOLDER'], os.path.dirname(filename))
    return send_from_directory(folder, os.path.basename(filename))

@app.route('/download/<path:filename>')
def download_file(filename):
    folder = os.path.join(app.config['UPLOAD_FOLDER'], os.path.dirname(filename))
    return send_from_directory(folder, os.path.basename(filename), as_attachment=True)

@app.route('/delete/<path:filename>', methods=['DELETE'])
def delete_file(filename):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(filepath):
        os.remove(filepath)
        return '', 204
    return 'File not found', 404

if __name__ == '__main__':
    app.run(debug=True)
