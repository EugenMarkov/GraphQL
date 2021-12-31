import { gql } from "@apollo/client";

export const USER_UPDATE = gql`
  mutation updateUser($userId: ID!, $object: UpdatedUserInput) {
    updateUser(id: $userId, object: $object) {
      status
      message
      error
    }
  }
`;


export const USER_DELETE = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(id: $userId) {
      status
      message
      error
    }
  }
`;