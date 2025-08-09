import React, { useState, useRef } from 'react';
import {Formik, Form as FormikForm, FormikProps} from 'formik';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import ValidationProgress from './ValidationProgress';
import SuccessModal from './SuccessModal';
import LoadingOverlay from './LoadingOverlay';
import {validationSchema} from './FormValidation';
import {FormData, initialValues} from './types';

const Form: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const formikRef = useRef<FormikProps<FormData>>(null);

  const handleSubmit = (values: FormData, {setSubmitting, resetForm}: any) => {
    console.log('Form data:', values);
    setTimeout(() => {
      setShowSuccessModal(true);
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);

    // Add 09.08.25 - Валідація після закриття модального вікна. 
    if (formikRef.current) {
      setTimeout(() => {
        formikRef.current?.validateForm();
      }, 100);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white mb-0">Реєстраційна форма</h3>
            </div>
            <div className="px-6 py-8">
              <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnMount={true}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {({ isSubmitting, errors, touched, isValid, values, validateForm }) => {
                  const fieldNames = ['name', 'email', 'password', 'city', 'birthDate', 'phone'];
                  const validFields = fieldNames.filter(field => {
                    const hasValue = values[field] && values[field].toString().trim() !== '';
                    const hasNoError = !errors[field];
                    return hasValue && hasNoError;
                  }).length;
                  const isFormReallyValid = isValid && validFields === fieldNames.length;

                  return (
                  <FormikForm autoComplete="off" className="space-y-6">
                    <FormField
                      name="name"
                      label="Ім'я"
                      type="text"
                      placeholder="Введіть ім'я"
                      errors={errors}
                      touched={touched}
                      values={values}
                      required
                    />

                    <FormField
                      name="email"
                      label="Електронна пошта"
                      type="email"
                      placeholder="Введіть електронну пошту"
                      errors={errors}
                      touched={touched}
                      values={values}
                      required
                    />

                    <FormField
                      name="password"
                      label="Пароль"
                      type="password"
                      placeholder="Введіть пароль"
                      helpText="Пароль повинен містити принаймні 8 символів, включаючи велику та малу літери (латинську або кирилицю) та цифру"
                      errors={errors}
                      touched={touched}
                      values={values}
                      required
                    />

                    <FormField
                      name="city"
                      label="Місто"
                      type="text"
                      placeholder="Введіть місто"
                      errors={errors}
                      touched={touched}
                      values={values}
                      required
                    />

                    <FormField
                      name="birthDate"
                      label="Дата народження"
                      type="date"
                      errors={errors}
                      touched={touched}
                      values={values}
                      required
                    />

                    <FormField
                      name="phone"
                      label="Номер телефону"
                      type="tel"
                      placeholder="+380501234567"
                      helpText="Формат: +380XXXXXXXXX або 0XXXXXXXXX"
                      errors={errors}
                      touched={touched}
                      values={values}
                      required
                    />

                    <ValidationProgress 
                      errors={errors} 
                      touched={touched} 
                      isValid={isValid} 
                      values={values}
                    />

                    <SubmitButton isSubmitting={isSubmitting} isValid={isFormReallyValid} />
                  </FormikForm>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleCloseModal}
        title="Дякую!"
        message="Ваша реєстраційна форма успішно відправлена."
      />
      <LoadingOverlay 
        isVisible={false}
        message="Відправка форми..."
      />
    </>
  );
};

export default Form;