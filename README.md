# JayaChandran N — Two-Wheeler Service & Repair Workshop

> **Source Stitch Project ID:** `11428082770202148476`  
> **Brand & Philosophy:** Independent Master Motorcycle & Scooter Craftsmanship — *"Your Bike, Our Care."*

A modern, high-conversion website for **JayaChandran N Two-Wheeler Service**, engineered with technical precision aesthetics, dynamic theme switching, an interactive WhatsApp appointment dispatcher, and full mobile responsiveness.

---

## ⚡ Highlights & Key Features

1. **Dual Precision Themes (Apex Orange & Sky Blue)**
   - **Apex Orange (🔥 Default):** High-octane dark workshop aesthetics inspired by track-side paddock telemetry (`#ff5708`, `#ffb59c`, `#131315`).
   - **Sky Blue (⚡ High-Tech Precision):** Clean aerospace and digital telemetry palette (`#00b4d8`, `#38bdf8`, `#060d17`).
   - Includes an instant live theme toggle with `localStorage` memory and an alternate dedicated `blue-theme.html`.

2. **Mobile-First Responsive Navigation**
   - Fixed glassmorphic header with scroll progress indicator bar.
   - Smooth slide-down mobile navigation drawer with animated hamburger toggle.
   - Active section highlighting on scroll (ScrollSpy).

3. **Direct WhatsApp Appointment Dispatcher**
   - High-conversion booking form with validation (Customer Name, 10-digit Phone, Bike Brand, Model, Service Type, Date, Time Slot, and Custom Symptoms).
   - Date picker prevents past dates.
   - Generates a cleanly formatted, ready-to-send appointment request directly to **JayaChandran sir (`+91 94430 92866`)**.

4. **8 Comprehensive Workshop Service Modules**
   - *General Bike Servicing*
   - *Engine Repair & Overhaul*
   - *Oil Change & Flush*
   - *Brake Repair & Bleeding*
   - *Chain Clean & Tensioning*
   - *Battery & Electrical Checks*
   - *Tyre & Puncture Repair*
   - *Clutch & Gear Inspection*
   - Each card features a 1-tap WhatsApp inquiry button pre-filled with the specific service title.

5. **Technician Dossier & Workshop Intake Protocol**
   - Highlights honest diagnostics, genuine OEM parts standard, and direct mechanic communication without dealership service advisors.
   - 4-step intake checklist: Ride-feel review, multi-point mechanical inspection, upfront cost breakdown, and post-assembly test ride.

6. **Interactive Workshop Gallery with Lightbox**
   - Categorized filter tabs (`All`, `Engine`, `Brakes`, `Maintenance`, `Workshop Bays`).
   - Fullscreen lightbox viewer with keyboard `Esc` dismiss and backdrop click support.

7. **Collapsible FAQ Accordion**
   - Answers common questions regarding turnaround time, OEM spare parts, transparent estimates, breakdown support, and payment modes.

8. **Roadside Assistance & Mobile Action Bar**
   - Sticky mobile bar at the bottom with instant **Call Direct (`tel:+919443092866`)** and **WhatsApp Booking**.
   - Integrated Google Maps directions link for workshop location coordinates.

---

## 📁 Project Structure

```text
Appa Website/
├── index.html           # Main production website (with dynamic theme switcher)
├── blue-theme.html      # Dedicated standalone Sky & Dark Blue theme
├── css/
│   └── styles.css       # Custom styles, HUD telemetry glow, and animations
├── js/
│   └── main.js          # Interactive JavaScript (validation, drawer, lightbox, WhatsApp)
├── server.js            # Zero-dependency local Node.js HTTP server
├── package.json         # Project metadata and npm scripts
└── README.md            # Documentation and instructions
```

---

## 🚀 How to Run Locally

### Option 1: Using the Built-in Node.js Server (Recommended)
Open a terminal in this folder and run:
```bash
npm start
```
Then open your browser to **[http://localhost:3000](http://localhost:3000)**.

To preview the standalone blue variant:
- **[http://localhost:3000/blue-theme.html](http://localhost:3000/blue-theme.html)**

### Option 2: Double-Click Directly
Because all scripts and stylesheets are statically bundled, you can simply **double-click `index.html`** in File Explorer to open it immediately in Google Chrome, Microsoft Edge, Firefox, or Safari!

---

## 🌐 Deployment Options

This website is completely static and ready for instant free deployment anywhere:

- **Vercel / Netlify:** Drag and drop the `Appa Website` folder or connect via GitHub repository.
- **GitHub Pages:** Push to a repository, go to `Settings > Pages`, and choose `Deploy from a branch (main / root)`.
- **Firebase / Cloudflare Pages:** Run `npx wrangler pages deploy .` or `firebase deploy`.
- **Traditional Hosting (cPanel / Apache / Nginx):** Upload all files to `public_html/`.

---

## 📞 Workshop Contact Information

- **Owner / Master Technician:** JayaChandran N
- **Mobile / WhatsApp:** `+91 94430 92866`
- **Email:** `jayachandrannarayanaswamy@gmail.com`
- **Hours:** Monday – Saturday: 9:00 AM – 8:00 PM (Sunday: Urgent / Pre-booked intake)
