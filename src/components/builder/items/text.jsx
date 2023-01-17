import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";

export const Text = ({ text, fontSize,textAlign }) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected.size > 0,
    hasDraggedNode: state.events.dragged.size > 0,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(false)
  }, [hasSelectedNode]);

  console.log(editable);

  return (
    <div ref={(ref) => connect(drag(ref))} onClick={(e) => setEditable(true)} onBlur={(e)=>setEditable(false)}>
      <ContentEditable
        disabled={!editable}
        html={text}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
      {/* {editable && (
       
      )} */}
    </div>
  );
};

const TextSettings = () =>{
  const {actions: {setProp}, fontSize} = useNode((node)=>({
    fontSize: node.data.props.fontSize
  }))

  return(
    <>
     <FormControl className="text-additional-settings" size="small">
          <FormLabel component="legend">Font size</FormLabel>
          <Slider
            defaultValue={fontSize || 7}
            step={1}
            min={7}
            max={50}
            valueLabelDisplay="auto"
            onChange={(_, value) => {
              setProp((props) => (props.fontSize = value));
            }}
          />
        </FormControl>
    </>
  )
}

Text.craft = {
  props:{
    text:'hi',
    fontSize: 20
  },
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
  },
  related:{
    settings: TextSettings
  }
};
