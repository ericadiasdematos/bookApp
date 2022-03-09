import "./App.css";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Card } from "antd";
import { HeartFilled, ShoppingFilled, HeartOutlined } from "@ant-design/icons";
import { Switch } from 'antd';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';




const { Header, Content } = Layout;

function App() {
  const [booksList, setBooksList] = useState([]);
  const [wishlistTable, setWishlistTable] = useState([]);

  useEffect( () => {
    async function fetchData() {
      fetch(
        "https://api.nytimes.com/svc/books/v3/lists.json?list_name=Hardcover Advice&api-key=RmSeqDHFjqh09NAu7zxdTkOtK064g0tK"
      )
        .then((res) => res.json())
        .then((json) => setBooksList(json.results));
    }
    fetchData()
  }, []);

 function handleHeart(book) {
    if (wishlistTable.includes(book) === false) {
      setWishlistTable([...wishlistTable, book]);
    }
    let localStorageTable = localStorage.getItem("favoriteBooks")
    if(localStorageTable.includes(book.book_details[0].title) === false){
      localStorage.setItem("favoriteBooks", [localStorageTable, JSON.stringify(book.book_details[0].title)])
    }
  }

  function handleRemoveHeart(book) {
    setWishlistTable(wishlistTable.filter((e) => e !== book));
    let localStorageTable = localStorage.getItem("favoriteBooks")
    localStorage.setItem("favoriteBooks", localStorageTable.filter((e) => e !== JSON.stringify(book.book_details[0].title)))
  }

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <div className="App">
      <section>
        <Layout style={layout}>
          <Header style={header}>
            <span style={titre}>New York Time's Bestseller Advice Books</span>
          </Header>
          <Content style={content}>
            <div style={wishlistDiv}>
              <a style={wishlist} href="#wishlist">
                My Wishlist <HeartFilled style={styleHeart} />
              </a>
              <div style={darkStyle}>
                <BsFillSunFill size={25} style={sunStyle}/>
                <Switch onChange={onChange}/>
                <BsFillMoonFill size={20} style={moonStyle}/>
              </div>
            </div>
            <div style={cardsDiv}>
              {booksList.map(function (book, i) {
                let heartIcon = (
                  <HeartOutlined
                    style={iconStyleHeart}
                    onClick={() => handleHeart(book)}
                  />
                );
                if (wishlistTable.includes(book) === true) {
                  heartIcon = (
                    <HeartFilled
                      style={iconStyleHeart}
                      onClick={() => handleRemoveHeart(book)}
                    />
                  );
                }
                return (
                  <Card
                    key={i}
                    title={book.book_details[0].title}
                    extra={
                      <div>
                        <a href={book.amazon_product_url}>
                          <ShoppingFilled style={iconStyleShop} />
                        </a>
                        {heartIcon}
                      </div>
                    }
                    style={{
                      width: 300,
                      minHeight: 250,
                      textAlign: "start",
                      marginBottom: 10,
                      marginRight: 10,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={divInCard}>
                      <span style={authorStyle}>
                        By: {book.book_details[0].author}
                      </span>
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
            <div style={cardsDivWishlist}>
              {wishlistTable.map(function (book, i) {
                let heartIcon = (
                  <HeartOutlined
                    style={iconStyleHeart}
                    onClick={() => handleHeart(book)}
                  />
                );
                if (wishlistTable.includes(book) === true) {
                  heartIcon = (
                    <HeartFilled
                      style={iconStyleHeart}
                      onClick={() => handleRemoveHeart(book)}
                    />
                  );
                }
                return (
                  <Card
                    key={i}
                    title={book.book_details[0].title}
                    extra={
                      <div>
                        <a href={book.amazon_product_url}>
                          <ShoppingFilled style={iconStyleShop} />
                        </a>
                        {heartIcon}
                      </div>
                    }
                    style={{
                      width: 300,
                      minHeight: 250,
                      textAlign: "start",
                      marginBottom: 10,
                      marginRight: 10,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={divInCard}>
                      <span style={authorStyle}>
                        By: {book.book_details[0].author}
                      </span>
                      <span>{book.book_details[0].description}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
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
  flexDirection: "column",
};

let header = {
  backgroundColor: "#E29578",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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

let cardsDivWishlist = {
  marginTop: 40,
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
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 10px 0px 10px"
};

let wishlist = {
  fontSize: 20,
  color: "#EDF6F9",
  backgroundColor: "#83C5BE",
  padding: 12,
  borderRadius: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

let titre = {
  color: "#EDF6F9",
  fontSize: 30,
  fontWeight: "bold",
};

let divInCard = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

let iconStyleShop = {
  fontSize: 30,
  marginRight: 20,
  color: "#006D77",
  cursor: "pointer",
};

let iconStyleHeart = {
  fontSize: 30,
  color: "#006D77",
  cursor: "pointer",
};

let styleHeart = {
  marginLeft: 7,
};

let authorStyle = {
  marginBottom: 15,
};

let darkStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

let sunStyle = {
  marginRight: 5
}

let moonStyle = {
  marginLeft: 5
}


export default App;
