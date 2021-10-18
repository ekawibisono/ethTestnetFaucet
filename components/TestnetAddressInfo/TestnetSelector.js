import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const TestnetSelector = ({ initial, testnets, onTestnetSelection }) => {
  return (
    <FormControl component="fieldset">
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <FormLabel component="legend">
          <Typography variant="h5">Test Network:</Typography>
        </FormLabel>
        <RadioGroup
          row
          defaultValue={testnets[initial].id}
          onChange={(e) => onTestnetSelection(testnets.find((testnet) => testnet.id === +e.target.value))}>
          {testnets.map((testnet) => (
            <FormControlLabel key={testnet.id} value={testnet.id} control={<Radio />} label={testnet.label} />
          ))}
        </RadioGroup>
      </Box>
    </FormControl>
  );
};

export default TestnetSelector;
