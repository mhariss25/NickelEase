import React from "react";
import { Popover, Whisper, Button, IconButton } from "rsuite";

const DefaultPopover = React.forwardRef(({ content, ...props }, ref) => {
  return (
    <Popover ref={ref} title="Contributors" {...props}>
      <span>
        {content ? (
          <pre>
            <strong>{content}</strong>
          </pre>
        ) : (
          `No Contributors Yet`
        )}
      </span>
    </Popover>
  );
});

const CustomComponent = ({ contributors, placement, children, icon }) => {
  const contributorList = contributors();
  return (
    <Whisper
      trigger="hover"
      placement={placement}
      controlId={`control-id-${placement}`}
      speaker={<DefaultPopover content={contributorList} />}>
      <Button appearance="link">{icon}</Button>
    </Whisper>
  );
};

export { DefaultPopover, CustomComponent };
