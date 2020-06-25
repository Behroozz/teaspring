import gql from "graphql-tag";

const GET_INVENTORY_QUERY = gql`
    {
      inventory {
        inks {
            id
            color
            cost
        }
      }
    }
`;

export default GET_INVENTORY_QUERY
