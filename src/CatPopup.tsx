import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCatApi } from "./api";

interface Cat {
  id: string;
  url: string;
  height: number;
  width: number;
}

interface Props {
  input: boolean;
  setInput: React.Dispatch<React.SetStateAction<boolean>>;
}

function CatPopup(props: Props) {
  const { input, setInput } = props;
  const [data, setData] = useState<Cat[]>([]);

  //useEffect는 비동기적으로 동작
  useEffect(() => {
    getCatApi().then((a) => setData(a.data));
    // async 나 promise 둘다 Then을 사용할 수 있다.
    setInput(false);
  }, [input]); //input에 값이 변경이 되었을때 effect를 실행한다

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {data.map((a) => {
        return <img src={a.url} alt="cat" width={160} />;
      })}
    </div>
  );
}

export default CatPopup;
