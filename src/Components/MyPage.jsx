import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

export default function MyPage() {
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [multiple, setMultiple] = useState(6);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${multiple}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(multiple);
        console.log(data.products);
        setResult([...result, ...data.products]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [multiple]);
  function scrollHandle(e) {
    // console.log(e);
    if (
      e.target.offsetHeight + e.target.scrollTop + 1 >
      e.target.scrollHeight
    ) {
      setLoader(true);
      const examplePromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(200);
        }, 3000);
      });
      examplePromise
        .then((data) => {
          setMultiple(multiple + 6);
          setLoader(false);
        })
        .catch((data) => {
          console.log("error");
        });
    }
  }
  return (
    <>
      <h1 className="headingTag">Gallery</h1>
      <div
        className="scrollBar"
        onScroll={(e) => {
          scrollHandle(e);
        }}
      >
        {result.map((item, i) => {
          return (
            <div className="imageDiv" key={i}>
              <img
                src={item.images[0]}
                alt={`Image with Id: ${item.id}`}
                className="image"
              />
            </div>
          );
        })}
        {loader ? (
          <div className="spinner">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
