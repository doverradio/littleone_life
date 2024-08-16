import React from 'react';
import { FaClipboard, FaFileDownload, FaTimes } from 'react-icons/fa'; // Import appropriate icons

const AiInteractionLayout = ({
    chatHistory,
    chatContainerRef,
    endOfMessagesRef,
    handleScroll,
    inputText,
    setInputText,
    handleSubmit,
    characterLimit,
    loading,
    handleExport,
    error,
    calculateChatHeight,
    onClose, // Close handler
}) => {
    return (
        <div style={{ 
            padding: '10px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            width: '300px',
            maxHeight: '90vh', // Allow chat to extend up to 90% of the viewport height
            minHeight: '200px', // Minimum height
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
        }}>
            <div 
                ref={chatContainerRef} 
                style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    paddingBottom: '10px',
                    maxHeight: 'calc(100% - 100px)', // Ensure chat history doesn't exceed the container height minus input and icon area
                }} 
                onScroll={handleScroll}
            >
                {chatHistory.map((interaction, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <div style={{ backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px', marginBottom: '5px' }}>
                            <strong>You:</strong> {interaction.content}
                        </div>
                        <div style={{ backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '5px' }}>
                            <strong>Bill:</strong> {interaction.response}
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
                <FaClipboard 
                    onClick={() => handleExport('clipboard')} 
                    style={{ fontSize: '20px', color: '#28a745', cursor: 'pointer' }} 
                    title="Export to Clipboard"
                />
                <FaFileDownload 
                    onClick={() => handleExport('file')} 
                    style={{ fontSize: '20px', color: '#17a2b8', cursor: 'pointer' }} 
                    title="Export to File"
                />
                <FaTimes 
                    onClick={onClose} 
                    style={{ fontSize: '20px', color: '#dc3545', cursor: 'pointer' }} 
                    title="Close Chat"
                />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AiInteractionLayout;
