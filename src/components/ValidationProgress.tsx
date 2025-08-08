import React from 'react';

interface ValidationProgressProps {
  errors: any;
  touched: any;
  isValid: boolean;
  values: any;
}

const ValidationProgress: React.FC<ValidationProgressProps> = ({errors, touched, isValid, values}) => {
  const fieldNames = ['name', 'email', 'password', 'city', 'birthDate', 'phone'];
  
  const validFields = fieldNames.filter(field => {
    const hasValue = values[field] && values[field].toString().trim() !== '';
    const hasNoError = !errors[field];
    return hasValue && hasNoError;
  }).length;
  
  const totalFields = fieldNames.length;
  const progressPercentage = (validFields / totalFields) * 100;

  const isFormReallyValid = isValid && validFields === totalFields;

  if (isFormReallyValid) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6" role="alert">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Усі поля заповнені вірно! Ви можете відправити форму.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Прогрес заповнення форми:</span>
        <span className="text-sm text-gray-600">{validFields}/{totalFields} полів</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full progress-transition ${
            progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{width: `${progressPercentage}%`}}
        ></div>
      </div>
      {progressPercentage < 100 && (
        <p className="text-xs text-gray-500 mt-2">
          Заповніть усі поля, щоб активувати відправку
        </p>
      )}
    </div>
  );
};

export default ValidationProgress;
