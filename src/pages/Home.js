import React from "react";
import Cardcontainer from "../components/Cardcontainer";
import HomeHeader from "../ui/HomeHeader";
import "../styles/Home.css";
import Images from "../components/Images";

function Home() {
  return (
    <div>
      <Cardcontainer>
        <HomeHeader />
        <div className="border">
          <div className="css-typing">
            <div className="wrapper">
              <p>Hello World! Welcome to Project Algo Rhythm!</p>
            </div>
            <div className="wrapper">
              <p>by @tr1b1iwnl - Christian</p>
            </div>
            <div className="wrapper">
              <p>
                This project showcases visualization of the Data Structures and
                Algorithms.
              </p>
            </div>
            <div className="wrapper">
              <p>
                If you have any suggestions here's the link to the{" "}
                <a href="https://github.com/tr1b1iwnl/DSAlgorithms">
                  repository
                </a>
                . Enjoy!
              </p>
            </div>
          </div>
          <div className="border2">
            <div className="box1">
              <p>
                This Project is inspired by Clément Mihailescu, here's his
                tutorial on making the Sorting Visualizer.
              </p>
              <div className="embed">
                <iframe
                  src="https://www.youtube.com/embed/pFXYym4Wbkc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="box2">
              <p>Features included in this project:</p>
              <div className="slides">
                <Images />
              </div>
            </div>
          </div>
        </div>
      </Cardcontainer>
    </div>
  );
}

export default Home;
