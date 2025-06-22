import { useState } from 'react';
import { type ReactNode } from 'react';
import { type Message } from '../../model';

interface MessagerProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
    placeholder?: string;
    maxLength?: number;
    className?: string;
    header?: ReactNode;
    disabled?: boolean;
}

export const Messager = ({
    messages,
    onSendMessage,
    isLoading = false,
    placeholder = 'Введите сообщение...',
    maxLength = 1000,
    className = '',
    header,
    disabled = false
}: MessagerProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (inputValue.trim() && !isLoading && !disabled) {
            onSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getMessageClasses = (sender: string) => {
        return `messager__message messager__message--${sender}`;
    };

    return (
        <div className={`messager ${className}`}>
            {header && (
                <div className="messager__header">
                    {header}
                </div>
            )}

            <div className="messager__messages" role="log" aria-live="polite">
                {messages.length === 0 ? (
                    <div className="messager__empty">
                        <p>Нет сообщений</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div key={message.id} className={getMessageClasses(message.sender)}>
                            <div className="messager__message-content">
                                {message.avatar && (
                                    <img
                                        src={message.avatar}
                                        alt={`${message.sender} avatar`}
                                        className="messager__avatar"
                                    />
                                )}
                                <div className="messager__bubble">
                                    <div className="messager__text">
                                        {message.text}
                                    </div>
                                    <div className="messager__timestamp">
                                        {formatTime(message.timestamp)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {isLoading && (
                    <div className="messager__message messager__message--assistant">
                        <div className="messager__message-content">
                            <div className="messager__bubble">
                                <div className="messager__loading">
                                    <span>•</span>
                                    <span>•</span>
                                    <span>•</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form className="messager__input-form" onSubmit={handleSubmit}>
                <div className="messager__input-container">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        disabled={disabled || isLoading}
                        className="messager__input"
                        rows={1}
                        aria-label="Поле ввода сообщения"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isLoading || disabled}
                        className="messager__send-button"
                        aria-label="Отправить сообщение"
                        tabIndex={0}
                    >
                        {isLoading ? '⏳' : '➤'}
                    </button>
                </div>
                <div className="messager__input-info">
                    <span className="messager__char-count">
                        {inputValue.length}/{maxLength}
                    </span>
                </div>
            </form>
        </div>
    );
}; 
