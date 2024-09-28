# Richard Reader

**Description**

This Flask application provides an interface for managing a collection of flashcards or text snippets. Users can create, view, delete, and optionally play audio versions of the cards using text-to-speech functionality.

This intended to help people with limiting disabilities effectively communicate with common phrases. 

![image](https://github.com/user-attachments/assets/b4464e10-efe6-4d9b-8573-98f97483870d)


**Features**

* Create cards with unique text content
* View all cards in a clear and organized manner
* Delete cards individually
* Text-to-speech playback for card content (optional, requires browser support)
* Error handling for invalid card creation or deletion attempts

**Installation**

1. **Prerequisites:** Ensure you have Python 3 and `pip` installed on your system.
2. **Clone the repository:** Use `git clone https://github.com/<your-username>/<project-name>.git` to clone this repository.
3. **Install dependencies:** Navigate to the project directory and run `pip install -r requirements.txt` to install required packages   
 (Flask, Flask-SQLAlchemy, Flask-CORS).

**Usage**

1. **Run the application:** Execute `python app.py` from the project's root directory. This will start the Flask development server, typically accessible at `http://localhost:5000/` by default (the port may vary).
2. **Create a card:** Enter text in the input field and click the "Add Card" button. The card will be saved to the database and displayed on the page.
3. **View cards:** All existing cards will be displayed with their text content.
4. **Delete a card:** Click the "Delete" button associated with a specific card to remove it.
5. **Play card audio (optional):** If your browser supports text-to-speech, clicking "Play Audio" will utilize the built-in functionality to read the card's text aloud.

**Frontend Code (Optional)**

If you're not including the frontend code in the repository, remove this section or add a note indicating it's not provided. Otherwise, provide instructions on how to integrate the frontend with your Flask backend.

**Database (Optional)**

This project currently uses a SQLite database named `cards.db` stored in the project directory. If you prefer a different database or storage approach, modify the `SQLALCHEMY_DATABASE_URI` configuration in `app.config` accordingly.

