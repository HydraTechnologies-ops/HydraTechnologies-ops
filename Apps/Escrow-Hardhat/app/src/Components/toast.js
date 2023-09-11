import Toast from "react-bootstrap/Toast";
import { Player } from "@lottiefiles/react-lottie-player";
import "./toast.scss";
import { Col } from "react-bootstrap";

function MakeToast(props) {
  return (
    <Toast className="toast rounded">
      <Toast.Header>
        <Player
          src="https://lottie.host/e9b9d2d4-b023-4ae5-a320-7e74b8ef1a38/9XfJyULw9o.json"
          className="rounded me-2"
          autoplay
          loop
        />
        <strong className="me-auto">Confirmed!</strong>
      </Toast.Header>
      <Toast.Body className="toast-body">Currently Working on your request!</Toast.Body>
    </Toast>
  );
}

export default MakeToast;
