import { gql } from "@apollo/client";

export const GET_STAFF = gql`
  query getStaff($size: Int!, $page: Int!, $email: String!) {
    getStaff(size: $size, page: $page, email: $email) {
      totalCount
      currentPage
      size
      content {
        id
        name
        enabled
        email
        role
      }
    }
  }
`;
