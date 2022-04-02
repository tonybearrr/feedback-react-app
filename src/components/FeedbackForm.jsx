import { useContext, useState, useEffect } from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"
function FeedbackForm() {
    const {addFeedback, feedbackEdit, updateFeedback, setFeedbackEdit} = useContext(FeedbackContext)
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [disableBtn, setDisableBtn] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(feedbackEdit.edit){
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating);
            setDisableBtn(false);

        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        setText(e.target.value);
        if (text.trim().length >= 9) {
            setMessage(null)
            setDisableBtn(false);
        } 
        else {
            setDisableBtn(true);
            setMessage('Min length is 10 chars')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length >= 9) {
            const newFeedback = {
                text,
                rating
            }
            if( feedbackEdit.edit) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
                setFeedbackEdit({
                    item:{},
                    edit:false
                  })
            } else {
                addFeedback(newFeedback)
            }
            setText('')
        }
        
    }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us</h2>
            <RatingSelect 
            select={setRating}
            selected={rating}/>
            <div className="input-group">
                <input onChange={handleTextChange} 
                type="text" 
                placeholder="Write a review"
                value={text}
                />
                <Button type="submit" isDisabled={disableBtn}>
                    Send
                </Button>
            </div>
            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm