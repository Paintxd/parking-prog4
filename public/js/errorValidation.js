const formValidationError = (err, formErrorId) => {
  const formElement = $(`#${formErrorId}`);
  if (err.status !== 400) {
    const errorElement = formElement.children(`#${formErrorId}-error`);
    errorElement.css({ 'text-transform': 'capitalize' });
    errorElement.addClass('text-danger');
    errorElement.text(err.responseJSON.message);
    return;
  }

  err.responseJSON.message.forEach((errors) => {
    const errorElement = formElement.children(`#error-${errors.target}`);
    errorElement.css({ 'text-transform': 'capitalize' });
    errorElement.addClass('text-danger');
    errorElement.text(errors.fields.map((field) => `${field}\n`));
  });
};
