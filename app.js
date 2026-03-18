const MOOD_DATA = {
  happy: {
    icon: '😊',
    name: 'Happy',
    description: 'You\'re feeling joyful and energetic!',
    color: '#fbbf24',
    songs: [
      { title: 'Sunshine Vibes', artist: 'Happy Beats', emoji: '☀️' },
      { title: 'Feel Good', artist: 'Mood Masters', emoji: '🎵' },
      { title: 'Dancing Queen', artist: 'Joy Music', emoji: '💃' },
      { title: 'Good Times', artist: 'Smile Sounds', emoji: '🎉' },
      { title: 'Celebration', artist: 'Party Mix', emoji: '🎊' },
      { title: 'Happy Days', artist: 'Cheerful Tunes', emoji: '🌈' }
    ]
  },
  sad: {
    icon: '😢',
    name: 'Sad',
    description: 'It\'s okay to feel down. Let the music comfort you.',
    color: '#60a5fa',
    songs: [
      { title: 'Tears in Rain', artist: 'Melancholy Music', emoji: '🌧️' },
      { title: 'Lonely Night', artist: 'Blue Notes', emoji: '🌙' },
      { title: 'Missing You', artist: 'Heart Strings', emoji: '💔' },
      { title: 'Silent Tears', artist: 'Emotional Echo', emoji: '😔' },
      { title: 'Rainy Days', artist: 'Sorrow Sounds', emoji: '☔' },
      { title: 'Empty Room', artist: 'Quiet Moments', emoji: '🕯️' }
    ]
  },
  angry: {
    icon: '😤',
    name: 'Angry',
    description: 'Let\'s channel that energy into something powerful.',
    color: '#f87171',
    songs: [
      { title: 'Breaking Free', artist: 'Rage Records', emoji: '🔥' },
      { title: 'Thunder Storm', artist: 'Power Beats', emoji: '⚡' },
      { title: 'Rebel Heart', artist: 'Fury Music', emoji: '💢' },
      { title: 'War Drums', artist: 'Intense Sounds', emoji: '🥁' },
      { title: 'Unstoppable', artist: 'Force Factor', emoji: '💥' },
      { title: 'Raw Energy', artist: 'Adrenaline Rush', emoji: '⚔️' }
    ]
  },
  chill: {
    icon: '😌',
    name: 'Chill',
    description: 'Relax and unwind with these peaceful tunes.',
    color: '#a78bfa',
    songs: [
      { title: 'Ocean Waves', artist: 'Calm Collective', emoji: '🌊' },
      { title: 'Peaceful Mind', artist: 'Zen Sounds', emoji: '🧘' },
      { title: 'Lazy Sunday', artist: 'Chill Vibes', emoji: '☁️' },
      { title: 'Moonlight', artist: 'Tranquil Tunes', emoji: '🌙' },
      { title: 'Morning Dew', artist: 'Nature Sounds', emoji: '🌿' },
      { title: 'Floating Dreams', artist: 'Ambient Air', emoji: '✨' }
    ]
  }
};

class MoodTunesApp {
  constructor() {
    this.currentMood = null;
    this.currentSongIndex = 0;
    this.currentSongs = [];
    this.uploadedImage = null;
    this.webcamStream = null;
    this.recentMoods = this.loadRecentMoods();
    this.stats = this.loadStats();

    this.initializeElements();
    this.initializeEventListeners();
    this.initializeMoodPills();
    this.renderRecentMoods();
    this.updateStats();
  }

