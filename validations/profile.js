export const profileSchema = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    fullName: Joi.string().required(),
    dateOfBirth: Joi.date(),
    placeOfBirth: Joi.string(),
    nationality: Joi.string(),
    education: Joi.array().items(
      Joi.object({
        institution: Joi.string().required(),
        degree: Joi.string().required(),
        fieldOfStudy: Joi.string(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
      })
    ),
    skills: Joi.array().items(Joi.string().required()),
    projects: Joi.array().items(
      Joi.object({
        projectName: Joi.string().required(),
        content: Joi.string(),
        role: Joi.string(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
      })
    ),
    workExperience: Joi.array().items(
      Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        companyName: Joi.string().required(),
        role: Joi.string(),
      })
    ),
  });
  return schema.validate(data);
};
