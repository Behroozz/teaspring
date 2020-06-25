import gql from "graphql-tag";

const GET_QUESTIONS_QUERY = gql`
  {
    questions {
      scenario_id
      questions {
        layers {
          color
          volume
        }
      }
    }
  }
`;

export default GET_QUESTIONS_QUERY
