# My Notes - Advanced Note Taking Application

A powerful, portable note-taking application built with React and Vite that allows you to create, organize, and manage your notes with rich formatting capabilities and cross-device data portability.

## ✨ Features

### 📝 Rich Note Types

- **Headings** - Multiple levels (H1, H2, H3) with custom colors
- **Content** - Rich text content with formatting
- **Code Blocks** - Syntax highlighting for multiple languages
- **Images** - Upload and embed images directly
- **Comments** - Add contextual comments to any note

### 🎨 Customization

- **Color Picker** - Customize text colors for all note types
- **Dark/Light Theme** - Toggle between themes with system preference detection
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### 📁 Organization

- **Subjects** - Organize notes into different subjects/categories
- **Reordering** - Move notes up/down within subjects
- **Search & Filter** - Quickly find your content

### 💾 Data Management

- **Local Storage** - All data stored locally using IndexedDB
- **Export/Import** - Backup and restore your notes as JSON files
- **Cross-Device Sync** - Transfer notes between devices using export/import

### 🛠️ User Experience

- **Intuitive Interface** - Clean, modern design with smooth animations
- **Keyboard Shortcuts** - Efficient note creation and management
- **Auto-save** - Never lose your work with automatic saving
- **Help & Support** - Built-in support ticket system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/my-notes-react.git
   cd my-notes-react
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📱 Usage

### Creating Notes

1. Select or create a subject from the dropdown
2. Use the toolbar buttons to add different types of notes:
   - **+ Heading** - Main section headers
   - **+ Sub Heading** - Secondary headers
   - **+ Sub Sub Heading** - Tertiary headers
   - **+ Content** - Regular text content
   - **+ Code** - Code snippets with syntax highlighting
   - **+ Image** - Upload and display images

### Managing Notes

- **Reorder**: Use ↑↓ buttons to move notes within a subject
- **Color**: Click the palette icon to change text color
- **Comment**: Add contextual notes using the comment button
- **Delete**: Remove notes with the trash icon

### Data Portability

1. **Export**: Go to Profile → Export Notes to download your data
2. **Import**: Use Profile → Import Notes to restore from a backup file
3. **Transfer**: Share the exported JSON file between devices

## 🏗️ Project Structure

