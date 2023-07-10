import { createContext, useEffect, useState } from "react";
import { onMessage, saveLikedFormSubmission } from "../service/mockServer";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

    const [currentToast, setCurrentToast] = useState({});
    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAlert] = useState({severity:"",message:"", visible:false});
    const [isSavingCurrentToast, setIsSavingCurrentToast] = useState(false);

    useEffect(() => {
        getCurrentToast()
    }, [showToast])

    function getCurrentToast() {
        onMessage((message) => {
            setCurrentToast(message.data)
        })
    }

    function closeToast() {
        setShowToast(false);
        setCurrentToast({});
        setIsSavingCurrentToast(false);
    };

    function dismissAlert() {
        setShowAlert({severity:"",message:"", visible:false});
    }

    async function saveCurrentToast() {
        try {
            setIsSavingCurrentToast(true);
            await saveLikedFormSubmission({ ...currentToast, liked: true })
            closeToast()
        } catch (error) {
            closeToast()
            setShowAlert((previousAlert) => {
                return {
                    ...previousAlert,
                    visible: true,
                    severity: "error",
                    message:error.message
                }
            })
        }
    }

    const value = { currentToast, showToast, setShowToast, saveCurrentToast, closeToast,isSavingCurrentToast, showAlert, dismissAlert }

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    )
}