import { useState } from "react"
import { BASE_URL } from "../api"

//So we're not using SQL, but we should still be validating the content of messages to prevent, for example, attackers from sending JSON objects instead of strings.
export const PostMessage = ({ newMessage, fetchPosts, user, onUnauthorized }) => {
  const [newPost, setNewPost] = useState("")
  //This is the first place that we validate that the message (input) is actually a string, so that users cannot post JSON objects or similar that could cause problems.
  //Here, we ought to validate that newpost is actually a string, and not an object or anything that might cause issues, for example like this:
  //typeof newPost === "string" || console.warn("New post is not a string:", newPost)
  const [errorMessage, setErrorMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    // TODO: validate the message before sending it.
    // The backend should not trust raw user input, but the client can still catch
    // obvious problems like an empty string or a non-string value before making the request.
    try {
      const res = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.response?.accessToken}`,
        },
        body: JSON.stringify({ message: newPost }),
      })

      console.log("Token being sent:", user?.response?.accessToken)

      if (res.status === 401) {
        onUnauthorized()
        setSubmitting(false)
        return
      }

      const data = await res.json()

      if (data.message && !data._id) {
        console.log(data)
        setErrorMessage(data.message)
        setSubmitting(false)
        return
      }

      newMessage(data)
      setNewPost("")
      setErrorMessage("")
      setSubmitting(false)
      await fetchPosts()
    } catch (error) {
      console.error(error)
      setSubmitting(false)
    }
  }

  if (!user) {
    return <p id="login-prompt">Log in to write a message</p>
  }

  return (
    <div id="post-form-wrapper" className="post-wrapper">
      <p>What's making you happy right now?</p>
      <form id="post-form" onSubmit={handleFormSubmit}>
        <textarea
          id="post-textarea"
          rows="3"
          placeholder="Write your message here..."
          value={newPost}
          onChange={(e) => {
            setNewPost(e.target.value)
            setErrorMessage("")
          }}
        />
        <p className="error" id="post-error">{errorMessage}</p>
        <button
          type="submit"
          id="submit-post-btn"
          aria-label="button for submitting your post"
          disabled={submitting}
        >
          <span className="emoji">&#x2665;</span>
          Send message
          <span className="emoji">&#x2665;</span>
        </button>
      </form>
    </div>
  )
}
