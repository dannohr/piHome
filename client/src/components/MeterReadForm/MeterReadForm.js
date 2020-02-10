import React from "react";

import "./MeterReaderForm.css";

import { useForm, useField } from "react-form";

async function sendToFakeServer(values) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return values;
}

function validateConsumpion(value) {
  if (!value) {
    return "A number is required";
  }
  return false;
}

async function validateDate(name, instance) {
  if (!name) {
    return "A date is required";
  }

  return instance.debounce(async () => {
    console.log("checking name");
    await new Promise(resolve => setTimeout(resolve, 1000));
    // All names are valid, so return a false error
    return false;
  }, 500);
}

function ReadDateField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField("readDate", {
    validate: validateDate
  });

  return (
    <>
      <input {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function ConsumptionField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField("consumption", {
    validate: validateConsumpion
  });

  return (
    <>
      <input {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function MeterReaderForm() {
  // Use the useForm hook to create a form instance
  const {
    Form,
    meta: { isSubmitting, canSubmit }
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      await sendToFakeServer(values);
      console.log("Huzzah!");
    },
    debugForm: true
  });

  return (
    <Form>
      <div>
        <label>
          Meter Read Date: <ReadDateField />
        </label>
      </div>
      <div>
        <label>
          Consumption: <ConsumptionField />
        </label>
      </div>

      <div>
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
  );
}

export default MeterReaderForm;
