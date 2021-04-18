from flask import Flask
from flask_cors import CORS
from flask_restful import reqparse, abort, Api, Resource, fields, marshal_with

from gpt3.utterance_generator import UtteranceGenerator

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('intent', required=True, help="intent cannot be blank!")
parser.add_argument('slot', action='append', help="slot cannot be blank!", default=[])
parser.add_argument('n', type=int, help='Number cannot be converted')
parser.add_argument('example')

generator = UtteranceGenerator()

intent_resource_fields = {
    'intent': fields.String,
    'slots': fields.List(fields.String),
    'utterances': fields.List(fields.String),
}

class IntentGenerator(Resource):
    @marshal_with(intent_resource_fields)
    def get(self):
        args = parser.parse_args()
        # utternaces = [
        #     "Tell me what the meaning of universe is",
        #     "Explain the meaning of universe",
        #     "Define universe",
        #     "What is the meaning of the universe",
        #     "What does universe mean"
        # ]
        slots = args.get('slot')
        print(slots)
        utternaces = generator.generate(args['intent'], slots, args['n'], args['example'])
        return {
            "intent": args['intent'],
            "slots": slots,
            "utterances": utternaces
        }


##
## Actually setup the Api resource routing here
##
api.add_resource(IntentGenerator, '/intent')

if __name__ == '__main__':
    app.run(debug=True)

# Try to make this request http://127.0.0.1:5000/intent?intent=PlayMusic&slot=song_name&slot=artist_name&n=8
