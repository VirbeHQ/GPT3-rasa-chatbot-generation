from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

from gpt3.utterance_generator import UtteranceGenerator

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('intent', required=True, help="intent cannot be blank!")
parser.add_argument('slot', action='append', required=True, help="slot cannot be blank!")
parser.add_argument('n', type=int, help='Number cannot be converted')

generator = UtteranceGenerator()

class IntentGenerator(Resource):
    def get(self):
        args = parser.parse_args()
        return generator.generate(args['intent'], args['slot'], args['n'])

    def post(self):
        args = parser.parse_args()
        return generator.PROMPT

##
## Actually setup the Api resource routing here
##
api.add_resource(IntentGenerator, '/intent')

if __name__ == '__main__':
    app.run(debug=True)

# Try to make this request http://127.0.0.1:5000/intent?intent=PlayMusic&slot=song_name&slot=artist_name&n=8