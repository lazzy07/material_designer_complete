export const loginQuery = `
  mutation login($userName: String!, $email: String!, $password: String!) {
    login(userName: $userName, email: $email, password: $password)
  }
`;
