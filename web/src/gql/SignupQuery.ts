export const signupQuery = `
  mutation signup(
    $userName: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $type: Int!
  ) {
    signup(
      userName: $userName
      firstName: $firstName
      lastName: $lastName
      password: $password
      email: $email
      type: $type
    )
  }
`;
