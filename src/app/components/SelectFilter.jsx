import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedCategories, theme) {
  return {
    fontWeight: selectedCategories.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip({ categories,setSelectedCategoryIds,selectedCategoryIds }) {
  const theme = useTheme();
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value
    );
    const selectedIds = categories
      .filter((cat) => (typeof value === 'string' ? value.split(',') : value).includes(cat.category))
      .map((cat) => cat._id);

    setSelectedCategoryIds(selectedIds);    
  };
 
 
  return (
    <div>
      <FormControl sx={{ m: 1 }} className="bg-[#bdb4b4] w-full text-white">
        <InputLabel id="demo-multiple-chip-label" className="text-white font-semibold">
          Filter
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" className="text-white" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} className="text-white">
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((cat) => (
            <MenuItem
              key={cat._id}
              value={cat.category}
              style={getStyles(cat, selectedCategories, theme)}
            >
              {cat.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
