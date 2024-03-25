export const validBody = (dataBody, schemaData) => {
  const { error } = schemaData.validate(dataBody, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
};
