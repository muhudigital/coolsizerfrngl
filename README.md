# Cool sizer fr ngl

It's a turbo repo with UI library and test web app.

## To run the web app project

```bash
npm install


turbo dev
or
npx turbo dev

```

## To run unit tests

```bash

turbo test
or
npx turbo test

```

## CoolSizerFrngl Component

### Overview

`CoolSizerFrngl` is a flexible and customizable React component that allows for dynamic resizing of elements. It supports resizing in horizontal (`x`), vertical (`y`), or both directions (`xy`). The component is highly configurable with minimum width/height constraints and customizable handle styles.

### Props

- `minWidth` (optional): The minimum width of the resizable element (number).
- `minHeight` (optional): The minimum height of the resizable element (number).
- `directions` (optional): An array specifying the allowed resize directions. Possible values are `"x"`, `"y"`, and `"xy"`.
- `xHandleClassName` (optional): Custom class name for the horizontal resize handle.
- `yHandleClassName` (optional): Custom class name for the vertical resize handle.
- `xyHandleClassName` (optional): Custom class name for the diagonal resize handle.

### Styling

You can provide custom styles for the resize handles using the `xHandleClassName`, `yHandleClassName`, and `xyHandleClassName` props. These will be merged with the default styles.

### Usage

Here's a basic example of how to use `CoolSizerFrngl`:

```jsx
import React from "react";
import { CoolSizerFrngl } from "path-to-CoolSizerFrngl";

const MyComponent = () => {
  return (
    <CoolSizerFrngl
      minWidth={100}
      minHeight={100}
      directions={["x", "y"]}
      xHandleClassName="custom-x-handle-class"
      yHandleClassName="custom-y-handle-class"
    >
      <div>Your resizable content here</div>
    </CoolSizerFrngl>
  );
};

export default MyComponent;
```

### Dependencies

- React
- TailwindCSS

To not purge the TailwindCSS styles, you need to add the `packages/ui` library to the content array in `tailwind.config.js`. Either directly or from `node_modules`.

To push the library to npm repository, compilation and export of the styles needs to be configured.