  initializeElements() {
    this.elements = {
      uploadArea: document.getElementById('uploadArea'),
      uploadContent: document.getElementById('uploadContent'),
      uploadedImage: document.getElementById('uploadedImage'),
      removeImageBtn: document.getElementById('removeImageBtn'),
      fileInput: document.getElementById('fileInput'),
      webcamBtn: document.getElementById('webcamBtn'),
      moodPills: document.getElementById('moodPills'),
      detectBtn: document.getElementById('detectBtn'),
      detectedMoodSection: document.getElementById('detectedMoodSection'),
      moodIcon: document.getElementById('moodIcon'),
      moodName: document.getElementById('moodName'),
      moodDescription: document.getElementById('moodDescription'),
      musicSection: document.getElementById('musicSection'),
      loadingSkeleton: document.getElementById('loadingSkeleton'),
      songsGrid: document.getElementById('songsGrid'),
      recentMoodsSection: document.getElementById('recentMoodsSection'),
      recentMoodsList: document.getElementById('recentMoodsList'),
      musicPlayer: document.getElementById('musicPlayer'),
      playerTitle: document.getElementById('playerTitle'),
      playerArtist: document.getElementById('playerArtist'),
      playerAlbumArt: document.getElementById('playerAlbumArt'),
      playBtn: document.getElementById('playBtn'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      progressBar: document.getElementById('progressBar'),
      audioPlayer: document.getElementById('audioPlayer'),
      toast: document.getElementById('toast'),
      webcamModal: document.getElementById('webcamModal'),
      webcamVideo: document.getElementById('webcamVideo'),
      webcamCanvas: document.getElementById('webcamCanvas'),
      captureBtn: document.getElementById('captureBtn'),
      cancelWebcam: document.getElementById('cancelWebcam'),
      closeWebcamModal: document.getElementById('closeWebcamModal'),
      profileBtn: document.getElementById('profileBtn'),
      profileModal: document.getElementById('profileModal'),
      closeProfileModal: document.getElementById('closeProfileModal'),
      totalSongs: document.getElementById('totalSongs'),
      totalMoods: document.getElementById('totalMoods')
    };
  }

  initializeEventListeners() {
    this.elements.uploadArea.addEventListener('click', () => {
      if (!this.uploadedImage) {
        this.elements.fileInput.click();
      }
    });

    this.elements.uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.elements.uploadArea.classList.add('dragover');
    });

    this.elements.uploadArea.addEventListener('dragleave', () => {
      this.elements.uploadArea.classList.remove('dragover');
    });

