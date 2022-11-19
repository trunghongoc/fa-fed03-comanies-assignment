import { useState } from "react";
import { Button } from "react-bootstrap";
import { Circle } from "../../assets/Circle";
import "./style.scss";

export const Bootstrap = () => {
  const [variant, setVariant] = useState("primary");

  return (
    <div>
      <p>Page bootstrap</p>

      <Circle time={10} />

      <Button
        variant={variant}
        onMouseEnter={() => setVariant("danger")}
        onMouseLeave={() => setVariant("primary")}
      >
        Primary button
      </Button>
    </div>
  );
};
