"""Flask application for the backend server."""

from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    """
    Root route for the backend server.
    """
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
