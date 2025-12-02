# Duke & Chord Music

A musical instrument marketplace and music education platform built as a Single Page Application (SPA). Users can browse and sell instruments, preview audio samples, enroll in music classes, and manage their accounts.

## Project Overview

Duke & Chord Music is a full-stack web application that combines an instrument marketplace with a music education platform. The application provides a seamless experience for browsing instruments, listening to audio previews, and discovering music classes, all within a single-page architecture.

## Core Features

- **User Authentication**: Secure registration and login system
- **Instrument Marketplace**:
  - Browse available instruments in the store
  - View detailed instrument information with audio previews
  - Sell instruments through a dedicated form
  - Filter instruments by type (percussion, string, wind)
- **Music Classes**:
  - Browse available music classes
  - View class details including schedules and instructors
- **Employee Directory**: Learn about the Duke & Chord team
- **Audio Previews**: Listen to instrument samples before purchasing

## Architecture and Mechanisms

### Single Page Application (SPA)

The application uses a client-side routing system based on URL parameters rather than a traditional routing library. Navigation is handled through query parameters (e.g., `?view=store`, `?view=classes`), allowing for dynamic content loading without page refreshes.

### State Management

The application implements a custom state management system with dedicated managers for different data domains:

- **UserStateManager**: Handles authentication state and user information
- **InstrumentsStateManager**: Manages instrument data and filtering
- **ClassStateManager**: Maintains music class information
- **ViewStateManager**: Controls the current view and navigation state

State changes trigger custom `stateChanged` events that propagate throughout the application, causing relevant components to re-render with updated data.

### Component Architecture

Components are implemented as JavaScript modules that return HTML strings. Each component is responsible for:
- Rendering its own markup
- Handling user interactions through event listeners
- Dispatching state change events when data is modified

### API Integration

The application uses `json-server` as a mock REST API, providing full CRUD operations for:
- Users
- Instruments
- Instrument types
- Music classes

API calls are abstracted through the state managers, which handle data fetching and state updates.

## Prerequisites

- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher

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

The application requires json-server version 0.17.4 for API functionality:

```bash
npm i -g json-server@0.17.4
```

This global installation allows you to run json-server as a standalone service if needed.

## Running the Application

### Option 1: Using npm start (Recommended)

The simplest way to run the application is using the npm start script, which launches the custom server:

```bash
npm start
```

This will start the server on port 5002 (or the port specified in the PORT environment variable). The server handles both:
- Static file serving for the front-end application
- API routing through json-server

Access the application at: `http://localhost:5002`

### Option 2: Using json-server Directly

Alternatively, you can run json-server directly with the database file:

```bash
json-server --watch api/database.json --port 5002
```

Note: This method only provides API functionality. You'll need a separate static file server for the front-end.