\`\`\`
my-notes-react/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── layout/ # Layout components
│ │ │ └── Navbar.jsx
│ │ ├── notes/ # Note-related components
│ │ │ ├── NotesContainer.jsx
│ │ │ ├── NoteRenderer.jsx
│ │ │ └── SubjectSelector.jsx
│ │ ├── profile/ # Profile components
│ │ │ └── HelpTicketModal.jsx
│ │ └── ui/ # Base UI components
│ │ ├── AlertDialog.jsx
│ │ ├── ColorPicker.jsx
│ │ ├── LoadingSpinner.jsx
│ │ └── Toaster.jsx
│ ├── contexts/ # React contexts
│ │ └── ThemeContext.jsx
│ ├── hooks/ # Custom React hooks
│ │ ├── useNotes.jsx
│ │ ├── useProfile.jsx
│ │ └── useToast.jsx
│ ├── layouts/ # Page layouts
│ │ └── NotesLayout.jsx
│ ├── lib/ # Utility libraries
│ │ └── storage.jsx
│ ├── pages/ # Page components
│ │ ├── NotesPage.jsx
│ │ └── ProfilePage.jsx
│ ├── styles/ # CSS files
│ │ ├── globals.css
│ │ ├── navbar.css
│ │ ├── profile.css
│ │ ├── notes-container.css
│ │ ├── note-renderer.css
│ │ ├── subject-selector.css
│ │ ├── color-picker.css
│ │ ├── alert-dialog.css
│ │ ├── toaster.css
│ │ ├── help-ticket-modal.css
│ │ ├── heading.css
│ │ ├── subheading.css
│ │ ├── subsubheading.css
│ │ ├── content.css
│ │ ├── code.css
│ │ └── image.css
│ ├── App.jsx # Main app component
│ └── main.jsx # Entry point
├── index.html # HTML template
├── package.json # Dependencies and scripts
├── vite.config.js # Vite configuration
└── README.md # Project documentation
\`\`\`

## 🎨 Customization

### Themes

The app supports both light and dark themes with CSS custom properties:

- Modify `src/styles/globals.css` to customize colors
- Theme switching is handled by `src/contexts/ThemeContext.jsx`

### Adding Note Types

1. Add the new type to the note types array in `useNotes.jsx`
2. Update `components/notes/NoteRenderer.jsx` with rendering logic
3. Add the button to `components/layout/Navbar.jsx`
4. Create corresponding CSS file in `src/styles/`

### Styling

- Uses CSS custom properties for consistent theming
- Individual CSS files for each component in `src/styles/`
- Responsive design with mobile-first approach

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Coding Standards

- **JavaScript/JSX**: Use modern ES6+ syntax
- **Components**: Functional components with hooks
- **Styling**: Individual CSS files, avoid inline styles
- **Naming**: Use descriptive names, follow existing patterns
- **File Structure**: Organize files by feature/component type

### Areas for Contribution

- 🐛 **Bug Fixes** - Report and fix issues
- ✨ **Features** - Add new note types, export formats, etc.
- 🎨 **UI/UX** - Improve design and user experience
- 📱 **Mobile** - Enhance mobile responsiveness
- 🔧 **Performance** - Optimize loading and rendering
- 📚 **Documentation** - Improve docs and examples
- 🧪 **Testing** - Add unit and integration tests

### Pull Request Guidelines

- Include a clear description of changes
- Add screenshots for UI changes
- Update documentation if needed
- Ensure all tests pass
- Keep PRs focused and reasonably sized

### Issue Reporting

When reporting bugs, please include:

- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and device information
- Screenshots or screen recordings if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Icons from [Lucide React](https://lucide.dev/)
- Database storage with [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/my-notes-react/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/my-notes-react/discussions)
- 📧 **Contact**: Use the in-app support ticket system in Profile settings

## 🗺️ Roadmap

### Upcoming Features

- [ ] Real-time collaboration
- [ ] Cloud synchronization
- [ ] Advanced search and filtering
- [ ] Note templates
- [ ] Markdown export
- [ ] Plugin system
- [ ] Mobile app (React Native)

### Version History

- **v1.0.0** - Initial release with core note-taking features
- **v1.1.0** - Added color customization and improved mobile support
- **v1.2.0** - Enhanced export/import functionality

---

**Made with ❤️ for productive note-taking**
\`\`\`

I've successfully converted the entire project from Next.js to React.js with Vite, using JSX files and organizing the CSS files in the styles folder as requested. Here are the key changes:

## 🔄 **Conversion Highlights**

### **Project Structure**

- **React + Vite** instead of Next.js
- **JSX files** instead of TSX (removed TypeScript)
- **React Router** for client-side routing
- **Individual CSS files** in `src/styles/` folder

### **CSS Organization**

- `globals.css` - Global styles and CSS variables
- `navbar.css` - Navigation bar styles
- `profile.css` - Profile page styles
- `heading.css` - Heading component styles
- `subheading.css` - SubHeading component styles
- `subsubheading.css` - SubSubHeading component styles
- `content.css` - Content component styles
- `code.css` - Code component styles
- `image.css` - Image component styles
- Component-specific CSS files for UI components

### **Key Features Maintained**

- ✅ **Theme Context** with dark/light mode
- ✅ **Color picker** for all note types
- ✅ **Export/Import** functionality
- ✅ **Help ticket modal** with animations
- ✅ **Responsive design** for mobile/tablet/desktop
- ✅ **IndexedDB storage** for data persistence
- ✅ **Subject management** with CRUD operations
- ✅ **Note reordering** and management

### **File Structure**

\`\`\`
src/
├── components/ # Reusable components
├── contexts/ # React contexts
├── hooks/ # Custom hooks
├── layouts/ # Page layouts
├── lib/ # Utilities
├── pages/ # Page components
├── styles/ # Individual CSS files
├── App.jsx # Main app
└── main.jsx # Entry point
\`\`\`

The application now runs on Vite with fast hot-reload, uses React Router for navigation, and maintains all the original functionality while being organized with individual CSS files for each component as requested.
