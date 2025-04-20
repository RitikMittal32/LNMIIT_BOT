'use client';

export const ChatInput = ({ input, setInput, handleSend, FAQ_QUESTIONS }) => {
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="gap-2 mb-4  overflow-x-auto hidden"> {/* md:grid-cols-2  md:grid*/}
        {FAQ_QUESTIONS.map((question, i) => (
          <div
            key={i}
            onClick={() => setInput(question)}
            className="text-sm p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 truncate"
          >
            {question}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 min-w-0 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Send
        </button>
      </div>
    </div>
  );
};