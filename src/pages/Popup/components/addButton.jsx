import React from 'react';
import {
  Button,
  Typography,
  Popover,
  Autocomplete,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addTask, createTask, createTaskList } from '../Util/utils';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const AddButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [categoryValue, setCategoryValue] = React.useState('');
  const [descValue, setDescValue] = React.useState('');
  const [dueDate, setDueDateValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        style={{ alignSelf: 'right', borderRadius: '50%' }}
      >
        <AddIcon></AddIcon>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        style={{ padding: '16px' }}
      >
        <Stack spacing={2} style={{ width: 500 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ margin: 8 }}
          >
            <Typography sx={{ p: 2 }}>Category: {categoryValue}</Typography>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              value={categoryValue}
              onChange={(event, newValue) => {
                setCategoryValue(newValue);
              }}
              options={[1, 2, 3]}
              renderInput={(params) => (
                <TextField {...params} label="freeSolo" />
              )}
              style={{ width: 260 }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ margin: 8 }}
          >
            <Typography sx={{ p: 2 }}>Description: {descValue}</Typography>
            <TextField
              style={{ width: 260 }}
              value={descValue}
              onChange={(event) => {
                setDescValue(event.target.value);
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ margin: 8 }}
          >
            <Typography sx={{ p: 2 }}>Due Date: {dueDate}</Typography>

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{ width: 260 }}
            >
              <DatePicker
                value={dueDate}
                onChange={(event) => {
                  console.log(event.toString());
                  setDueDateValue(event.toString());
                }}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};
