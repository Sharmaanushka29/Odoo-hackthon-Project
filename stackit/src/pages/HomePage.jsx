import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronUp, ChevronDown, MessageSquare, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '../App'

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    title: "How to join 2 columns in a data set to make a separate column in SQL",
    description: "I do not know the code for it as I am a beginner. As an example I would like to join the first name and last name to make a column for the full name.",
    author: "john_doe",
    authorId: 1,
    votes: 5,
    answers: 3,
    views: 127,
    tags: ["sql", "mysql", "database"],
    createdAt: "2024-01-15T10:30:00Z",
    hasAcceptedAnswer: true
  },
  {
    id: 2,
    title: "React useState not updating immediately",
    description: "I'm having trouble with useState not updating the state immediately when I call the setter function. The component doesn't re-render with the new value.",
    author: "react_dev",
    authorId: 2,
    votes: 12,
    answers: 7,
    views: 234,
    tags: ["react", "javascript", "hooks"],
    createdAt: "2024-01-14T15:45:00Z",
    hasAcceptedAnswer: false
  },
  {
    id: 3,
    title: "Best practices for API error handling in Node.js",
    description: "What are the recommended patterns for handling errors in a Node.js REST API? Should I use try-catch blocks everywhere or is there a better approach?",
    author: "backend_ninja",
    authorId: 3,
    votes: 8,
    answers: 4,
    views: 189,
    tags: ["nodejs", "api", "error-handling"],
    createdAt: "2024-01-13T09:20:00Z",
    hasAcceptedAnswer: true
  }
]

const HomePage = () => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState(mockQuestions)
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')

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

  const sortQuestions = (questions, sortType) => {
    const sorted = [...questions]
    switch (sortType) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'votes':
        return sorted.sort((a, b) => b.votes - a.votes)
      case 'answers':
        return sorted.sort((a, b) => b.answers - a.answers)
      case 'views':
        return sorted.sort((a, b) => b.views - a.views)
      default:
        return sorted
    }
  }

  const filterQuestions = (questions, filterType) => {
    switch (filterType) {
      case 'unanswered':
        return questions.filter(q => q.answers === 0)
      case 'answered':
        return questions.filter(q => q.answers > 0)
      case 'accepted':
        return questions.filter(q => q.hasAcceptedAnswer)
      default:
        return questions
    }
  }

  const filteredAndSortedQuestions = sortQuestions(
    filterQuestions(mockQuestions, filterBy),
    sortBy
  )

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
          <p className="text-gray-600 mt-1">{filteredAndSortedQuestions.length} questions</p>
        </div>
        {user && (
          <Button asChild size="lg">
            <Link to="/ask">Ask Question</Link>
          </Button>
        )}
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="votes">Most Votes</SelectItem>
              <SelectItem value="answers">Most Answers</SelectItem>
              <SelectItem value="views">Most Views</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredAndSortedQuestions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No questions found matching your criteria.</p>
              {user && (
                <Button asChild className="mt-4">
                  <Link to="/ask">Ask the first question</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedQuestions.map((question) => (
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
                      {question.tags.map((tag) => (
                        <Link key={tag} to={`/tags/${tag}`}>
                          <Badge variant="secondary" className="hover:bg-blue-100 cursor-pointer">
                            {tag}
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

      {/* Pagination would go here */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

