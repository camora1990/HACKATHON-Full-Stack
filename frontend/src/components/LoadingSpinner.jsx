import { Spin } from "antd";
import React from "react";

export const LoadingSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: 400 }}
    >
      <Spin size="large" tip="loading....." />
    </div>
  );
};
