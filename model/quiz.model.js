const mongoose = require('mongoose');

// Define the schema for quiz questions
const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  answerOptions: {
    type: [String],
    required: true
  },
  correctOptions: {
    type: [Number],
    required: true
  }
});

// Define the schema for the quiz
const quiz = mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  }
});

// Define the schema for the leaderboard entry
const leaderboardSchema =  mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

// Define the main schema combining quiz and leaderboard
const quizSchema = mongoose.Schema({
  quiz: quiz,
  leaderboard: {
    type: [leaderboardSchema],
    required: true
  }
});

// Create a model from the schema
const QuizModel = mongoose.model('QuizData', quizSchema);

module.exports = {
    QuizModel
};
