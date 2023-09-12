import { Spinner } from "reactstrap";
import "./style/style.scss";

function Loader() {
  return (
    <div className={"loader"}>
      <Spinner color="info">Loading...</Spinner>
    </div>
  );
}
export default Loader;
