import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit:false
    });

    useEffect(() => {
        fetchFeedback()
    }, [])

    //Fetch feeedback

    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false);
    }

    const deleteFeedback = async (id) => {
        await fetch(`/feedback/${id}`, {method: 'DELETE'})
        setFeedback(feedback.filter(item => item.id !== id));
    }

    const addFeedback = async (newFeed) => {
        const response = await fetch(`/feedback`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeed)
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
      }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        });
    }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item))
    }

    return <FeedbackContext.Provider value ={{
        feedback,
        feedbackEdit,
        isLoading,
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