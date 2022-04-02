import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit:false
    });
    const [feedback, setFeedback] = useState([
        {
            id: '1',
            text: 'This item from context 1',
            rating: 10
        },
        {
            id: '2',
            text: 'This item from context 2',
            rating: 7
        },
        {
            id: '3',
            text: 'This item from context 3',
            rating: 2
        }
    ])

    const deleteFeedback = (id) => {
        setFeedback(feedback.filter(item => item.id !== id));
    }

    const addFeedback = (newFeed) => {
        newFeed.id = uuidv4();
        setFeedback([newFeed, ...feedback])
      }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        });
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
    }

    return <FeedbackContext.Provider value ={{
        feedback,
        feedbackEdit,
        setFeedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext