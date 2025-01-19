from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 


data = {
    "buildings": []
}

# Helper function to find a building by ID
def find_building(building_id):
    return next((b for b in data["buildings"] if b["id"] == building_id), None)

# Helper function to find a room by ID in a building
def find_room(building, room_id):
    return next((r for r in building["rooms"] if r["id"] == room_id), None)

# Routes

@app.route("/buildings", methods=["POST"])
def add_building():
    body = request.json
    building_id = len(data["buildings"]) + 1
    new_building = {
        "id": building_id,
        "name": body.get("name"),
        "rooms": []
    }
    data["buildings"].append(new_building)
    return jsonify(new_building), 201

@app.route("/buildings/<int:building_id>/rooms", methods=["POST"])
def add_room(building_id):
    building = find_building(building_id)
    if not building:
        return jsonify({"error": "Building not found"}), 404

    body = request.json
    room_id = len(building["rooms"]) + 1
    new_room = {
        "id": room_id,
        "name": body.get("name"),
        "lamps": []
    }
    building["rooms"].append(new_room)
    return jsonify(new_room), 201

@app.route("/buildings/<int:building_id>/rooms/<int:room_id>/lamps", methods=["POST"])
def add_lamp(building_id, room_id):
    building = find_building(building_id)
    if not building:
        return jsonify({"error": "Building not found"}), 404

    room = find_room(building, room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404

    body = request.json
    lamp_id = len(room["lamps"]) + 1
    new_lamp = {
        "id": lamp_id,
        "name": body.get("name"),
        "brightness": body.get("brightness", 0)  # Default brightness is 0
    }
    room["lamps"].append(new_lamp)
    return jsonify(new_lamp), 201

@app.route("/buildings", methods=["GET"])
def get_buildings():
    return jsonify(data["buildings"]), 200

@app.route("/buildings/<int:building_id>", methods=["GET"])
def get_building(building_id):
    building = find_building(building_id)
    if not building:
        return jsonify({"error": "Building not found"}), 404
    return jsonify(building), 200

@app.route("/buildings/<int:building_id>/rooms/<int:room_id>", methods=["GET"])
def get_room(building_id, room_id):
    building = find_building(building_id)
    if not building:
        return jsonify({"error": "Building not found"}), 404

    room = find_room(building, room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404

    return jsonify(room), 200

if __name__ == "__main__":
    app.run(debug=True)