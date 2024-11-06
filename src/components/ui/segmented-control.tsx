// src/components/ui/segmented-control.tsx
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";

export const SegmentedControl = ({ items, defaultValue, onChange }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleClick = (item: any) => {
    setSelected(item);
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <ButtonGroup isAttached py={'1rem'}>
      {items.map((item: any) => (
        <Button
          color={selected === item ? "gray.800" : "gray.500"}
          key={item}
          onClick={() => handleClick(item)}
          variant={selected === item ? "solid" : "outline"}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
};