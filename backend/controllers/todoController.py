import sys
from flask import jsonify, request
from models.todo import Todo, db

def index():
    todos = Todo.query.all()
    return jsonify([todo.serialize for todo in todos])

def get_todo(todo_id):
    todo = Todo.query.get(todo_id)
    if not todo:
        return jsonify({'message': 'Todo tidak ditemukan'}), 404
    return jsonify(todo.serialize)

def create_todo():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({'message': 'Title wajib diisi'}), 400
    new_todo = Todo(
        title=data['title'],
        description=data.get('description', ''),
        is_done=data.get('is_done', False)
    )
    db.session.add(new_todo)
    db.session.commit()
    return jsonify(new_todo.serialize), 201

def update_todo(todo_id):
    todo = Todo.query.get(todo_id)
    if not todo:
        return jsonify({'message': 'Todo tidak ditemukan'}), 404
    data = request.get_json()
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    todo.is_done = data.get('is_done', todo.is_done)
    db.session.commit()
    return jsonify(todo.serialize)


def delete_todo(todo_id):
    todo = Todo.query.get(todo_id)
    if not todo:
        return jsonify({'message': 'Todo tidak ditemukan'}), 404
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'message': 'Todo berhasil dihapus'})
