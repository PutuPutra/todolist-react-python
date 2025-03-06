from flask import Blueprint

from controllers.todoController import index, get_todo, create_todo, update_todo, delete_todo

todo_bp = Blueprint('todo_bp', __name__)

todo_bp.route('/', methods=['GET'])(index)
todo_bp.route('/', methods=['POST'])(create_todo)
todo_bp.route('/<int:todo_id>', methods=['GET'])(get_todo)
todo_bp.route('/<int:todo_id>', methods=['PUT'])(update_todo)
todo_bp.route('/<int:todo_id>', methods=['DELETE'])(delete_todo)