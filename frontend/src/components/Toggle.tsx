import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import clock from "../assets/clock.png";
import checklist from "../assets/checklist.png";

interface ToggleProps {
  showPending: boolean;
  setShowPending: (showPending: boolean) => void;
  showCompleted: boolean;
  setShowCompleted: (showCompleted: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({
  showPending,
  setShowPending,
  showCompleted,
  setShowCompleted,
}) => {
  return (
    <ToggleButtonGroup defaultValue={[1, 3]} size="sm" type="checkbox">
      <ToggleButton
        style={{
          height: "3vh",
          width: "2vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="outline-primary"
        id="tbg-btn-1"
        checked={showPending}
        defaultChecked={showPending}
        onChange={(e) =>
          showCompleted
            ? setShowPending(e.target.checked)
            : [
                setShowPending(e.target.checked),
                setShowCompleted(!e.target.checked),
              ]
        }
        value={1}
      >
        <img src={clock} style={{ height: "2vh" }} />
      </ToggleButton>
      <ToggleButton
        style={{
          height: "3vh",
          width: "2vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="outline-primary"
        id="tbg-btn-3"
        checked={showCompleted}
        defaultChecked={showCompleted}
        onChange={(e) =>
          showPending
            ? setShowCompleted(e.target.checked)
            : [
                setShowCompleted(e.target.checked),
                setShowPending(!e.target.checked),
              ]
        }
        value={3}
      >
        <img src={checklist} style={{ height: "2vh" }} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
