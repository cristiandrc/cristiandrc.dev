import React from "react";
import imgTodoApp from "../../assets/img/Todo-App.png";
import imgWeatherApp from "../../assets/img/Weather-App.png";
import imgTodoBackEnd from "../../assets/img/TodoAppBackEnd.png";
import { Card } from "@/components/Card/Card";
import styles from "../project/project.module.scss";

const Data = [
  {
    id: 0,
    name: "ToDo-App",
    img: imgTodoApp,
    page: "https://todo-app-cristiandrc.vercel.app/",
    github: "https://github.com/cristiandrc/Todo-App",
  },
  {
    id: 2,
    name: "BackEnd ToDo-App",
    img: imgTodoBackEnd,
    page: "",
    github: "https://github.com/cristiandrc/BackEndTodoApp",
  },
  {
    id: 1,
    name: "Weather-App",
    img: imgWeatherApp,
    page: "https://weather-app-cdrc.netlify.app/",
    github: "https://github.com/cristiandrc/weatherApp",
  },
];

export const metadata = {
  title: "Projects - Cristian Rojas",
  alternates: {
    canonical: "/project",
  },
};
const Project = () => {
  return (
    <section className={styles.projects}>
      <h1 className={styles.projects_title}>Projects</h1>
      <p>In this section you can see the most outstanding projects</p>
      <div className={styles.cards_container}>
        {Data.map((data) => (
          <Card key={data.id} {...data} />
        ))}
      </div>
    </section>
  );
};

export default Project;
