export const formValidationError = (err, formErrorId) => {
  if (err.status !== 400) {
    $(`#${formErrorId}`).text(err.responseText);
    return;
  }

  err.responseJSON.message.forEach((errors) => {
    const errorElement = $(`#error-${errors.target}`);
    errorElement.css({ 'text-transform': 'capitalize' });
    errorElement.addClass('text-danger');
    errorElement.text(errors.fields.map((field) => `${field}\n`));
  });
};
