import React, { useState, useEffect, useRef } from 'react';
import { interactWithAI, getChatHistory } from '../../api/ai';
import AiInteractionLayout from './aiinteraction/AiInteractionLayout';

const AiInteraction = ({ userId, onClose }) => { // Removed token prop
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const chatContainerRef = useRef(null);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [page, setPage] = useState(1);
    const endOfMessagesRef = useRef(null);

    const characterLimit = 1000; // Set a reasonable character limit

    useEffect(() => {
        fetchChatHistory(page);
    }, [page]);

    const fetchChatHistory = async (page) => {
        try {
            const history = await getChatHistory(userId, page); // Removed token argument
            if (history.length === 0) {
                setHasMoreMessages(false);
            } else {
                setChatHistory(prevHistory => [...history.reverse(), ...prevHistory]);
            }
        } catch (err) {
            console.error('Error fetching chat history:', err);
        }
    };

    const handleScroll = () => {
        if (chatContainerRef.current.scrollTop === 0 && hasMoreMessages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await interactWithAI(userId, 'guidance', inputText); // Removed token argument
            setChatHistory(prevHistory => [...prevHistory, { content: inputText, response }]);
            setInputText(''); // Clear the textarea after submission
        } catch (err) {
            setError('Failed to interact with AI');
        } finally {
            setLoading(false);
            if (endOfMessagesRef.current) {
                endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleExport = (type) => {
        const chatContent = chatHistory.map((interaction) => 
            `You: ${interaction.content}\nBill: ${interaction.response}\n\n`
        ).join('');

        if (type === 'clipboard') {
            navigator.clipboard.writeText(chatContent).then(() => {
                alert('Chat history copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy chat history to clipboard.');
                console.error(err);
            });
        } else if (type === 'file') {
            const blob = new Blob([chatContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chat_history.txt';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <AiInteractionLayout
            chatHistory={chatHistory}
            chatContainerRef={chatContainerRef}
            endOfMessagesRef={endOfMessagesRef}
            handleScroll={handleScroll}
            inputText={inputText}
            setInputText={setInputText}
            handleSubmit={handleSubmit}
            characterLimit={characterLimit}
            loading={loading}
            handleExport={handleExport}
            error={error}
            onClose={onClose} // Pass the close handler
        />
    );
};

export default AiInteraction;
