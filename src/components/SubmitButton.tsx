import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  isValid: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({isSubmitting, isValid}) => {
  return (
    <div className="pt-4">
      <button
        type="submit"
        className={`w-full px-6 py-3 text-white font-medium rounded-md transition-all duration-200 ${
          isSubmitting || !isValid
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        }`}
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Обробка даних...
          </div>
        ) : !isValid ? (
          'Заповніть усі поля'
        ) : (
          'Відправити'
        )}
      </button>
    </div>
  );
};

export default SubmitButton;
