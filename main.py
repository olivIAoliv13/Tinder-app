from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
 
app = Flask(__name__)
CORS(app)  # Appliquez CORS à votre application Flask
 
@app.route('/api/profiles', methods=['GET'])
def get_profiles():
    n = int(request.args.get('n', 50))  # Nombre de profils à récupérer
    response = requests.get(f'https://randomuser.me/api/?results={n}')
    data = response.json()
    
    profiles = []  # Initialisation de la liste de profils
    
    for user in data['results']:
        profile = {
            'id': user['login']['uuid'],
            'age': user['dob']['age'],
            'country': user['location']['country'],
            'photo': user['picture']['large'],
            'city': user['location']['city'],
            'name': f"{user['name']['first']} {user['name']['last']}"
        }
        profiles.append(profile)
    
    return jsonify(profiles)  # Assurez-vous de renvoyer une réponse JSON
 
if __name__ == '__main__':
    app.run(debug=True)