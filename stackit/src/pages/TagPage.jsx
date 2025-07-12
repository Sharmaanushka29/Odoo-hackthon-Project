import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, User, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '../App'

// Mock data for questions filtered by tag
const mockQuestionsByTag = {
  sql: [
    {
      id: 1,
      title: "How to join 2 columns in a data set to make a separate column in SQL",
      description: "I do not know the code for it as I am a beginner. As an example I would like to join the first name and last name to make a column for the full name.",
      author: "john_doe",
      votes: 5,
      answers: 3,
      views: 127,
      tags: ["sql", "mysql", "database"],
      createdAt: "2024-01-15T10:30:00Z",
      hasAcceptedAnswer: true
    },
    {
      id: 4,
      title: "SQL query optimization for large datasets",
      description: "My SQL queries are running very slowly on large tables. What are some best practices for optimization?",
      author: "db_admin",
      votes: 12,
      answers: 6,
      views: 345,
      tags: ["sql", "performance", "optimization"],
      createdAt: "2024-01-12T14:20:00Z",
      hasAcceptedAnswer: true
    }
  ],
  react: [
    {
      id: 2,
      title: "React useState not updating immediately",
      description: "I'm having trouble with useState not updating the state immediately when I call the setter function.",
      author: "react_dev",
      votes: 12,
      answers: 7,
      views: 234,
      tags: ["react", "javascript", "hooks"],
      createdAt: "2024-01-14T15:45:00Z",
      hasAcceptedAnswer: false
    }
  ],
  javascript: [
    {
      id: 2,
      title: "React useState not updating immediately",
      description: "I'm having trouble with useState not updating the state immediately when I call the setter function.",
      author: "react_dev",
      votes: 12,
      answers: 7,
      views: 234,
      tags: ["react", "javascript", "hooks"],
      createdAt: "2024-01-14T15:45:00Z",
      hasAcceptedAnswer: false
    },
    {
      id: 5,
      title: "Understanding JavaScript closures",
      description: "Can someone explain how closures work in JavaScript with practical examples?",
      author: "js_learner",
      votes: 8,
      answers: 4,
      views: 189,
      tags: ["javascript", "closures", "fundamentals"],
      createdAt: "2024-01-11T09:30:00Z",
      hasAcceptedAnswer: true
    }
  ]
}

const TagPage = () => {
  const { tag } = useParams()
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const tagQuestions = mockQuestionsByTag[tag] || []
    setQuestions(tagQuestions)
  }, [tag])

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {tag}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
          </div>
          <p className="text-gray-600">
            {questions.length} question{questions.length !== 1 ? 's' : ''} tagged with "{tag}"
          </p>
        </div>
        {user && (
          <Button asChild size="lg">
            <Link to="/ask">Ask Question</Link>
          </Button>
        )}
      </div>

      {/* Back to all questions */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to all questions
        </Link>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No questions found</h3>
              <p className="text-gray-500 mb-4">
                There are no questions tagged with "{tag}" yet.
              </p>
              {user && (
                <Button asChild>
                  <Link to="/ask">Ask the first question</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          questions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Vote and Stats Column */}
                  <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 min-w-[80px]">
                    <div className="flex flex-col items-center">
                      <span className="font-medium">{question.votes}</span>
                      <span className="text-xs">votes</span>
                    </div>
                    <div className={`flex flex-col items-center ${question.hasAcceptedAnswer ? 'text-green-600' : ''}`}>
                      <span className="font-medium">{question.answers}</span>
                      <span className="text-xs">answers</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-medium">{question.views}</span>
                      <span className="text-xs">views</span>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <Link 
                      to={`/question/${question.id}`}
                      className="block group"
                    >
                      <h3 className="text-lg font-semibold text-blue-600 group-hover:text-blue-800 mb-2">
                        {question.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-700 mb-3 line-clamp-2">
                      {question.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {question.tags.map((questionTag) => (
                        <Link key={questionTag} to={`/tags/${questionTag}`}>
                          <Badge 
                            variant={questionTag === tag ? "default" : "secondary"}
                            className="hover:bg-blue-100 cursor-pointer"
                          >
                            {questionTag}
                          </Badge>
                        </Link>
                      ))}
                    </div>

                    {/* Author and Time */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{question.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(question.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Related Tags */}
      {questions.length > 0 && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {/* Extract unique tags from all questions */}
              {Array.from(new Set(
                questions.flatMap(q => q.tags).filter(t => t !== tag)
              )).map((relatedTag) => (
                <Link key={relatedTag} to={`/tags/${relatedTag}`}>
                  <Badge variant="outline" className="hover:bg-blue-50 cursor-pointer">
                    {relatedTag}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TagPage

