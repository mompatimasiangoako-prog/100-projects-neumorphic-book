# 100 Projects - Neumorphic Digital Book

A premium neumorphic design system for documenting and showcasing 100 coding projects. Built with vanilla HTML, CSS, and JavaScript with a focus on soft, tactile, interactive design.

## 🎨 Design Features

### Neumorphic Aesthetic
- **Soft, neutral color palette** (#E8E8E8 primary background)
- **Opposing shadows** creating raised and inset effects
- **Premium tactile feel** like a physical notebook
- **Smooth transitions** (150-400ms) for all interactions
- **Large, generous rounded corners** (16px-32px)

### Components
- ✨ **Cover Page** - Impressive neumorphic book cover with statistics
- 📚 **Project Cards** - Raised cards with inset image containers
- 📊 **Progress Tracking** - Animated progress bars and circular indicators
- 🎯 **Statistics Dashboard** - Large neumorphic stat cards
- 🌓 **Dark Mode** - Comprehensive dark neumorphic system
- ⚡ **Microinteractions** - Smooth animations and tactile feedback
- 🎯 **Editable Fields** - Add/edit projects with images and skills
- 🏷️ **Skill Tags** - Interactive pill-shaped skill indicators

## 🚀 Getting Started

### Quick Start
1. Clone the repository
2. Open `index.html` in your browser
3. Start adding your 100 projects!

### No Build Required
This is a pure vanilla implementation with no build tools or dependencies required. Everything runs directly in the browser.

## 📋 Features

### Project Management
- Add up to 100 projects
- Edit project details (title, description, images)
- Tag projects with skills
- Track what you learned
- Rate projects (1-5 stars)
- Mark projects as completed

### Navigation
- **HOME** - Cover page with progress overview
- **CONTENTS** - All projects grid view
- **PROJECTS** - Detailed project list
- **PROGRESS** - Statistics and completion tracking
- **SEARCH** - Filter and search projects
- **THEME** - Toggle between light and dark modes

### Data Management
- Projects saved to browser localStorage
- Export projects as JSON
- Import projects from JSON
- Automatic progress tracking

## 🎮 Keyboard Shortcuts

- **← / →** - Navigate between pages
- **Alt + T** - Toggle theme (light/dark)
- **Alt + S** - Open search
- **Esc** - Close modal
- **Tab** - Navigate with keyboard

## 🌓 Dark Mode

The dark mode maintains the neumorphic aesthetic with:
- Dark charcoal backgrounds (#1A1A1A)
- Subtle light shadows for depth
- Adjusted accent colors for readability
- Smooth transitions between themes

## 📁 Project Structure

```
100-projects-neumorphic-book/
├── index.html                 # Main HTML structure
├── css/
│   ├── neumorphic.css        # Base neumorphic styles
│   ├── interactions.css       # Animations and microinteractions
│   ├── dark-mode.css         # Dark mode system
│   └── styles.css            # Additional components
├── js/
│   ├── app.js                # Main application logic
│   └── interactions.js       # Interactive utilities
└── README.md                 # This file
```

## 🛠️ Customization

### Colors
Edit CSS variables in `css/neumorphic.css`:
```css
:root {
    --color-bg-primary: #E8E8E8;
    --color-accent: #6B5B95;
    --color-success: #7CB342;
    /* ... more colors ... */
}
```

### Fonts
```css
--font-heading: 'Montserrat', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'Fira Code', monospace;
```

### Shadows
```css
--shadow-light: 0 8px 16px rgba(255, 255, 255, 0.8);
--shadow-dark: 0 8px 16px rgba(0, 0, 0, 0.15);
```

## 🎨 Neumorphic Elements

### Raised Components
Used for buttons, navigation, cards, and controls:
```html
<div class="raised">
    Appears elevated from the surface
</div>
```

### Inset Components
Used for inputs, text areas, and containers:
```html
<div class="inset">
    Appears pressed into the surface
</div>
```

## 💾 Data Storage

Projects are stored in browser localStorage under the key `projects`. Each project object contains:

```javascript
{
    id: 1,
    number: 1,
    title: "My First Project",
    description: "Description of the project",
    image: "data:image/...", // Base64 encoded image
    skills: ["HTML", "CSS", "JavaScript"],
    learned: "What I learned...",
    rating: 5,
    completed: true,
    date: "2024-01-01T00:00:00.000Z"
}
```

## 📱 Responsive Design

- **Desktop** (1024px+) - Full featured experience
- **Tablet** (768px-1023px) - Optimized grid layout
- **Mobile** (< 768px) - Compact bottom navigation, single column layout

## ⌨️ Browser Support

Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Key Design Principles

### Soft & Tactile
- Large diffuse shadows instead of sharp edges
- Smooth rounded corners throughout
- Layered depth using shadow opposition
- Gentle color transitions

### Premium & Minimal
- Monochromatic primary palette
- Accent colors used sparingly
- Generous whitespace
- Editorial typography hierarchy

### Interactive & Responsive
- Keyboard navigation support
- Smooth 150-400ms transitions
- Microinteractions on all interactive elements
- Fully responsive design

## 🚀 Upcoming Features

- Search functionality with filters
- Statistics dashboard with charts
- Milestone celebrations (10, 25, 50, 75, 100 projects)
- Category organization system
- Project timeline view
- Cloud sync capability
- GitHub integration

## 🤝 Contributing

Feel free to fork, modify, and improve! Some ideas:
- Add more animation variations
- Create different neumorphic color schemes
- Implement data visualization
- Add export to PDF functionality
- Create plugin system

## 📝 License

MIT License - Feel free to use this for personal projects!

## 🎓 Resources

### Neumorphic Design
- [Neumorphism.io](https://neumorphism.io/) - Shadow/color generator
- [Soft UI Design](https://www.uxdesigninstitute.com/blog/neumorphism/)

### Technologies
- Vanilla JavaScript (ES6+)
- CSS3 (Grid, Flexbox, Animations)
- localStorage API
- File API for uploads

## 🙏 Credits

Inspired by premium digital journals, neumorphic design principles, and the developer community's need for beautiful project showcases.

---

**Built with ❤️ for developers documenting their coding journey**

**[View Repository](https://github.com/mompatimasiangoako-prog/100-projects-neumorphic-book)**
