import "./App.css";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Card, Button } from "antd";
import { HeartFilled, ShoppingFilled } from "@ant-design/icons"
// import { Link } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [booksList, setBooksList] = useState([]);
  const [wishlist, setWishlist] = useState([])

  useEffect(async () => {
    fetch(
      "https://api.nytimes.com/svc/books/v3/lists.json?list_name=Hardcover Advice&api-key=RmSeqDHFjqh09NAu7zxdTkOtK064g0tK"
    )
      .then((res) => res.json())
      .then((json) => setBooksList(json.results));
  }, []);

  return (
    <div className="App">
      <section>
        <Layout style={layout}>
          <Header style={header}>
            <span style={titre}>New York Time's Bestseller Advice Books</span>
          </Header>
          <Content style={content}>
            <div style={wishlistDiv}>
              <a href="#wishlist" style={wishlist}>My Wishlist <HeartFilled style={styleHeart} /></a>
            </div>
            <div style={cardsDiv}>
              {booksList.map(function (book, i) {
                return (
                  <Card
                    key={i}
                    title={book.book_details[0].title}
                    extra={<div><ShoppingFilled style={iconStyleShop}/><HeartFilled style={iconStyleHeart}/></div>}
                    style={{
                      width: 300,
                      minHeight: 250,
                      textAlign: "start",
                      marginBottom: 10,
                      marginRight: 10,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    // actions={[
                    //   <SettingOutlined key="setting" />,
                    //   <EditOutlined key="edit" />,
                    //   <EllipsisOutlined key="ellipsis" />,
                    // ]}
                  >
                    <div style={divInCard}>
                      <span style={authorStyle}>By: {book.book_details[0].author}</span>
                      <span>{book.book_details[0].description}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Content>
        </Layout>
      </section>
      <section id="wishlist">
        <Layout style={layoutWishlist}>
          <Header style={header}>
              <span style={titre}>My Wishlist</span>
          </Header>
          <Content style={content}>

          </Content>
        </Layout>
      </section>
    </div>
  );
}

let layout = {
  height: "auto",
};

let layoutWishlist = {
  height: "100vh",
};

let content = {
  backgroundColor: "#EDF6F9",
  display: "flex",
  flexDirection: "column"
};

let header = {
  backgroundColor: "#E29578",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

let footer = {
  backgroundColor: "#83C5BE",
};

let cardsDiv = {
  marginTop: 20,
  marginBottom: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "100%",
  flexWrap: "wrap",
};

let wishlistDiv = {
  height: 100,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

let wishlist = {
  fontSize: 20,
  color: "#EDF6F9",
  backgroundColor: "#83C5BE",
  padding: 12,
  borderRadius: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

let titre = {
  color: "#EDF6F9",
  fontSize: 30,
  fontWeight: "bold"
}

let divInCard = {
  display: "flex",
  flexDirection: "column",
  height: "100%"
}

let iconStyleShop = {
  fontSize: 30,
  marginRight: 20,
  color: "#006D77",
  cursor: "pointer"
}

let iconStyleHeart = {
  fontSize: 30,
  color: "#006D77",
  cursor: "pointer"

}

let styleHeart = {
  marginLeft: 7
}

let authorStyle = {
  marginBottom: 15
}

export default App;
