import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Slider } from "@mui/material";

export const Viewport = ({background, padding = 0, children, width}) => {
    const { connectors: {connect, drag} } = useNode();
  return (
    <div ref={ref=> connect(drag(ref))} style={{ backgroundColor:`${background}`,padding:`${padding}px` }} className={`h-screen min-w-[30vw] max-w-screen-sm`}>
        {children}
    </div>
  )
}

const ViewportSettings = () => {
    const { background, padding, actions: {setProp} } = useNode(node => ({
      background: node.data.props.background,
      padding: node.data.props.padding
    }));
    return (
      <div>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Background</FormLabel>
           <input type="color" value={background || '#000'} onChange={color=>{
            setProp(props => props.background = color.target.value)
           }}/>
           </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Padding</FormLabel>
          <Slider defaultValue={padding} onChange={(_, value) => setProp(props => props.padding = value)} />
        </FormControl>
      </div>
    )
  }

export const ViewportDefaultProps = {
    background : "#ffffff",
    padding: 3
  };
  
  Viewport.craft = {
    props:ViewportDefaultProps,
    related: {
      settings: ViewportSettings
    }
  }
