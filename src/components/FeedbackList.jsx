
import FeedbackItem from "./FeedbackItem";
import { useContext } from "react";
import {motion, AnimatePresence } from 'framer-motion'
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList() {
const {feedback} = useContext(FeedbackContext);

    if (!feedback || feedback.length === 0) {
        return (<div> No feedback yet</div>)
    }

    return (
        <div className="feedback-list">
            <AnimatePresence>
            {feedback.map((feed) => (
                    <motion.div 
                    key={feed.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    >
                        <FeedbackItem 
                        feedback={feed} 
                        key={feed.id}
                        />
                    </motion.div>
                )
            )
            }
            </AnimatePresence>
        </div>
      )
}

export default FeedbackList