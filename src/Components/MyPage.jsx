import { useRef, useState } from "react";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

export default function MyPage() {
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [multiple, setMultiple] = useState(6);
  const [show, setShow] = useState(0);
  const scrollHandle = throttle((e) => {
    if (e.target.offsetHeight + e.target.scrollTop > e.target.scrollHeight) {
      setShow((prev) => prev + 1);
      setLoader(true);
    } else {
      setShow(0);
    }
  }, 1000);
  useEffect(() => {
    let res = multiple - 6;
    fetch(`https://dummyjson.com/products?limit=${6}&skip=${res}`)
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

  useEffect(() => {
    // console.log(show);
    if (show === 1) {
      setMultiple(multiple + 6);
      setLoader(false);
    } else {
      console.log("try to fetch again,error");
    }
  }, [show]);
  function throttle(callBackFunc, delay) {
    let firstCall = true;
    let lastArgs = [];
    let timeOutId = null;
    return (...args) => {
      lastArgs = args;
      if (firstCall) {
        callBackFunc(...lastArgs);
        firstCall = false;
        return;
      }
      if (timeOutId) return;
      timeOutId = setTimeout(() => {
        callBackFunc(...lastArgs);
        timeOutId = null;
      }, delay);
    };
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
              <p>{`Img Id:${item.id}, Img Name:${item.title}`}</p>
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
