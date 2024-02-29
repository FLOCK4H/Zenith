import React, { forwardRef } from 'react';


const DialogBox = forwardRef(({ closeDialog }, ref) => {
  return (
    <div ref={ref} onClick={closeDialog}>
      {/* Content inside the dialog box */}
    </div>
  );
});

export default DialogBox;