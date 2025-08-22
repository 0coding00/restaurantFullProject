import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { uiAction } from "../../store/ui"; // adjust path if needed

export default function Notify() {
  const message = useSelector((state) => state.ui.message);
  const dispatch = useDispatch();
 const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (message) {
           setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        dispatch(uiAction.notify(null)); // clear message after 2s

      }, 2000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [message, dispatch]);

  if (!message) return 'message';

  return (
  <div className={`notify-content ${visible ? "show" : "hide"}`}>
    <p>{message}</p>
    </div>
  );
}
