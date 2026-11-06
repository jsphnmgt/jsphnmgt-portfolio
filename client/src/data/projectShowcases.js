import capsicamHome from "../assets/optimized/capsicam_homescreen.jpg.webp";
import capsicamResults from "../assets/optimized/capsicam_capture.jpg.webp";
import capsicamHistory from "../assets/optimized/capsicam_recent-scans.jpg.webp";
import capsicamAccount from "../assets/optimized/capsicam_account.jpg.webp";
import courseWithoutCards from "../assets/optimized/course-companion_without-cards.png.webp";
import courseWithCards from "../assets/optimized/course-companion_with-cards.png.webp";
import haulamHome from "../assets/optimized/HAUlam_customerview-home.png.webp";
import haulamDishes from "../assets/optimized/HAUlam_customerview-stall-dishes.png.webp";
import haulamDishDetails from "../assets/optimized/HAUlam_customerview-stall-dish-view.png.webp";
import haulamAccount from "../assets/optimized/HAUlam_account.png.webp";
import mysticaMovie from "../assets/optimized/mystica_movie-page.png.webp";
import mysticaHome from "../assets/optimized/mystica_home.png.webp";
import mysticaAbout from "../assets/optimized/mystica_about.png.webp";
import mysticaQuestions from "../assets/optimized/mystica_question.png.webp";
import bookshelfWithBooks from "../assets/optimized/my-bookshelf_home-with-books.png.webp";
import bookshelfEmpty from "../assets/optimized/my-bookshelf_home.png.webp";

export const projectShowcases = {
  "My Bookshelf": {
    problem: "Give a personal book collection a visual home that grows as books are added.",
    role: "Developer",
    roleDescription: "Developed and styled this solo course project from a provided starter template, practicing React, JavaScript, and CSS.",
    built: "A React app for adding books by title and author, with required-field validation, a live book count, and a responsive shelf of colored book spines. A text list shows each book and its author, while React Router handles Home and About navigation. The wood-and-parchment interface includes an empty-shelf state; books are stored in memory and reset on reload.",
    views: [
      { label: "Empty shelf", image: bookshelfEmpty, caption: "The initial Home view includes title and author fields, a book count, and a prompt to add the first book.", fit: "contain", presentation: "detail", aspectRatio: "1600 / 705" },
      { label: "Shelf with books", image: bookshelfWithBooks, caption: "Added books appear as colored spines arranged into shelf rows, with their titles and authors listed underneath.", fit: "cover", position: "50% 0%" },
    ],
  },
  CapsiCAM: {
    problem: "Make image-based chili pepper leaf disease classification accessible through a mobile application.",
    role: "Frontend Developer & UI/UX Designer",
    roleDescription: "Designed the user experience and interface and developed the frontend as part of the CapsiCAM team.",
    built: "An Android app that classifies camera or gallery images as Bacterial Leaf Spot, Cercospora Leaf Spot, or Healthy. TensorFlow Lite runs model inference on the device, while prediction results include visual heatmaps highlighting image regions associated with the prediction. Supabase supports account sign-in and saved scan history, with an internet connection required for these cloud features.",
    views: [
      { label: "Home screen", image: capsicamHome, caption: "The dashboard brings image capture, scan summaries, and recent scans into one place.", fit: "contain", device: "phone", aspectRatio: "945 / 2048" },
      { label: "Scan results", image: capsicamResults, caption: "The result screen shows the leaf classification, confidence indicator, scan information, and highlighted areas.", fit: "contain", device: "phone", aspectRatio: "945 / 2048" },
      { label: "Scan history", image: capsicamHistory, caption: "Past scans are listed with a leaf thumbnail, classification, and date for quick review.", fit: "contain", device: "phone", aspectRatio: "945 / 2048" },
      { label: "Account", image: capsicamAccount, caption: "Account settings bring together profile access, display mode, language, and help options.", fit: "contain", device: "phone", aspectRatio: "945 / 2048" },
    ],
  },
  "Course Companion": {
    problem: "Bring subject lessons and study tools together in a student-friendly learning interface.",
    role: "Designer & Developer",
    roleDescription: "Built this solo project with React, HTML, and CSS.",
    built: "A subject-based lesson interface with topic navigation and a flashcard form for adding questions and answers.",
    views: [
      { label: "Without cards", image: courseWithoutCards, caption: "The Biology lesson and empty question-and-answer form before any flashcards are added.", fit: "cover", position: "50% 0%" },
      { label: "With cards", image: courseWithCards, caption: "Added flashcards appear below the form, with controls to flip each answer or delete a card.", fit: "cover", position: "50% 0%" },
    ],
  },
  HAUlam: {
    problem: "Help students discover and revisit food stalls at Holy Angel University.",
    role: "Frontend Developer & UI/UX Designer",
    roleDescription: "Designed the user experience and interface and developed the frontend as part of the HAUlam team.",
    built: "A Flutter app for browsing campus food stalls, searching for dishes by name or category, and bookmarking favorite stalls. Supabase Auth supports secure sign-up and login, while Supabase Database powers real-time updates to stall and dish information.",
    views: [
      { label: "Stall browser", image: haulamHome, caption: "Browse canteen stalls with campus locations, opening status, and bookmark controls.", fit: "contain", device: "phone", aspectRatio: "393 / 852" },
      { label: "Stall menu", image: haulamDishes, caption: "Explore a stall's dishes, check operating hours, and filter the menu by food tags.", fit: "contain", device: "phone", aspectRatio: "393 / 852" },
      { label: "Dish details", image: haulamDishDetails, caption: "View a dish's photo, price, description, and food tags before choosing what to eat.", fit: "contain", device: "phone", aspectRatio: "393 / 852" },
      { label: "Account", image: haulamAccount, caption: "Manage profile details, password and security settings, and account access.", fit: "contain", device: "phone", aspectRatio: "393 / 852" },
    ],
  },
  MYSTICA: {
    problem: "Create an inviting way to explore Studio Ghibli films and their worlds.",
    role: "Designer & Developer",
    roleDescription: "Created this solo website using HTML, CSS, and JavaScript.",
    built: "A Ghibli-inspired website with an atmospheric homepage, film detail pages, studio information, and a question form.",
    views: [
      { label: "Homepage", image: mysticaHome, caption: "An atmospheric introduction establishes the visual identity before the film collection.", fit: "cover", position: "50% 0%" },
      { label: "Movie page", image: mysticaMovie, caption: "A dedicated film page combines the synopsis, production details, and trailer in one view.", fit: "contain" },
      { label: "About", image: mysticaAbout, caption: "The About page introduces the studio and the worlds behind its films.", fit: "contain" },
      { label: "Questions", image: mysticaQuestions, caption: "A question form gives visitors fields for their name, email, and message.", fit: "contain" },
    ],
  },
};
