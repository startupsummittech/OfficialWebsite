# Event Gallery & Carousel Implementation

## Summary of Changes

This document outlines the changes made to add event photo galleries and a carousel to the Startup Summit 1.0 website.

---

## 1. Gallery Page Enhancement

### Added Event Photo Categories
The gallery page now includes 4 new event categories with 6 photo slots each:

- **Thalir** - Startup Pitch Competition (6 photos)
- **Tharanga Sangamam** - Panel Discussion (6 photos)
- **BharatBuild** - Hackathon (6 photos)
- **FinSmart** - Financial Literacy Workshop (6 photos)

**Total: 24 event photos** (in addition to existing 31 promotional photos)

### Photo Placeholders
- All event photos are configured with placeholder support
- When photos are missing, a stylish placeholder is displayed with:
  - Gradient background
  - Image icon
  - Event category name
  - "Coming Soon" message
  - Dashed border for visual distinction

---

## 2. Home Page Carousel

### New Carousel Section
A beautiful image carousel has been added to the home page featuring:
- 4 slides showcasing different events
- Auto-play functionality (5-second intervals)
- Manual navigation with prev/next buttons
- Dot indicators for quick navigation
- Keyboard support (left/right arrow keys)
- Pause on hover
- Responsive design for mobile devices

### Carousel Features
- **Smooth transitions** with cubic-bezier easing
- **Captions** with event title and description
- **Glassmorphism UI** for navigation buttons
- **Active indicator** animation
- **Fallback design** for missing images

---

## 3. File Structure

### Photo Folders
```
photos/events/
├── bharatbuild/
│   ├── README.md
│   └── (6 photo slots: 1.jpg - 6.jpg)
├── finsmart/
│   ├── README.md
│   └── (6 photo slots: 1.jpg - 6.jpg)
├── thalir/
│   ├── README.md
│   └── (6 photo slots: 1.jpg - 6.jpg)
└── tharanga/
    ├── README.md
    └── (6 photo slots: 1.jpg - 6.jpg)
```

---

## 4. How to Add Photos

### For Gallery Page
1. Navigate to the appropriate event folder in `photos/events/`
2. Name your photos: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`
3. Upload/paste the photos into the folder
4. Photos will automatically appear on the gallery page (no code changes needed)

### For Carousel
The carousel uses the first photo from each event folder:
- `bharatbuild/1.jpg` for BharatBuild
- `thalir/1.jpg` for Thalir
- `tharanga/1.jpg` for Tharanga Sangamam
- `finsmart/1.jpg` for FinSmart

To change carousel images, simply update these specific photos.

---

## 5. Technical Details

### CSS Additions
- `.event-carousel-section` - Carousel wrapper styling
- `.carousel-container` - Container with border radius
- `.carousel-wrapper` - Flex container for slides
- `.carousel-slide` - Individual slide styling
- `.carousel-caption` - Gradient caption overlay
- `.carousel-nav` - Navigation button styling
- `.carousel-indicators` - Dot indicators
- Mobile responsive styles for screens < 768px

### JavaScript Functions
- `initCarousel()` - Main initialization function
  - Creates slides dynamically
  - Sets up navigation handlers
  - Implements auto-play
  - Handles keyboard navigation
  - Manages active indicators

### Data Structure Updates
```javascript
Data.gallery: [
  // ... existing photos ...
  // + 24 event photos (6 per event × 4 events)
]

Data.carouselImages: [
  // 4 carousel slides with titles and descriptions
]
```

---

## 6. Design Features

### Placeholder Design
When photos are not yet available, the system shows:
- **Gallery**: Bordered card with icon and "Coming Soon" text
- **Carousel**: Full-height gradient background with event details

### Responsive Behavior
- **Desktop**: Full-width carousel (500px height)
- **Mobile**: Reduced height (300px), smaller navigation buttons
- **Touch-friendly**: All interactive elements meet 44px minimum size

---

## 7. Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS transforms for carousel animation
- `onerror` handler for image fallbacks

---

## 8. Performance Considerations
- Images lazy-load with native browser support
- Auto-play pauses when user hovers (reduces CPU usage)
- Efficient DOM manipulation using innerHTML
- No external carousel libraries (vanilla JS)

---

## 9. Accessibility
- ARIA labels on navigation buttons
- Keyboard navigation support
- High contrast text on captions
- Screen reader friendly structure

---

## 10. Future Enhancements (Optional)

### Potential Additions
- [ ] Swipe gesture support for mobile
- [ ] Full-screen image view on click
- [ ] Image thumbnails in carousel
- [ ] Video support in carousel
- [ ] Photo filtering by event
- [ ] Social sharing buttons

---

## Questions?

For any issues or questions about the gallery and carousel implementation, please refer to:
- CSS: Lines 770-890 in index.html (carousel styles)
- JavaScript: Lines 3872-3958 in index.html (carousel logic)
- Data: Lines 3699-3760 in index.html (gallery and carousel data)
