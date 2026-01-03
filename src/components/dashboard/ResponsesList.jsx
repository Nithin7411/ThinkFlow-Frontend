import AuthorInfo from "./AuthorInfo";
import parse from "html-react-parser"
const ResponsesList = function ({ comments }) {
  return (
    <ul className="responses-list">
      {comments.map((response,index) => (
        <div className="responded-user" key={index}>
          <AuthorInfo story={response}/>
          <li>{response.response && parse(response.response)}</li>
        </div>
      ))}
    </ul>
  );
};

export default ResponsesList;