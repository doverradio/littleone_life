import React, { useState, useEffect, useRef } from 'react';
import { interactWithAI, getChatHistory } from '../../api/ai';

const AiInteraction = ({ userId, token }) => {
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
            const history = await getChatHistory(userId, page, token);
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
            const response = await interactWithAI(userId, 'guidance', inputText, token);
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
            `You: ${interaction.content}\nAI: ${interaction.response}\n\n`
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

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    return (
        <div style={{ padding: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div 
                ref={chatContainerRef} 
                style={{ flex: 1, overflowY: 'auto', paddingBottom: '10px' }} 
                onScroll={handleScroll}
            >
                {chatHistory.map((interaction, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <div style={{ backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px', marginBottom: '5px' }}>
                            <strong>You:</strong> {interaction.content}
                        </div>
                        <div style={{ backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '5px' }}>
                            <strong>AI:</strong> {interaction.response}
                        </div>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                <textarea
                    value={inputText}
                    onChange={(e) => {
                        if (e.target.value.length <= characterLimit) {
                            setInputText(e.target.value);
                        }
                    }}
                    placeholder="Ask something..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                        minHeight: '50px',
                        maxHeight: '150px',
                        resize: 'vertical',
                    }}
                    required
                />
                <p style={{ textAlign: 'right', fontSize: '12px', color: inputText.length >= characterLimit ? 'red' : 'black' }}>
                    {inputText.length}/{characterLimit}
                </p>
                <button type="submit" disabled={loading} style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
                    {loading ? 'Thinking...' : 'Ask Bill'}
                </button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button onClick={() => handleExport('clipboard')} style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>
                    Export to Clipboard
                </button>
                <button onClick={() => handleExport('file')} style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', backgroundColor: '#17a2b8', color: 'white', cursor: 'pointer' }}>
                    Export to File
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AiInteraction;
