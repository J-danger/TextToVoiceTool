from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set up SQLite database (or change to your preferred database)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cards.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model for Cards
class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), unique=True, nullable=False)

# Initialize the database
with app.app_context():
    db.create_all()

# Route to return index.html
@app.route('/', methods=['GET'])
def index():
    try:
        cards = Card.query.all()  # Fetch all cards from the database
        card_list = [{'id': card.id, 'text': card.text} for card in cards]  # Adjust according to your Card model attributes
        return render_template('index.html', cards=card_list)
    except Exception as e:
        return render_template('index.html', cards=[], error=str(e))  # Pass empty list if there's an error


# Route to handle the card submission
# Route to handle the card submission
@app.route('/add_card', methods=['POST'])
def add_card():
    data = request.get_json()
    card_text = data.get('text')

    # Check if the card already exists
    card = Card.query.filter_by(text=card_text).first()

    if card:
        return jsonify({'message': 'Card already exists'}), 400

    # Create a new card if it doesn't exist
    new_card = Card(text=card_text)
    db.session.add(new_card)
    db.session.commit()

    # Retrieve the unique ID assigned to the new card
    card_id = new_card.id
    print(card_id)  # This will print the assigned ID

    return jsonify({'message': 'Card created successfully', 'card': card_text, 'id': card_id}), 201


@app.route('/delete_card/<int:card_id>', methods=['DELETE'])
def delete_card(card_id):
    card = Card.query.get(card_id)
    if card:
        db.session.delete(card)
        db.session.commit()
        return jsonify({'message': 'Card deleted successfully'}), 200
    else:
        return jsonify({'error': 'Card not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
