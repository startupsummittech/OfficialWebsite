# Quick Guide: Adding Event Photos

## 📸 Where to Put Photos

### Each Event Has Its Own Folder:
```
photos/events/
├── bharatbuild/    → BharatBuild Hackathon
├── finsmart/       → FinSmart Workshop
├── thalir/         → Thalir Pitch Competition
└── tharanga/       → Tharanga Sangamam Panel
```

---

## 📝 Photo Naming Convention

**IMPORTANT:** Photos MUST be named exactly as follows:

```
1.jpg
2.jpg
3.jpg
4.jpg
5.jpg
6.jpg
```

**Note:** 
- Use lowercase numbers
- Use `.jpg` extension (or `.JPG`, `.png`, `.PNG` are also supported)
- No spaces, no prefixes, no suffixes

---

## 🎯 Which Photos Go Where?

### Gallery Page (6 photos per event)
All photos from each event folder appear in the Gallery page under their respective event sections.

### Home Page Carousel (4 slides)
The carousel uses specific photos:
- **Slide 1:** `bharatbuild/1.jpg` → BharatBuild
- **Slide 2:** `thalir/1.jpg` → Thalir  
- **Slide 3:** `tharanga/1.jpg` → Tharanga Sangamam
- **Slide 4:** `finsmart/1.jpg` → FinSmart

💡 **Tip:** Pick your best action shots for `1.jpg` as they appear in the carousel!

---

## ✅ Step-by-Step: Adding Photos

### Method 1: Using File Explorer
1. Open the event folder (e.g., `photos/events/bharatbuild/`)
2. Copy your 6 best photos into the folder
3. Rename them to: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`
4. Refresh the website - photos appear automatically!

### Method 2: Using VS Code
1. Open the event folder in VS Code
2. Drag and drop photos into the folder
3. Right-click each photo → Rename → Use the naming convention
4. Save and refresh browser

---

## 📐 Recommended Photo Specifications

### For Best Results:
- **Aspect Ratio:** 16:9 or 4:3
- **Resolution:** Minimum 1920x1080px (Full HD)
- **File Size:** Under 500KB per photo (optimize for web)
- **Format:** JPG preferred (PNG also works)

### Photo Optimization Tools:
- TinyPNG.com (online)
- ImageOptim (Mac)
- GIMP (Windows/Mac/Linux)

---

## 🎨 Photo Selection Tips

### What Makes a Great Event Photo?

✅ **DO:**
- Show people actively engaged
- Capture energy and emotion
- Include branding/logos when visible
- Show diversity of participants
- Good lighting and focus

❌ **DON'T:**
- Blurry or dark photos
- Photos with inappropriate content
- Photos without proper permissions
- Low-resolution images
- Photos with distracting backgrounds

---

## 🔧 Troubleshooting

### Photos Not Showing?
1. **Check file names** - Must be exactly `1.jpg`, `2.jpg`, etc.
2. **Check file location** - Must be in correct event folder
3. **Clear browser cache** - Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. **Check file permissions** - Ensure files are readable

### Photos Show as Placeholders?
- This is intentional! Until you add actual photos, styled placeholders appear
- Placeholders say "Coming Soon" with the event name
- This looks professional and keeps the layout intact

### Want to Test Before Live?
- Add test photos with correct names
- Open `index.html` in a browser locally
- Check both Gallery page and Home page carousel
- Once satisfied, commit and push to GitHub

---

## 🚀 After Adding Photos

### What Happens Automatically:
✨ Gallery page updates with all 6 photos per event
✨ Home page carousel updates with featured photos
✨ Placeholders disappear
✨ Smooth animations and hover effects work
✨ Mobile responsive layouts adjust

### No Code Changes Needed!
The website is already configured to detect and display your photos automatically.

---

## 📞 Need Help?

If photos aren't showing up correctly:
1. Double-check file names (case-sensitive!)
2. Verify folder structure
3. Check console for errors (F12 in browser)
4. Ensure photos are valid image files

---

## 🎉 Example Workflow

```bash
# 1. Navigate to event folder
cd photos/events/bharatbuild/

# 2. List current files
ls
# Output: README.md

# 3. Add your photos (rename as needed)
# Copy photos and rename to: 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg

# 4. Verify
ls
# Output: 1.jpg  2.jpg  3.jpg  4.jpg  5.jpg  6.jpg  README.md

# 5. Refresh website - Done! ✅
```

---

Remember: **Quality over quantity!** 6 great photos per event are better than many mediocre ones.

Happy photo sharing! 📸✨
