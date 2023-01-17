import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Paper, Slider } from "@mui/material"

export const Container = ({background, padding = 0, children, width}) => {
  const { connectors: {connect, drag} } = useNode();
  return (
    <Paper ref={ref=> connect(drag(ref))} style={{ margin:"5px 0", width:`${width}vw` , background, padding:`${padding}px` }}>
        {children}
    </Paper>
  )
}

export const ContainerSettings = () => {
  const { background, padding, actions: {setProp} } = useNode(node => ({
    background: node.data.props.background,
    padding: node.data.props.padding
  }));
  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        {/* <ColorPicker defaultValue={background || '#000'} onChange={color => {
          setProp(props => props.background = color)
        }} /> */}
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

export const ContainerDefaultProps = {
  background : "#ffffff",
  padding: 3
};

Container.craft = {
  props:ContainerDefaultProps,
  related: {
    settings: ContainerSettings
  }
}
