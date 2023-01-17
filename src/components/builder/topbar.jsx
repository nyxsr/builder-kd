import { useEditor } from "@craftjs/core";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import LZUTF8 from "lzutf8";
import copy from "copy-to-clipboard";

export const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [stateToLoad, setStateToLoad] = useState(null);

  const [state, setState] = useState(null);

  const localState = localStorage.getItem('state-builder')

  const handleState = () => {
    if (state !== null) {
      const json = LZUTF8.decompress(
        LZUTF8.decodeBase64(state)
      );
      actions.deserialize(json);
      setSnackbarMessage("State loaded");
    }
  };

  setTimeout(() => {
    if (localState !== null) {
     setState(localState)
    }
  }, 1000);

  useEffect(() => {
    handleState();
  }, [state]);

  return (
    <Box px={1} py={1} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item xs>
          <FormControlLabel
            control={
              <Switch
                checked={enabled}
                onChange={(_, value) =>
                  actions.setOptions((options) => (options.enabled = value))
                }
              />
            }
            label="Enable"
          />
        </Grid>
        <Grid item>
        <button
            className="py-2 px-2 mr-5 bg-[#abcfce]"
            onClick={() => {
              const json = query.serialize();
              localStorage.setItem('state-builder',LZUTF8.encodeBase64(LZUTF8.compress(json)))
              setSnackbarMessage("Data has been saved!");
            }}
          >
            Save Changes
          </button>
          <button
            className="py-2 px-2 mr-5 bg-[#abcfce]"
            onClick={() => {
              const json = query.serialize();
              copy(LZUTF8.encodeBase64(LZUTF8.compress(json)));
              setSnackbarMessage("State copied to clipboard");
            }}
          >
            Copy current state
          </button>
          <button
            className="py-2 px-2 bg-[#abcfce]"
            onClick={() => setDialogOpen(true)}
          >
            Load
          </button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">Load state</DialogTitle>
            <DialogContent>
              <TextField
                multiline
                fullWidth
                placeholder='Paste the contents that was copied from the "Copy Current State" button'
                size="small"
                value={stateToLoad}
                onChange={(e) => setStateToLoad(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <button
                onClick={() => setDialogOpen(false)}
                className="py-2 px-2 bg-[#abcfea]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDialogOpen(false);
                  const json = LZUTF8.decompress(
                    LZUTF8.decodeBase64(stateToLoad)
                  );
                  actions.deserialize(json);
                  setSnackbarMessage("State loaded");
                }}
                autoFocus
                className="py-2 px-2 bg-blue-500"
              >
                Load
              </button>
            </DialogActions>
          </Dialog>
          <Snackbar
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!snackbarMessage}
            onClose={() => setSnackbarMessage(null)}
            message={<span>{snackbarMessage}</span>}
          />
          {/* <button 
           className="py-2 px-2 bg-[#abcfce] rounded-lg"
            onClick={() => {
              console.log(query.serialize())
            }}
          >
              Serialize JSON to console
          </button> */}
        </Grid>
      </Grid>
    </Box>
  );
};
