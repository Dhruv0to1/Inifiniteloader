import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

export default function MyPage() {
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [multiple, setMultiple] = useState(6);
  const [show, setShow] = useState(0);
  let counter = 0;

  useEffect(() => {
    let val = 6 * counter;
    let res = multiple - val;
    fetch(`https://dummyjson.com/products?limit=${6}&skip=${res}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(multiple);
        console.log(data.products);
        setResult([...result, ...data.products]);
        counter = counter + 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [multiple]);

  useEffect(() => {
    if (show === 1) {
      setMultiple(multiple + 6);
      setLoader(false);
    } else {
      console.log("try to fetch again,error");
    }
  }, [show]);
  function scrollHandle(e) {
    if (e.target.offsetHeight + e.target.scrollTop > e.target.scrollHeight) {
      setShow((prev) => prev + 1);
      setLoader(true);
    } else {
      setShow(0);
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
