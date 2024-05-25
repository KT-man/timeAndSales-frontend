import { FC } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import pageCountStore from "../../recoilStores/pageCount/pageCountStore";
import pageIndexSelector from "../../recoilStores/paginate/pageIndexSelector";
import paginateStore from "../../recoilStores/paginate/paginateStore";
import styles from "./ControlPanelComponent.module.css";

interface ControlPanelComponentProps {}

const ControlPanelComponent: FC<ControlPanelComponentProps> = () => {
  const [pageState, setPageState] = useRecoilState(paginateStore);
  const maxPageCount = useRecoilValue(pageCountStore);
  const setPageIndex = useSetRecoilState(pageIndexSelector);
  console.log(pageState);
  console.log(maxPageCount);

  const handleBackOnePage = () => {
    if (pageState.pageIndex === 0) {
      return;
    }
    setPageIndex(-1);
  };
  const handleForwardOnePage = () => {
    if (pageState.pageIndex === maxPageCount - 1) {
      return;
    }
    setPageIndex(1);
  };
  const handleGoBackTenPages = () => {
    if (pageState.pageIndex - 11 < 0) {
      setPageState((prevState) => {
        return { ...prevState, pageIndex: 0 };
      });
      return;
    }

    setPageIndex(-10);
  };
  const handleGoToLastPage = () => {
    if (pageState.pageIndex + 10 > maxPageCount - 1) {
      setPageState((prevState) => {
        return { ...prevState, pageIndex: maxPageCount - 1 };
      });
      return;
    }

    setPageIndex(10);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const convertedNumber = Number(e.target.value);
    if (
      Number.isInteger(convertedNumber) &&
      convertedNumber <= maxPageCount - 1
    ) {
      setPageState((prevState) => {
        return { ...prevState, pageIndex: convertedNumber };
      });
    }
  };

  return (
    <div className={styles.rootWrapper}>
      {/* Left side buttons */}
      <button onClick={handleGoBackTenPages}>{`<<`}</button>
      <button onClick={handleBackOnePage}>{`<`}</button>

      {/* Input field to jump pages */}
      <div>
        <label>
          Page{" "}
          <input
            type="text"
            value={pageState.pageIndex}
            className={styles.pageInput}
            onChange={handleInputChange}
          ></input>
        </label>
        <span>of {maxPageCount - 1}</span>
      </div>

      {/* Right side buttons */}
      <button onClick={handleForwardOnePage}>{`>`}</button>
      <button onClick={handleGoToLastPage}>{`>>`}</button>
    </div>
  );
};

export default ControlPanelComponent;
