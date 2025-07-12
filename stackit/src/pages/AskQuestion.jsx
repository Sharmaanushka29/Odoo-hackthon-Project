import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Image, AlignLeft, AlignCenter, AlignRight, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { useAuth } from '../App'

const AskQuestion = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState({})

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-4">You need to be logged in to ask a question.</p>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const newTag = tagInput.trim().toLowerCase()
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag])
        setTagInput('')
      }
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters'
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required'
    } else if (description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
    }
    
    if (tags.length === 0) {
      newErrors.tags = 'At least one tag is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Here you would typically send the data to your backend
    const questionData = {
      title: title.trim(),
      description: description.trim(),
      tags,
      author: user.username,
      authorId: user.id,
      createdAt: new Date().toISOString()
    }

    console.log('Submitting question:', questionData)
    
    // Simulate successful submission
    navigate('/')
  }

  const insertFormatting = (format) => {
    // This is a simplified version - in a real app you'd want a proper rich text editor
    const textarea = document.querySelector('textarea[name="description"]')
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = description.substring(start, end)
    
    let formattedText = ''
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`
        break
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`
        break
      case 'strikethrough':
        formattedText = `~~${selectedText || 'strikethrough text'}~~`
        break
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`
        break
      case 'unordered-list':
        formattedText = `\n- ${selectedText || 'list item'}\n`
        break
      case 'ordered-list':
        formattedText = `\n1. ${selectedText || 'list item'}\n`
        break
      default:
        formattedText = selectedText
    }
    
    const newDescription = description.substring(0, start) + formattedText + description.substring(end)
    setDescription(newDescription)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Ask a Question</h1>
        <p className="text-gray-600 mt-2">
          Get help from the community by asking a clear, detailed question.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="e.g., How to join 2 columns in a data set to make a separate column in SQL"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Be specific and imagine you're asking a question to another person.
            </p>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Rich Text Editor Toolbar */}
            <div className="border rounded-t-md p-2 bg-gray-50 flex flex-wrap gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('bold')}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('italic')}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('strikethrough')}
              >
                <Strikethrough className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('unordered-list')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('ordered-list')}
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('link')}
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
              >
                <Image className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
              >
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
              >
                <AlignRight className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            
            <Textarea
              name="description"
              placeholder="Provide details about your problem. Include what you've tried and what you expected to happen."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`rounded-t-none min-h-[200px] ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Include all the information someone would need to answer your question.
            </p>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
              
              <Input
                type="text"
                placeholder="Add tags (press Enter or comma to add)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className={errors.tags ? 'border-red-500' : ''}
              />
              
              {errors.tags && (
                <p className="text-red-500 text-sm">{errors.tags}</p>
              )}
              
              <p className="text-gray-500 text-sm">
                Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
              </p>
              
              {/* Popular tags suggestions */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Popular tags:</span>
                {['javascript', 'react', 'python', 'sql', 'nodejs', 'css'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => {
                      if (!tags.includes(tag) && tags.length < 5) {
                        setTags([...tags, tag])
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button type="submit">
            Post Your Question
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AskQuestion

