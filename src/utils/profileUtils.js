export const calculateProfileCompletion = (formData) => {
  const fields = {
    photo: formData.avatar_url ? 1 : 0,
    age: formData.age ? 1 : 0,
    about: formData.about_me ? 1 : 0,
    occupation: formData.occupation ? 1 : 0,
    education: formData.education ? 1 : 0,
    location: formData.location ? 1 : 0,
    gender: formData.gender ? 1 : 0,
    height: formData.height ? 1 : 0,
    smoking: formData.smoking ? 1 : 0,
    drinking: formData.drinking ? 1 : 0,
    pets: formData.pets ? 1 : 0,
    children: formData.children ? 1 : 0,
    zodiac: formData.zodiac ? 1 : 0,
    religion: formData.religion ? 1 : 0,
    interests: formData.interests?.length > 0 ? 1 : 0,
    languages: formData.languages?.length > 0 ? 1 : 0,
    social: Object.values(formData.social_links || {}).some((link) => link)
      ? 1
      : 0,
  };

  const total = Object.keys(fields).length;
  const filled = Object.values(fields).reduce((sum, val) => sum + val, 0);
  return Math.round((filled / total) * 100);
};
