const formValidationError = (err, formErrorId) => {
  if (err.status !== 400) {
    const errorElement = $(`#${formErrorId}`);
    errorElement.css({ 'text-transform': 'capitalize' });
    errorElement.addClass('text-danger');
    errorElement.text(err.responseJSON.message);
    return;
  }

  err.responseJSON.message.forEach((errors) => {
    const errorElement = $(`#error-${errors.target}`);
    errorElement.css({ 'text-transform': 'capitalize' });
    errorElement.addClass('text-danger');
    errorElement.text(errors.fields.map((field) => `${field}\n`));
  });
};
