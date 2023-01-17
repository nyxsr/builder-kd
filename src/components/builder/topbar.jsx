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
    // setState(
    //   "eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkNvbnRhaW5lciJ9LCJpc0NhbnZhcyI6dHJ1ZSwicHJvcHPENWJhY2tncm91bmQiOiIjZWVlIiwicGFkZGluZyI6MjAsIndpZHRoIjozMH0sImRpc3BsYXnRYSwiY3VzdG9tIjp7fSwiaGlkZGVuIjpmYWxzZSwibm9kZXMiOltdLCJsaW5rZWROxhF7fX0sIkZfbVZqUWoyQU78AMphcmTuAMXHW/cAxmbFAewAyTPyAL3EVO4AuHBhcmVudCI65gFZ/wDI7wDIdi1YQ3pjSFZOX/sAyEJ1dHRvbv4AynNpesQrc21hbGwiLCJ2YXJpYeUAlW91dGxpbmXlALVvbG9yIjoicHJpbWFyeSIsInRleMQkQ2xpY2sgbeQBxGNoaWxkcuQAv8YWxHbuAQLnAI7/AQT/AQTsAQROZmJ3VmJuYlBP+wEEVOQAqv0BAucAzEhpIHdvcmxkISIsImZvbnRT5QEZ5AKS7QEj8QDXxWH/ANX/ANXsANV1WEgwczM1SmlE/wNr/wNr8QKlOTk57AKiNv8DX/8AzvIAziJZSjMtS3dVNzdjIvUA2ssg/wGv/wGv5QGvSXQncyBtZSBhZ2Fpbv8BtP8BtO4A5usBgf8Buu0A4H0="
    // );
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
