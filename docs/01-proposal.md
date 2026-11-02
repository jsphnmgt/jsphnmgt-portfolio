# Proposal

## The idea

jsphnmgt Portfolio is a website with two connected experiences: a professional portfolio showcasing my projects, experience, education, certificates, and contact information, and an interactive personal room where visitors explore my interests through clickable objects.

## Why

I want to present both my qualifications and personality without overcrowding the professional portfolio. Separating the two experiences lets visitors explore my work first and choose to learn more about my personal interests.

The project also helps me practice React, responsive design, state management, accessible interactions, and animation.

## Scope

The first version includes:
- A professional portfolio with Home, Projects, Experience, Education, Certificates, and Contact sections.
- Project and certificate overlays with previews and supporting details.
- An Explore my room button connecting the two experiences.
- An illustrated room with glowing interactive objects and an alternative navigation menu.
- Five personal overlays:
  - Personal Computer: Welcome, About Me, Favorites, and Currents.
  - Watchlist: Favorites, Currently Watching, and Watched.
  - Reading List: Favorites, Currently Reading, and Finished Reading.
  - Game Shelf: Favorites, Currently Playing, and an alphabetical game collection.
  - Music Corner: Songs, Playlists, Genres, and Artists.
- Detail popups for reading titles, watchlist entries, and games.
- Spotify embeds for songs and playlists.
- Responsive layouts, keyboard navigation, and reduced-motion alternatives.

User accounts, visitor editing, and a backend database are outside the first version. An artwork collection is a possible future addition.

## Milestones

- [x] Design the professional portfolio and personal room in Figma.
- [x] Implement the professional sections and detail overlays.
- [x] Build the room, clickable objects, and Explore Room menu.
- [x] Implement the five personal overlays and collection content.
- [x] Add collection detail popups and Spotify integration.
- [x] Add animations and responsive styling.
- [X] Complete the project documentation and final review.

## Technical approach

The website uses React, Vite, and CSS, with shared design variables to keep styling consistent. Collection content is stored in local JSON files and component data. GitHub Actions builds and deploys the static website to GitHub Pages.

## Open questions

- How well do the room interactions work on smaller touchscreens?
- Are the animations consistent and comfortable across devices?
- Is the Explore Room menu clear enough for visitors who do not immediately recognize the clickable objects?
- Can an artwork collection be added later?