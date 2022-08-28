import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Sort from "../assets/Sorting2.jpg";
import Linkedlist from "../assets/LinkedList.png";
import Binarytree from "../assets/binarytree.png";
import Timecomplexity from "../assets/timecomplexity.png";
import Stack from "../assets/stack.jpg";
import Queue from "../assets/queue.jpg";

function Images() {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} swipeable={true} stopOnHover={true} showIndicators={false} showThumbs={false} showArrows={true} showStatus={false} emulateTouch={true}>
      <div>
        <img src={Sort} alt="Sorting" />
        <p className="legend">SORTING</p>
      </div>
      <div>
        <img src={Linkedlist} alt="Linked List" />
        <p className="legend">LINKED LIST</p>
      </div>
      <div>
        <img src={Binarytree} alt="Binary Tree" />
        <p className="legend">BINARY TREE</p>
      </div>
      <div>
        <img src={Timecomplexity} alt="Time Complexity" />
        <p className="legend">TIME COMPLEXITY</p>
      </div>
      <div>
        <img src={Stack} alt="Coming Soon" />
        <p className="legend">COMING SOON</p>
      </div>
      <div>
        <img src={Queue} alt="Coming Soon" />
        <p className="legend">COMING SOON</p>
      </div>
    </Carousel>
  );
}

export default Images;
