import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronUp, ChevronDown, Check, MessageSquare, Clock, User, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '../App'

// Mock data for a single question with answers
const mockQuestionData = {
  1: {
    id: 1,
    title: "How to join 2 columns in a data set to make a separate column in SQL",
    description: `I do not know the code for it as I am a beginner. As an example I would like to join the first name and last name to make a column for the full name.

I have a table like this:
\`\`\`
| first_name | last_name |
|------------|-----------|
| John       | Doe       |
| Jane       | Smith     |
\`\`\`

And I want to create a full_name column that combines both.`,
    author: "john_doe",
    authorId: 1,
    votes: 5,
    views: 127,
    tags: ["sql", "mysql", "database"],
    createdAt: "2024-01-15T10:30:00Z",
    answers: [
      {
        id: 1,
        content: `You can use the CONCAT function in SQL to join two columns together. Here's how you can do it:

\`\`\`sql
SELECT first_name, last_name, 
       CONCAT(first_name, ' ', last_name) AS full_name
FROM your_table_name;
\`\`\`

This will create a new column called \`full_name\` that combines the first_name and last_name with a space in between.

If you want to permanently add this column to your table, you can use:

\`\`\`sql
ALTER TABLE your_table_name 
ADD COLUMN full_name VARCHAR(255);

UPDATE your_table_name 
SET full_name = CONCAT(first_name, ' ', last_name);
\`\`\``,
        author: "sql_expert",
        authorId: 2,
        votes: 8,
        createdAt: "2024-01-15T11:15:00Z",
        isAccepted: true
      },
      {
        id: 2,
        content: `Another approach is to use the || operator (in some SQL databases like PostgreSQL):

\`\`\`sql
SELECT first_name, last_name, 
       first_name || ' ' || last_name AS full_name
FROM your_table_name;
\`\`\`

Note that the CONCAT function is more widely supported across different SQL databases.`,
        author: "db_guru",
        authorId: 3,
        votes: 3,
        createdAt: "2024-01-15T12:30:00Z",
        isAccepted: false
      }
    ]
  }
}

const QuestionDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [question, setQuestion] = useState(null)
  const [newAnswer, setNewAnswer] = useState('')
  const [userVotes, setUserVotes] = useState({}) // Track user's votes

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const questionData = mockQuestionData[parseInt(id)]
    setQuestion(questionData)
  }, [id])

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

  const handleVote = (type, targetType, targetId) => {
    if (!user) return
    
    // In a real app, you'd send this to your backend
    console.log(`${type} vote on ${targetType} ${targetId}`)
    
    // Update local vote state
    const voteKey = `${targetType}-${targetId}`
    setUserVotes(prev => ({
      ...prev,
      [voteKey]: type
    }))
  }

  const handleAcceptAnswer = (answerId) => {
    if (!user || user.id !== question.authorId) return
    
    // In a real app, you'd send this to your backend
    console.log(`Accepting answer ${answerId}`)
    
    // Update local state
    setQuestion(prev => ({
      ...prev,
      answers: prev.answers.map(answer => ({
        ...answer,
        isAccepted: answer.id === answerId
      }))
    }))
  }

  const handleSubmitAnswer = (e) => {
    e.preventDefault()
    if (!user || !newAnswer.trim()) return
    
    const answer = {
      id: Date.now(),
      content: newAnswer.trim(),
      author: user.username,
      authorId: user.id,
      votes: 0,
      createdAt: new Date().toISOString(),
      isAccepted: false
    }
    
    setQuestion(prev => ({
      ...prev,
      answers: [...prev.answers, answer]
    }))
    
    setNewAnswer('')
  }

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Question not found.</p>
            <Button asChild className="mt-4">
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start gap-4">
            {/* Vote Column */}
            <div className="flex flex-col items-center space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up', 'question', question.id)}
                className={userVotes[`question-${question.id}`] === 'up' ? 'text-blue-600' : ''}
              >
                <ChevronUp className="w-6 h-6" />
              </Button>
              <span className="text-lg font-semibold">{question.votes}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down', 'question', question.id)}
                className={userVotes[`question-${question.id}`] === 'down' ? 'text-red-600' : ''}
              >
                <ChevronDown className="w-6 h-6" />
              </Button>
            </div>

            {/* Question Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {question.title}
              </h1>
              
              <div className="prose max-w-none mb-4">
                <div className="whitespace-pre-wrap text-gray-700">
                  {question.description}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <Link key={tag} to={`/tags/${tag}`}>
                    <Badge variant="secondary" className="hover:bg-blue-100 cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              {/* Question Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{question.views} views</span>
                  <Button variant="ghost" size="sm">
                    <Flag className="w-4 h-4 mr-1" />
                    Flag
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{question.author}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeAgo(question.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Answers */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
        </h2>

        <div className="space-y-4">
          {question.answers
            .sort((a, b) => {
              // Sort accepted answer first, then by votes
              if (a.isAccepted && !b.isAccepted) return -1
              if (!a.isAccepted && b.isAccepted) return 1
              return b.votes - a.votes
            })
            .map((answer) => (
              <Card key={answer.id} className={answer.isAccepted ? 'border-green-200 bg-green-50' : ''}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Vote Column */}
                    <div className="flex flex-col items-center space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote('up', 'answer', answer.id)}
                        className={userVotes[`answer-${answer.id}`] === 'up' ? 'text-blue-600' : ''}
                      >
                        <ChevronUp className="w-5 h-5" />
                      </Button>
                      <span className="font-semibold">{answer.votes}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote('down', 'answer', answer.id)}
                        className={userVotes[`answer-${answer.id}`] === 'down' ? 'text-red-600' : ''}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </Button>
                      
                      {/* Accept Answer Button */}
                      {user && user.id === question.authorId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAcceptAnswer(answer.id)}
                          className={answer.isAccepted ? 'text-green-600' : 'text-gray-400'}
                        >
                          <Check className="w-5 h-5" />
                        </Button>
                      )}
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1">
                      {answer.isAccepted && (
                        <div className="flex items-center space-x-2 mb-3">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Accepted Answer</span>
                        </div>
                      )}
                      
                      <div className="prose max-w-none mb-4">
                        <div className="whitespace-pre-wrap text-gray-700">
                          {answer.content}
                        </div>
                      </div>

                      {/* Answer Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <Button variant="ghost" size="sm">
                          <Flag className="w-4 h-4 mr-1" />
                          Flag
                        </Button>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{answer.author}</span>
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          <span>{formatTimeAgo(answer.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Submit Answer */}
      {user ? (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Your Answer</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <Textarea
                placeholder="Write your answer here..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="min-h-[150px]"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!newAnswer.trim()}>
                  Post Your Answer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">You need to be logged in to post an answer.</p>
            <Button asChild>
              <Link to="/login">Login to Answer</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default QuestionDetail

