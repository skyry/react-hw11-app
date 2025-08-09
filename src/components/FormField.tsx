import React from 'react';
import {Field} from 'formik';
import Icon from './Icon';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  helpText?: string;
  errors: any;
  touched: any;
  values: any;
  required?: boolean;
  autoComplete?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  helpText,
  errors,
  values,
  required = false,
  autoComplete = 'off',
}) => {

  const hasError = errors[name];
  const hasValue = values[name] && values[name].toString().trim() !== '';
  const isValid = hasValue && !hasError;


  const getFieldIcon = () => {
    switch (name) {
      case 'name': return 'user';
      case 'email': return 'email';
      case 'phone': return 'phone';
      case 'birthDate': return 'calendar';
      case 'city': return 'city';
      case 'password': return 'password';
      default: return null;
    }
  };

  const fieldIcon = getFieldIcon();

  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center">
          {fieldIcon && <Icon type={fieldIcon as any} size="sm" className="mr-2" />}
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      </label>
      <div className="relative">
        <Field
          type={type}
          id={name}
          name={name}
          className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
            hasError 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : isValid 
              ? 'border-green-500 focus:ring-green-500 focus:border-green-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {(hasError || isValid) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon type={hasError ? 'error' : 'check'} size="sm" />
          </div>
        )}
      </div>
      {errors[name] && (
        <div className="mt-2 text-sm text-red-600 flex items-center">
          <Icon type="error" size="sm" className="mr-1 flex-shrink-0" />
          {errors[name]}
        </div>
      )}
      {helpText && (
        <small className="mt-1 block text-xs text-gray-500">
          {helpText}
        </small>
      )}
    </div>
  );
};

export default FormField;