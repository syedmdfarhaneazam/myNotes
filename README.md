<style>
body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f7fa;
    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
}
h1 {
    color: #2c3e50;
    font-size: 2.5em;
    text-align: center;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
}
h2 {
    color: #2980b9;
    font-size: 1.8em;
    margin-top: 20px;
}
h3 {
    color: #34495e;
    font-size: 1.4em;
}
p {
    font-size: 1.1em;
    margin: 10px 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    background: #ecf0f1;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
}
code {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 2px 5px;
    border-radius: 3px;
}
pre {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
}
a {
    color: #3498db;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
img {
    max-width: 100%;
    border-radius: 8px;
    margin: 10px 0;
}
.container {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.feature-box {
    background: #e8f4f8;
    padding: 15px;
    border-left: 5px solid #3498db;
    margin: 10px 0;
    border-radius: 5px;
}
</style>

<div class="container">

# 📝 NoteMaster: Your Ultimate Digital Notes Companion

Welcome to **NoteMaster**, a powerful and private note-taking app designed for students and learners to capture lecture notes, organize thoughts, and code on the go. With a sleek interface and robust features, NoteMaster helps you stay productive while keeping your notes secure in your browser's IndexedDB.

## ✨ Features

### 📚 Multi-Subject Note Organization
Organize your notes by adding as many subjects as you need. Create a hierarchy with:
- **Headings**
- **Sub-headings**
- **Sub-sub-headings**
- **Content blocks**

Each level supports **32 configurable color shades** for fonts, allowing you to personalize your notes for better readability and aesthetics.

<div class="feature-box">
**Color Customization Example**  
Choose from 32 vibrant shades to style your headings and content. Preview changes in real-time!  
</div>

### 💻 Code Support
Write and format code in multiple languages with **auto-coloring** and **auto-tabbing**:
- Python
- Java
- JavaScript
- Shell
- C
- C++

Example Python code block:
```python
def greet(name):
    return f"Hello, {name}!"
print(greet("NoteMaster User"))
```

### 🖼️ Image Integration
Add images to your notes to complement your learning. Upload diagrams, screenshots, or handwritten notes to enrich your content.

![Notes Page Placeholder](notes-page-placeholder.png)

### 🔒 Privacy First
Your notes are stored securely in your browser's **IndexedDB**, ensuring they remain private and inaccessible to others unless you choose to share them.

### 📤 Import & Export
- **Import**: Append your friends' notes to your collection by importing their exported files.
- **Export**: Select a subject, export it as a file, and share it with others.

### 🎨 Themes
Choose from a variety of themes to match your mood:
- Deep Sea
- Sunshine
- Twilight
- Light
- Forest
- Bubble Gum
- Golden Dark

![Color Picker Placeholder](color-picker-placeholder.png)

### ⚙️ Note Color Configuration
Set default colors for different note types (headings, sub-headings, content, etc.). Preview your changes in real-time for a seamless experience.

### ⌨️ Keyboard Shortcuts
Boost your productivity with intuitive shortcuts:
- `Alt+P`: Go to Notes page
- `Alt+S`: Go to Profile page
- `Alt+H`: Show/Hide help modal
- Add new Heading, Sub-heading, Sub-sub-heading, Content block, or Code block
- Close modals/overlays
- Scroll to bottom of page

### 📽️ Picture-in-Picture Mode
Keep NoteMaster on top while watching video lectures in full-screen mode. Take notes without switching tabs!

![Picture-in-Picture Placeholder](pip-placeholder.png)

### ⚡ Performance Settings
- **Auto-save**: Changes are saved automatically as you type.
- **Data Persistence**: Notes are stored locally in your browser.
- **Optimized Rendering**: Ensures smooth performance even with large note collections.

## 📱 Mobile-Friendly
NoteMaster is fully responsive, making it easy to take notes on the go.

![Mobile Mode Placeholder](mobile-mode-placeholder.png)

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/syedmdfarhaneazam/myNotes.git
   ```

2. **Install Dependencies**:
   ```bash
   cd myNotes
   npm install
   ```

3. **Run the App**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS
- **Storage**: IndexedDB
- **Code Highlighting**: Prism.js
- **Build Tool**: Vite

## 🤝 Contributing
We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📸 Screenshots
![Profile Page Placeholder](profile-page-placeholder.png)

</div>
