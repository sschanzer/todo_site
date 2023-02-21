import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

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
        Pending
      </ToggleButton>
      <ToggleButton
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
        Complete
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
