import { useState, useEffect } from "react";
import axios from "axios";
import { INews } from "../../interfaces";

const NewsFeed = () => {
  const [articles, setArticles] = useState<INews[] | null>([]);

  const firstPackArticles = articles?.slice(0, 8);
  console.log(articles);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/news",
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="container news-feed">
      <h2>News Feed</h2>
      {firstPackArticles?.map((article, _index) => (
        <div key={_index}>
          <a href={article.url}>
            <p>{article.title}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
