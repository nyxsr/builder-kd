import { useNode } from "@craftjs/core";
import {
  FormControl,
  FormLabel,
  Slider,
} from "@mui/material";
import React from "react";

export const Image = ({ width = 100, height = 10, src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQsGd527Je8EDRvKG3EkGtMEObGrFKxxowYg&usqp=CAU' }) => {
  const {
    connectors: { connect, drag } } = useNode();
  return (
    <img
      ref={(ref) => connect(drag(ref))}
      src={src}
      alt=""
      style={{
        width: `${width}` + "%",
        height: `${height}` + "%",
        objectFit: "cover",
      }}
    />
  );
};

const upload = (event, setProp) => {
  var file = event.target.files[0];
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);

  reader.onloadend = function (e) {
    setProp((props) => (props.src = reader.result));
  };
}

const ImageSettings = () => {
  const { actions: { setProp }, width, height, src } = useNode((node) => ({
    src: node.data.props.src,
    width: node.data.props.width,
    height: node.data.props.height,
  }));
  return (
    <div className="flex flex-col">
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Width</FormLabel>
        <Slider
          defaultValue={width || 100}
          step={1}
          min={7}
          max={100}
          valueLabelDisplay="auto"
          onChange={(_, value) => {
            setProp((props) => (props.width = value));
          }}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Height</FormLabel>
        <Slider
          defaultValue={height || 7}
          step={1}
          min={7}
          max={100}
          valueLabelDisplay="auto"
          onChange={(_, value) => {
            setProp((props) => (props.height = value));
          }}
        />
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">src</FormLabel>
        <input type="file" onChange={(event) => upload(event, setProp)} />
      </FormControl>
    </div>
  );
};

Image.craft = {
  related: {
    settings: ImageSettings
  }
}
