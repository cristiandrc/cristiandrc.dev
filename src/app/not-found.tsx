"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./not-found.module.scss";

declare global {
  var dataLayer: any[];
}

const NotFound = () => {
  useEffect(() => {
    if (dataLayer) {
      dataLayer.push({ event: "error_404" });
    }
  }, []);
  redirect("/");
  return (
    <div className={styles.not_found}>
      <h2 className={styles.not_found_title}>¡Ups! </h2>
      <h3 className={styles.not_found_subTitle}>Error 404</h3>
      <p className={styles.not_found_message}>
        The page you are looking for may have been moved, deleted, or possibly
        never existed
      </p>
      <Link className={styles.not_found_link} href="/">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
