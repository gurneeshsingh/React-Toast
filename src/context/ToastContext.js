import { createContext, useEffect, useState } from "react";
import { fetchLikedFormSubmissions, onMessage, saveLikedFormSubmission } from "../service/mockServer";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

    // Global state variables
    const [currentToast, setCurrentToast] = useState({});
    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAlert] = useState({severity:"",message:"", visible:false});
    const [isSavingCurrentToast, setIsSavingCurrentToast] = useState(false);
    const [likedToasts, setLikedToasts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    // This checks if there are submitted forms in the localstorage and sets the likedToasts to those, if not, calls fetchLikedFormSubmissions function and then sets the state with the response returned from that function, The effect runs on initial mount and when isSavingCurrentToast changes
    useEffect(() => {
        const storedData = localStorage.getItem('formSubmissions');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setLikedToasts(parsedData);
        } else {
            const fetchLikedForms = async () => {
                setIsLoading(true)
                try {
                    const response = await fetchLikedFormSubmissions();
                    const formSubmissions = response.formSubmissions;
                        setLikedToasts(formSubmissions);
                        setIsLoading(false)
                } catch (error) {
                    setIsLoading(false)
                    // Handle the error if needed
                    setShowAlert((previousAlert) => {
                        return {
                            ...previousAlert,
                            visible: true,
                            severity: "error",
                            message: error.message
                        }
                    })
                }
            };
            fetchLikedForms();
           
        }
      }, [isSavingCurrentToast]);

    // The effect runs getCurrentToast function on initial load and when showToast variable changes
    useEffect(() => {
        getCurrentToast()
    }, [showToast])

    function getCurrentToast() {
        onMessage((message) => {
            setCurrentToast(message.data)
        })
    }
    
    // This function updates global state variables 
    function closeToast() {
        setShowToast(false);
        setCurrentToast({});
        setIsSavingCurrentToast(false);
    };

    function dismissAlert() {
        setShowAlert({severity:"",message:"", visible:false});
    }

    // This function calls saveLikedFormSubmission and updates state variables, also handles state to show Custom Alert component
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

    const value = { currentToast, showToast, setShowToast, saveCurrentToast, closeToast,isSavingCurrentToast, showAlert, dismissAlert, likedToasts, isLoading }

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    )
}