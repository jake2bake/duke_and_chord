# Duke & Chord Music

A musical instrument marketplace and music education platform built as a Single Page Application (SPA). Users can browse and sell instruments, preview audio samples, enroll in music classes, and manage their accounts.

## Project Overview

Duke & Chord Music is a full-stack web application that combines an instrument marketplace with a music education platform. The application provides a seamless experience for browsing instruments, listening to audio previews, and discovering music classes, all within a single-page architecture.

## Core Features

-   **User Authentication**: Secure registration and login system.
-   **Instrument Marketplace**:
    -   Browse available instruments in the store.
    -   View detailed instrument information with audio previews and images.
    -   Sell instruments through a dedicated form.
    -   Filter instruments by type (percussion, string, wind).
-   **Music Classes**:
    -   Browse available music classes.
    -   View class details including schedules and instructors.
-   **Employee Directory**: Learn about the Duke & Chord team.
-   **Audio Previews**: Listen to instrument samples before purchasing.
-   **Responsive Design**: Adapts to various screen sizes.

## Architecture and Design Patterns

The Duke & Chord application is built as a **Single Page Application (SPA)** using vanilla JavaScript, HTML, and CSS, adhering to several key architectural and design patterns for maintainability, scalability, and responsiveness.

### 1. Client-Server Architecture

The application operates on a fundamental client-server model:
*   **Frontend (Client):** Developed with HTML, CSS, and JavaScript, residing in the `src/` directory. This is responsible for rendering the user interface, handling user interactions, and managing client-side state.
*   **Backend (Server):** A Node.js server (`server.js`) acts as the intermediary. It serves the static frontend files and proxies API requests to a mock JSON API.
*   **Data Storage:** A simple JSON database (`api/database.json`) is used as the persistent data store for all application data (users, instruments, classes, etc.).

### 2. Frontend Architectural Patterns

#### A. Modular JavaScript Structure

The `src/scripts` directory is highly organized into distinct, domain-specific modules. This pattern promotes:
*   **Separation of Concerns:** Each module focuses on a specific part of the application (e.g., `auth`, `classes`, `data`, `employees`, `instruments`, `nav`).
*   **Code Reusability:** Functions and components within modules can be easily imported and reused across the application.
*   **Maintainability:** Changes in one module are less likely to impact unrelated parts of the codebase.

#### B. Component-Based UI

The user interface is constructed using a **Component-Based Architecture**, where UI elements are implemented as reusable JavaScript functions:
*   **Functional Components:** Components are JavaScript functions (e.g., `Instrument()`, `MiniClass()`, `NavBar()`, `InstrumentList()`, `ClassList()`) that accept data (often by querying a State Manager) and return HTML strings.
*   **Hierarchical Composition:** Complex UI views are built by composing smaller, focused components, creating a clear hierarchy. For example, `InstrumentList` uses the `Instrument` component for each item.
*   **Event Delegation:** Instead of attaching individual event listeners to many elements, the application leverages event delegation. A single listener is attached to a high-level container (typically `document.querySelector("#content")`). This listener then identifies the specific clicked element (`event.target`) and handles the interaction or dispatches further actions, which is efficient for dynamically rendered content.

#### C. Custom State Management System (Publish-Subscribe Pattern)

The application implements a custom, event-driven state management system, resembling a **Publish-Subscribe (Pub/Sub)** or **Mediator** pattern:
*   **StateManager Modules:** Dedicated modules (`UserStateManager.js`, `InstrumentsStateManager.js`, `ClassStateManager.js`, `ViewStateManager.js`) in `src/scripts/data/` manage specific "slices" of the application's state.
    *   Each manager holds its own private `state` object.
    *   They provide public "getter" functions (e.g., `getClasses()`, `getInstruments()`) to safely retrieve data (often returning clones to maintain immutability).
    *   They provide public "setter" functions or API interaction functions (e.g., `setInstrument()`, `fetchAllClasses()`) as the *only* means to modify their internal state.
