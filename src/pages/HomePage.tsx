import React from "react";
import papaparse from "papaparse";

interface HomePageProps {}

const HomePage = (): React.FC<HomePageProps> => {
  const csv = `time,open,high,low,close
    2024-05-03T09:00:02+08:00,1.88,1.88,1.88,1.88
    2024-05-03T09:00:20+08:00,1.9,1.9,1.9,1.9`;
  const data = papaparse.parse(csv);
  console.log(data);
  return (
    <>
      <div>This is Home Page</div>
      <div>Try to parse</div>
    </>
  );
};

export default HomePage;
