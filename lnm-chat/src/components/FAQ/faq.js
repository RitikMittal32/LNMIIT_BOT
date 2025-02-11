// components/FAQ.jsx
export const FAQ = () => {
          const questions = [
            "How to reset password?",
            "Where to find course materials?",
            "How to contact faculty?"
          ];
        
          return (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Frequently Asked</h3>
              {questions.map((q, i) => (
                <div key={i} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  {q}
                </div>
              ))}
            </div>
          );
        };