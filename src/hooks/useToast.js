import { useEffect, useState } from "react"
import { onMessage } from "../service/mockServer";

export const useToast = () => {
    
    const [currentToast, setCurrentToast] = useState({});
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        getCurrentToast()
    },[showToast])

    function getCurrentToast() {
        onMessage((message) => {
           setCurrentToast(message.data)
        })
    }

    return { currentToast, setShowToast, showToast }

};