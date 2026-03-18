# MoodTunes 🎵

**Your Mood, Your Music** - A modern, beautiful web application that detects your mood and recommends perfect songs to match how you're feeling.

## Features

### Core Functionality
- **Image Upload**: Upload a photo to detect your mood
- **Webcam Capture**: Use your webcam to capture your current expression
- **Manual Mood Selection**: Choose from Happy, Sad, Angry, or Chill moods
- **Smart Fallback System**: Works perfectly even without API connections
- **Music Recommendations**: Get personalized song suggestions based on your mood

### User Experience
- **Modern Dark Gradient Theme**: Beautiful purple/pink gradient with glassmorphism effects
- **Smooth Animations**: Polished transitions and micro-interactions throughout
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Clear feedback with skeleton screens and loading animations
- **Recent Moods History**: View your last 5 detected moods
- **Local Storage**: All data persists across sessions
- **User Statistics**: Track your songs played and moods detected

### Technical Features
- **Zero Dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **Modular Architecture**: Clean separation of concerns
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Progressive Enhancement**: Works without webcam or file upload
- **Performance Optimized**: Fast loading and smooth interactions

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moodtunes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Usage

1. **Detect Your Mood**:
   - Upload a photo of yourself
   - OR use your webcam to capture a photo
   - OR manually select your current mood

2. **Get Recommendations**:
   - Click "Analyze Mood" to get song recommendations
   - Browse through mood-matched music

3. **Play Music**:
   - Click any song card to start playing
   - Use the music player controls at the bottom
   - Navigate between songs with previous/next buttons

4. **View History**:
   - Check your recent moods in the Recent Moods section
   - Click any previous mood to reload those recommendations

5. **Track Statistics**:
   - Click the profile icon to view your stats
   - See total songs played and moods detected

## Project Structure

```
moodtunes/
├── index.html          # Main HTML structure
├── styles.css          # All styling with modern design
├── app.js              # Application logic and functionality
├── package.json        # Project configuration
└── README.md           # This file
```

## Design Philosophy

- **User-First**: Every feature is designed for intuitive use
- **No Surprises**: Clear feedback for every action
- **Graceful Degradation**: Works even when features fail
- **Performance**: Optimized for speed and smoothness
- **Accessibility**: Semantic HTML and keyboard navigation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential features for future versions:
- Real AI mood detection integration
- Spotify/Apple Music API integration
- Social sharing features
- Custom playlist creation
- Advanced statistics and insights
- Multiple language support

## License

MIT License - Feel free to use this project for learning or commercial purposes.

---

Built with ❤️ by the MoodTunes team
