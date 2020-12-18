export const loginQuery = `
  mutation login($userName: String!, $email: String!, $password: String!, , $secureKey: String!, $secureUser: String!) {
    login(userName: $userName, email: $email, password: $password, secureKey: $secureKey, secureUser: $secureUser)
  }
`;