    this.elements.uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      this.elements.uploadArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.handleImageUpload(file);
      }
    });

    this.elements.fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.handleImageUpload(file);
      }
    });

    this.elements.removeImageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.removeImage();
    });

    this.elements.webcamBtn.addEventListener('click', () => {
      this.openWebcam();
    });

    this.elements.detectBtn.addEventListener('click', () => {
      this.detectMood();
    });

    this.elements.captureBtn.addEventListener('click', () => {
      this.captureWebcam();
    });

    this.elements.cancelWebcam.addEventListener('click', () => {
      this.closeWebcam();
    });

    this.elements.closeWebcamModal.addEventListener('click', () => {
      this.closeWebcam();
    });

    this.elements.playBtn.addEventListener('click', () => {
      this.togglePlay();
    });

    this.elements.prevBtn.addEventListener('click', () => {
      this.playPrevious();
    });

    this.elements.nextBtn.addEventListener('click', () => {
      this.playNext();
    });

    this.elements.profileBtn.addEventListener('click', () => {
      this.openProfile();
    });

    this.elements.closeProfileModal.addEventListener('click', () => {
      this.closeProfile();
    });

    this.elements.audioPlayer.addEventListener('timeupdate', () => {
      this.updateProgress();
    });

    this.elements.audioPlayer.addEventListener('ended', () => {
      this.playNext();
    });

    this.elements.profileModal.addEventListener('click', (e) => {
      if (e.target === this.elements.profileModal) {
        this.closeProfile();
      }
    });

    this.elements.webcamModal.addEventListener('click', (e) => {
      if (e.target === this.elements.webcamModal) {
        this.closeWebcam();
      }
    });
  }

  initializeMoodPills() {
    Object.entries(MOOD_DATA).forEach(([key, mood]) => {
      const pill = document.createElement('button');
      pill.className = 'mood-pill';
      pill.dataset.mood = key;
      pill.innerHTML = `<span>${mood.icon}</span><span>${mood.name}</span>`;
      pill.addEventListener('click', () => this.selectMood(key));
      this.elements.moodPills.appendChild(pill);
    });
  }

  handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
      this.showToast('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedImage = e.target.result;
      this.elements.uploadedImage.src = e.target.result;
      this.elements.uploadedImage.style.display = 'block';
      this.elements.uploadContent.style.display = 'none';
      this.elements.removeImageBtn.style.display = 'flex';
      this.updateDetectButton();
      this.showToast('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.uploadedImage = null;
    this.elements.uploadedImage.style.display = 'none';
    this.elements.uploadedImage.src = '';
    this.elements.uploadContent.style.display = 'block';
    this.elements.removeImageBtn.style.display = 'none';
    this.elements.fileInput.value = '';
    this.updateDetectButton();
  }

  async openWebcam() {
    try {
      this.webcamStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      this.elements.webcamVideo.srcObject = this.webcamStream;
      this.elements.webcamModal.style.display = 'flex';
    } catch (error) {
      this.showToast('Unable to access webcam. Please use image upload instead.');
      console.error('Webcam error:', error);
    }
  }

  captureWebcam() {
    const video = this.elements.webcamVideo;
    const canvas = this.elements.webcamCanvas;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    this.uploadedImage = canvas.toDataURL('image/jpeg');
    this.elements.uploadedImage.src = this.uploadedImage;
    this.elements.uploadedImage.style.display = 'block';
    this.elements.uploadContent.style.display = 'none';
    this.elements.removeImageBtn.style.display = 'flex';

    this.closeWebcam();
    this.updateDetectButton();
    this.showToast('Photo captured successfully!');
  }

  closeWebcam() {
    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach(track => track.stop());
      this.webcamStream = null;
    }
    this.elements.webcamModal.style.display = 'none';
  }

  selectMood(moodKey) {
    document.querySelectorAll('.mood-pill').forEach(pill => {
      pill.classList.remove('active');
    });

    const selectedPill = document.querySelector(`[data-mood="${moodKey}"]`);
    if (selectedPill) {
      selectedPill.classList.add('active');
    }

    this.currentMood = moodKey;
    this.updateDetectButton();
  }

  updateDetectButton() {
    const hasInput = this.uploadedImage || this.currentMood;
    this.elements.detectBtn.disabled = !hasInput;
  }

  async detectMood() {
    this.showLoading();

    await this.delay(1500);

    let detectedMood;

    if (this.uploadedImage) {
      detectedMood = this.mockMoodDetection();
    } else if (this.currentMood) {
      detectedMood = this.currentMood;
    } else {
      this.showToast('Please upload an image or select a mood');
      this.hideLoading();
      return;
    }

    this.currentMood = detectedMood;
    this.displayMoodResult(detectedMood);
    this.loadMusicRecommendations(detectedMood);
    this.saveToRecentMoods(detectedMood);
    this.hideLoading();
  }

  mockMoodDetection() {
    const moods = Object.keys(MOOD_DATA);
    return moods[Math.floor(Math.random() * moods.length)];
  }

  showLoading() {
    const btnText = this.elements.detectBtn.querySelector('.btn-text');
    const btnLoader = this.elements.detectBtn.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    this.elements.detectBtn.disabled = true;
  }

  hideLoading() {
    const btnText = this.elements.detectBtn.querySelector('.btn-text');
    const btnLoader = this.elements.detectBtn.querySelector('.btn-loader');
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    this.elements.detectBtn.disabled = false;
  }

  displayMoodResult(moodKey) {
    const mood = MOOD_DATA[moodKey];

    this.elements.moodIcon.textContent = mood.icon;
    this.elements.moodName.textContent = mood.name;
    this.elements.moodDescription.textContent = mood.description;

    this.elements.detectedMoodSection.style.display = 'block';

    this.elements.detectedMoodSection.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  async loadMusicRecommendations(moodKey) {
    const mood = MOOD_DATA[moodKey];
    this.currentSongs = mood.songs;

    this.elements.musicSection.style.display = 'block';
    this.elements.loadingSkeleton.style.display = 'grid';
    this.elements.songsGrid.innerHTML = '';

    await this.delay(1000);

    this.elements.loadingSkeleton.style.display = 'none';
    this.renderSongs(mood.songs);

    this.elements.musicSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  renderSongs(songs) {
    this.elements.songsGrid.innerHTML = '';

    songs.forEach((song, index) => {
      const card = document.createElement('div');
      card.className = 'song-card';
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <div class="album-cover">
          <span style="font-size: 48px;">${song.emoji}</span>
          <div class="play-overlay">
            <div class="play-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      `;

      card.addEventListener('click', () => {
        this.playSong(index);
      });

      this.elements.songsGrid.appendChild(card);
    });
  }

  playSong(index) {
    if (!this.currentSongs.length) return;

    this.currentSongIndex = index;
    const song = this.currentSongs[index];

    this.elements.playerTitle.textContent = song.title;
    this.elements.playerArtist.textContent = song.artist;
    this.elements.playerAlbumArt.innerHTML = `<span style="font-size: 32px;">${song.emoji}</span>`;

    this.elements.musicPlayer.style.display = 'block';

    this.updatePlayButton(false);
    this.showToast(`Now playing: ${song.title}`);

    this.stats.songsPlayed++;
    this.saveStats();
    this.updateStats();
  }

  togglePlay() {
    const isPlaying = !this.elements.audioPlayer.paused;

    if (isPlaying) {
      this.elements.audioPlayer.pause();
      this.updatePlayButton(false);
    } else {
      this.elements.audioPlayer.play().catch(e => {
        console.log('Playback failed:', e);
      });
      this.updatePlayButton(true);
    }
  }

  updatePlayButton(isPlaying) {
    const svg = this.elements.playBtn.querySelector('svg');
    if (isPlaying) {
      svg.innerHTML = `
        <rect x="6" y="4" width="4" height="16" fill="currentColor"></rect>
        <rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>
      `;
    } else {
      svg.innerHTML = `<polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>`;
    }
  }

  playNext() {
    if (this.currentSongs.length === 0) return;
    this.currentSongIndex = (this.currentSongIndex + 1) % this.currentSongs.length;
    this.playSong(this.currentSongIndex);
  }

  playPrevious() {
    if (this.currentSongs.length === 0) return;
    this.currentSongIndex = (this.currentSongIndex - 1 + this.currentSongs.length) % this.currentSongs.length;
    this.playSong(this.currentSongIndex);
  }

  updateProgress() {
    if (this.elements.audioPlayer.duration) {
      const percent = (this.elements.audioPlayer.currentTime / this.elements.audioPlayer.duration) * 100;
      this.elements.progressBar.style.width = `${percent}%`;
    }
  }

  saveToRecentMoods(moodKey) {
    const mood = MOOD_DATA[moodKey];
    const moodEntry = {
      mood: moodKey,
      name: mood.name,
      icon: mood.icon,
      timestamp: Date.now()
    };

    this.recentMoods.unshift(moodEntry);

    if (this.recentMoods.length > 5) {
      this.recentMoods = this.recentMoods.slice(0, 5);
    }

    localStorage.setItem('moodtunes_recent_moods', JSON.stringify(this.recentMoods));
    this.renderRecentMoods();

    this.stats.moodsDetected++;
    this.saveStats();
    this.updateStats();
  }

  loadRecentMoods() {
    try {
      const stored = localStorage.getItem('moodtunes_recent_moods');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  renderRecentMoods() {
    if (this.recentMoods.length === 0) {
      this.elements.recentMoodsSection.style.display = 'none';
      return;
    }

    this.elements.recentMoodsSection.style.display = 'block';
    this.elements.recentMoodsList.innerHTML = '';

    this.recentMoods.forEach((mood) => {
      const item = document.createElement('div');
      item.className = 'recent-mood-item';

      const timeAgo = this.getTimeAgo(mood.timestamp);

      item.innerHTML = `
        <div class="recent-mood-icon">${mood.icon}</div>
        <div class="recent-mood-info">
          <div class="recent-mood-name">${mood.name}</div>
          <div class="recent-mood-time">${timeAgo}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        this.selectMood(mood.mood);
        this.displayMoodResult(mood.mood);
        this.loadMusicRecommendations(mood.mood);
      });

      this.elements.recentMoodsList.appendChild(item);
    });
  }

  getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }

  loadStats() {
    try {
      const stored = localStorage.getItem('moodtunes_stats');
      return stored ? JSON.parse(stored) : { songsPlayed: 0, moodsDetected: 0 };
    } catch (e) {
      return { songsPlayed: 0, moodsDetected: 0 };
    }
  }

  saveStats() {
    localStorage.setItem('moodtunes_stats', JSON.stringify(this.stats));
  }

  updateStats() {
    this.elements.totalSongs.textContent = this.stats.songsPlayed;
    this.elements.totalMoods.textContent = this.stats.moodsDetected;
  }

  openProfile() {
    this.elements.profileModal.style.display = 'flex';
  }

  closeProfile() {
    this.elements.profileModal.style.display = 'none';
  }

  showToast(message) {
    this.elements.toast.textContent = message;
    this.elements.toast.classList.add('show');

    setTimeout(() => {
      this.elements.toast.classList.remove('show');
    }, 3000);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MoodTunesApp();
});
