import React, { useState, useEffect } from "react";
import axios from "axios";

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
    let completed = false; //초기에는 실행해야 되기때문에 false flag 변수

    //query를 리턴하는 함수를 result에 할당
    async function get() {
      const result = await axios.get(
        `https://api.thecatapi.com/v1/images/search`
      );
      if (!completed) setData(result.data);
    }
    get();
    setInput(false);
    return () => {
      completed = true;
    };
    //query가 변할때 useEffect를 실행해야하는 시점이다
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
