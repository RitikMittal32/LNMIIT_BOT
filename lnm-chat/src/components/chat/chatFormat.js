import React from "react";

const ChatFormat = ({ message, isBot }) => {
  const formatMessage = (text) => {
    if (!text) return null;

    // Regular expression to detect URLs
    const urlRegex = /https?:\/\/[^\s]+/g;

    // Splitting text while keeping URLs intact
    let parts = text.split(/(?<!https?:)\/?[^\s]+\.[^\s]+|(?<=\w)\.(?=\s|$)/);

    return parts.map((line, index) => {
      line = line.trim();
      if (!line) return null;

      // Preserve URLs
      if (urlRegex.test(line)) {
        return (
          <span key={index}>
            <a href={line} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {line}
            </a>{" "}
          </span>
        );
      }

      // Handle Key-Value pairs (e.g., "Name: John Doe")
      if (line.includes(":")) {
        const [title, content] = line.split(":").map((t) => t.trim());
        return (
          <span key={index}>
            <strong>{title}:</strong> {content}{" "}
          </span>
        );
      }

      // Handle Tables (pipe `|` separated values)
      if (line.includes("|")) {
        const columns = line.split("|").map((col) => col.trim());
        return (
          <div key={index} className="overflow-x-auto">
            <table className="border-collapse border border-gray-300 w-full">
              <tbody>
                <tr>
                  {columns.map((col, idx) => (
                    <td key={idx} className="border px-2 py-1">{col}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }

      // Handle Code Blocks (` ``` `)
      if (line.match(/```[\s\S]+```/)) {
        return (
          <pre key={index} className="bg-gray-100 p-2 rounded-md overflow-x-auto">
            {line.replace(/```/g, "")}
          </pre>
        );
      }

      // Default text output
      return <span key={index}>{line} </span>;
    });
  };

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isBot ? "bg-white border border-gray-200" : "bg-blue-600 text-white"
        }`}
      >
        <p className="text-sm">{formatMessage(message.text)}</p>
        {message.timestamp && (
          <p className="text-xs mt-1 opacity-70">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatFormat;
