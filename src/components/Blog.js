import { useEffect, useState } from "react";
import "../App.css";
import Article from "./Article";
import axios from "axios";
function Blog() {
  const [author, setAuthor] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  };
  useEffect(() => getData(), []);
  function handleSubmit(e) {
    e.preventDefault();
    if (content.length < 140) {
      setError(true);
    } else {
      axios.post("http://localhost:3004/articles", {
        author: author,
        content: content,
        date: Date.now(),
      });
      setError(false);
      setAuthor("");
      setContent("");
      window.location.reload();
    }
  }
  return (
    <div className="container mt-5">
      <div className="row ">
        <h2 className="text-center bold"> Blog</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <input
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Votre nom"
            />
          </div>
          <div className="mb-3">
            <textarea
              style={{ border: error ? "1px solid red" : "1px solid #000" }}
              onChange={(e) => setContent(e.target.value)}
              className="form-control"
              rows="3"
              placeholder="Message"
              defaultValue={content}
            ></textarea>
            {error && <p>Vous devez entrer plus de 140 caractères</p>}
          </div>
          <div className="mb-3 flex justify-content-end">
            <button type="submit" className="btn btn-info btn-lg">
              Envoyer
            </button>
          </div>
        </form>
        <ul>
          {blogData
            .sort((a, b) => b.date - a.date)
            .map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </ul>
      </div>
    </div>
  );
}
export default Blog;
