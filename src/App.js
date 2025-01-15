import { useEffect, useRef, useState } from "react";
import "./App.css";

const data = [
  { value: "australia", label: "Australia" },
  { value: "brazil", label: "Brazil" },
  { value: "switzerland", label: "Switzerland" },
  { value: "usa", label: "USA" },
  { value: "england", label: "England" },
  { value: "ireland", label: "Ireland" },
  { value: "greenland", label: "Greenland" },
  { value: "austria", label: "Austria" },
];
const App = () => {
  const localData = JSON.parse(window.localStorage.getItem("regions"));

  const [toggle, setToggle] = useState(false);

  const [newData, setNewData] = useState(
    localData
      ? data.filter((el) => !localData.some((item) => el.value === item.value))
      : data
  );

  const [region, setRegion] = useState(localData ? localData : []);

  const [empty, setEmpty] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [length, setLength] = useState(0);

  const inputRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleInputRegionClick = () => {
    inputRef.current.focus();
  };

  const handleKey = (e) => {
    if (newData.length !== 0) {
      if (e.key === "ArrowDown" && activeIndex < newData.length - 1) {
        setActiveIndex((prev) => prev + 1);
      }
      if (e.key === "ArrowUp" && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
      if (e.key === "Enter") {
        setRegion((prev) => [...prev, newData[activeIndex]]);
        setNewData(newData.filter((el) => el !== newData[activeIndex]));
        if (activeIndex !== 0) {
          setActiveIndex((prev) => prev - 1);
        }
      }
    }
  };

  useEffect(() => {
    if (newData.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [newData]);

  useEffect(() => {
    if (region.length !== 0) {
      window.localStorage.setItem("regions", JSON.stringify(region));
    } else {
      window.localStorage.removeItem("regions");
    }
  }, [region]);

  return (
    <div className="App">
      <div className="container">
        <div className="region-select-container">
          <div className="input-container">
            <div
              className="input-regions"
              onKeyDown={(e) => {
                handleKey(e);
              }}
              onClick={handleInputRegionClick}
            >
              <div className="regions">
                {region.map((el, index) => {
                  return (
                    <span key={index} value={el.value} className="region">
                      {el.label}
                      <div
                        onClick={() => {
                          setRegion((prev) =>
                            prev.filter((item) => item.value !== el.value)
                          );
                          setNewData(
                            data.filter((element) => {
                              return (
                                element.value === el.value ||
                                !region.some(
                                  (item) => item.value === element.value
                                )
                              );
                            })
                          );
                          setInputValue("");
                          setLength(0);
                        }}
                        className="region-delete-button"
                      >
                        x
                      </div>
                    </span>
                  );
                })}
                <input
                  style={{ width: 20 + length * 7 }}
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setLength(e.target.value.length);
                    setToggle(true);
                    setInputValue(e.target.value);
                    setNewData(
                      data.filter(
                        (item) => !region.some((el) => el.value === item.value)
                      )
                    );
                    setNewData((prev) =>
                      prev.filter((item) => {
                        return (
                          item.label
                            .slice(0, e.target.value.length)
                            .toUpperCase() === e.target.value.toUpperCase()
                        );
                      })
                    );
                  }}
                  className="input"
                  ref={inputRef}
                />
              </div>
            </div>
            <div
              onClick={() => {
                setNewData(data);
                setRegion([]);
                setInputValue("");
                setLength(0);
                inputRef.current.focus();
              }}
              className="clear-button"
            >
              x
            </div>
            <div
              onClick={() => {
                setToggle(!toggle);
                inputRef.current.focus();
              }}
              className="select-input-button"
            >
              {toggle ? "⌃" : "⌄"}
            </div>
          </div>
          <div className={`${toggle ? "options" : "options-hidden"}`}>
            <ul className="option-list">
              {newData.map((el, index) => {
                const label = el.label || "";
                return (
                  <li
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      setRegion((prev) => [...prev, el]);
                      setNewData(
                        data.filter((element) => {
                          return (
                            element.value !== el.value &&
                            !region.some((item) => item.value === element.value)
                          );
                        })
                      );
                      setInputValue("");
                      setLength(0);
                      inputRef.current.focus();
                    }}
                    key={index}
                    value={el.value}
                    className={`${activeIndex === index ? "active" : "option"}`}
                  >
                    <strong>{label.substring(0, length)}</strong>
                    {label.substring(length)}
                  </li>
                );
              })}
              {empty && length !== 0 ? (
                <li className="option-empty">
                  <strong>Илэрц хоосон байна</strong>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