*   **Event Dispatching:** After any significant state modification, a `StateManager` dispatches a `CustomEvent("stateChanged")` on a central DOM element (`document.querySelector("#content")`). This acts as a global broadcast that a relevant data domain has been updated.
*   **Reactive Components:** UI components (e.g., `InstrumentList`, `ClassList`) act as "subscribers." They attach event listeners to `document.querySelector("#content")` for the `"stateChanged"` event. Upon receiving this event, they re-fetch the latest data from the relevant `StateManager` and re-render themselves, ensuring the UI is always synchronized with the underlying state.

#### D. Client-Side Routing

The application uses a lightweight **Client-Side Routing** mechanism:
*   **URL Parameter-Based:** Navigation is primarily driven by URL query parameters (e.g., `?view=store`, `?view=classes`, `?view=instrument&instrumentId=1`).
*   **History API:** The `ViewStateManager.js` module utilizes the browser's `history.pushState()` API to update the URL without triggering full page reloads, providing a smooth SPA experience.
*   **PopState Event:** After changing the URL, `ViewStateManager` dispatches a `PopStateEvent` on `window`, notifying other modules (like `main.js`) that a view change has occurred.
*   **Navigation Components:** Components like `NavBar.js` interact with `ViewStateManager.js` to trigger view changes based on user clicks.

#### E. Modular Styling

CSS is organized into multiple files within `src/styles/` (e.g., `class.css`, `home.css`, `instruments.css`, `main.css`). This approach helps:
*   **Prevent CSS Conflicts:** Styles are often scoped or related to specific components/views, reducing the likelihood of unintended style overrides.
*   **Improve Readability:** It's easier to find and manage styles relevant to a particular part of the application.

### 3. Data Flow

Data flows through the Duke & Chord application in a clear, unidirectional manner:

1.  **Persistent Storage:** Data starts in the `api/database.json` file.
2.  **Backend API:** The Node.js `server.js` acts as the API, handling HTTP requests to `json-server` for CRUD operations on `database.json`.
3.  **Frontend State Managers:** When frontend components need data, they trigger functions within the relevant `StateManager` (e.g., `fetchAllClasses()` in `ClassStateManager.js`). These `StateManager` functions make `fetch` requests to the backend API (`/api/classes`, etc.).
4.  **State Update:** The `StateManager` receives the JSON response from the API, updates its internal `state` object, and then dispatches a `CustomEvent("stateChanged")` on `document.querySelector("#content")`.
5.  **UI Rendering:** Frontend UI components (e.g., `InstrumentList`, `ClassList`) listen for the `"stateChanged"` event. Upon detection, they retrieve the updated data from their respective `StateManager` (using getter functions) and re-render their portion of the DOM to reflect the new data to the user.

This flow ensures data consistency and makes it straightforward to trace how data moves through the application.

## Prerequisites

-   **Node.js**: Version 14.x or higher
-   **npm**: Version 6.x or higher

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd duke_and_chord
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install json-server Globally

The application requires `json-server` version 0.17.4 for API functionality:

```bash
npm i -g json-server@0.17.4
```

This global installation allows you to run `json-server` as a standalone service if needed.

## Running the Application

### Option 1: Using `npm start` (Recommended)

The simplest way to run the application is using the npm start script, which launches the custom server:

```bash
npm start
```

This will start the server on port 5002 (or the port specified in the `PORT` environment variable). The server handles both:
-   Static file serving for the front-end application
-   API routing through `json-server`

Access the application at: `http://localhost:5002`

### Option 2: Using `json-server` Directly

Alternatively, you can run `json-server` directly with the database file:

```bash
json-server --watch api/database.json --port 5002
```

Note: This method only provides API functionality. You'll need a separate static file server for the front-end (e.g., using `live-server` or similar) to view the application.


