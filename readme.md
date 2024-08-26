# Interactive Storytelling Platform

## Overview
An interactive storytelling platform where users can read or create stories with branching narratives. The platform supports multiple story paths based on user choices and provides authors with insights into how readers interact with their stories.

## Features
- **Read Stories**: Users can select and read stories with branching paths.
- **Create Stories**: Authors can write stories and create different paths.
- **User Choices**: Track which options are most popular and how long users spend on each section.

## Technologies Used
- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Django, Django REST Framework, Cross-Origin Resource Sharing (CORS)
- **Database**: SQLite (or your preferred database)

## Installation

### Prerequisites
- Python 3.x
- Node.js
- npm or yarn

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/mohammad-jowel/story_teller.git
    cd story_teller/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install backend dependencies:
    ```bash
    pip install djangorestframework
    python -m pip install django-cors-headers
    ```

4. Apply migrations:
    ```bash
    python manage.py migrate
    ```

5. Start the Django development server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install  # or `yarn install`
    ```

3. Start the React development server:
    ```bash
    npm start  # or `yarn start`
    ```

## Usage
1. Open your browser and go to `http://localhost:3000` to access the platform.
2. On the homepage, you can see a list of stories and a button to write a new story.
3. Click on a story to read it and make choices to navigate through different paths.
4. Click on the "Write" button to create a new story and define branching paths.
