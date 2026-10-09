from flask import Blueprint, request, jsonify, session
from backend.database import db
from backend.models import Question, Answer, User, City, Category

questions_bp = Blueprint('questions', __name__, url_prefix='/api')

@questions_bp.route('/questions', methods=['GET'])
def get_questions():
    city_param = request.args.get('city', '').strip()
    category_param = request.args.get('category', '').strip()
    query_str = request.args.get('q', '').strip()

    db_query = Question.query

    if city_param and city_param.lower() not in ['all', 'all cities']:
        if city_param.isdigit():
            db_query = db_query.filter(Question.city_id == int(city_param))
        else:
            city_obj = City.query.filter(City.name.ilike(f"%{city_param}%")).first()
            if city_obj:
                db_query = db_query.filter(Question.city_id == city_obj.id)

    if category_param and category_param.lower() not in ['all', 'all categories']:
        if category_param.isdigit():
            db_query = db_query.filter(Question.category_id == int(category_param))
        else:
            cat_obj = Category.query.filter((Category.slug == category_param) | (Category.name.ilike(f"%{category_param}%"))).first()
            if cat_obj:
                db_query = db_query.filter(Question.category_id == cat_obj.id)

    if query_str:
        db_query = db_query.filter(
            db.or_(
                Question.title.ilike(f"%{query_str}%"),
                Question.content.ilike(f"%{query_str}%")
            )
        )

    questions_list = db_query.order_by(Question.created_at.desc()).all()
    return jsonify([q.to_dict() for q in questions_list])


@questions_bp.route('/questions/<int:question_id>', methods=['GET'])
def get_question(question_id):
    question = db.session.get(Question, question_id)
    if not question:
        return jsonify({'error': 'Question not found'}), 404
    return jsonify(question.to_dict())


@questions_bp.route('/questions', methods=['POST'])
def create_question():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Please log in to ask a question.'}), 401

    data = request.get_json() or {}
    title = data.get('title', '').strip()
    content = data.get('content', '').strip()
    city_id = data.get('city_id')
    category_id = data.get('category_id')

    if not title or not content:
        return jsonify({'error': 'Title and question details are required.'}), 400

    if not city_id:
        # Default to first city or user's city
        city_id = 1

    question = Question(
        city_id=int(city_id),
        category_id=int(category_id) if category_id else None,
        user_id=user_id,
        title=title,
        content=content
    )
    db.session.add(question)
    db.session.commit()

    return jsonify({
        'message': 'Your question has been posted to the local community!',
        'question': question.to_dict()
    }), 201


@questions_bp.route('/questions/<int:question_id>/answers', methods=['POST'])
def add_answer(question_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Please log in to provide an answer.'}), 401

    question = db.session.get(Question, question_id)
    if not question:
        return jsonify({'error': 'Question not found'}), 404

    data = request.get_json() or {}
    content = data.get('content', '').strip()

    if not content:
        return jsonify({'error': 'Answer content is required.'}), 400

    answer = Answer(
        question_id=question_id,
        user_id=user_id,
        content=content
    )
    db.session.add(answer)
    db.session.commit()

    return jsonify({
        'message': 'Thank you! Your answer was posted.',
        'answer': answer.to_dict(),
        'question': question.to_dict()
    }), 201


@questions_bp.route('/answers/<int:answer_id>/helpful', methods=['POST'])
def upvote_answer(answer_id):
    answer = db.session.get(Answer, answer_id)
    if not answer:
        return jsonify({'error': 'Answer not found'}), 404

    answer.helpful_count += 1
    db.session.commit()
    return jsonify({
        'message': 'Helpful vote recorded.',
        'helpful_count': answer.helpful_count
    })
