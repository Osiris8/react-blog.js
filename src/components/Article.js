import { useState } from "react";
import axios from "axios";
function Article({ article }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };
  const handleEdit = () => {
    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updateDate: Date.now(),
    };
    axios.put("http://localhost:3004/articles/" + article.id, data).then(() => {
      setIsEditing(false);
    });
  };

  function handleDelete() {
    axios.delete("http://localhost:3004/articles/" + article.id);
    window.location.reload();
  }
  return (
    <div
      className="card mb-3"
      style={{ background: isEditing ? "#d8ffff" : "#fff" }}
    >
      <div className="card-body">
        <div className="flex justifiy-content-space-between">
          <h5 className="card-title">{article.author}</h5>
          <em>Posté le {dateFormater(article.date)}</em>
        </div>
        {isEditing ? (
          <textarea
            rows="3"
            autoFocus
            className="form-control"
            defaultValue={editContent ? editContent : article.content}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        ) : (
          <p className="card-text">
            {editContent ? editContent : article.content}
          </p>
        )}
      </div>
      <div className="card-footer flex justify-content-end">
        {isEditing ? (
          <button className="btn btn-success m-2" onClick={() => handleEdit()}>
            Valider
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success m-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}

        <button
          className="btn btn-danger m-2"
          onClick={() => {
            if (
              window.confirm("Voulez-vous vraiment supprimer cet article ?")
            ) {
              handleDelete();
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
export default Article;
