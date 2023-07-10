export const getUserInitiatives = (firstname: string, lastName: string = "", middlename: string = "") => {
  if (!lastName && !middlename) {
    return firstname;
  }

  if (!middlename) {
    return `${firstname} ${lastName[0]}.`;
  }

  if (!lastName) {
    return `${firstname} ${middlename}`;
  }

  return `${firstname} ${middlename} ${lastName[0]}.`;
};
