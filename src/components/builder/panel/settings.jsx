import { useEditor } from "@craftjs/core";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Slider,
  Button as MaterialButton,
  Typography,
  Chip,
} from "@mui/material";
import React from "react";

export const Settings = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });
  return selected ? (
    <section className="py-5 px-5 bg-white h-fit">
      <p className="text-center font-semibold">Settings</p>
      <Grid container direction="column" spacing={0}>
        <Grid item>
          <Box pb={2}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="body1">Selected</Typography>
              </Grid>
              <Grid item>
                <Chip size="small" color="primary" label="Selected" />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {selected.settings && React.createElement(selected.settings)}
        {/* <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Prop</FormLabel>
          <Slider
            defaultValue={0}
            step={1}
            min={7}
            max={50}
            valueLabelDisplay="auto"
          />
       </FormControl> */}
        {selected.isDeletable ? (
          <button
            className="bg-blue-500 text-white rounded-lg mt-5 py-2 px-2"
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </button>
        ) : null}
      </Grid>
    </section>
  ) : null;
};
