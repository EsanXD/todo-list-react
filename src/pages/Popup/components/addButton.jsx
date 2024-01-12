import React, { useEffect } from 'react';
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
import { DateTime } from 'luxon';

export const AddButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [categories, setCategories] = React.useState([]);
  const [categoryValue, setCategoryValue] = React.useState('');
  const [descValue, setDescValue] = React.useState('');
  const [dueDate, setDueDateValue] = React.useState('');
  const [label, setLabel] = React.useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateRandomHex = () => {
    const hexDigits = '0123456789ABCDEF';
    let hexValue = '#';

    for (let i = 0; i < 6; i++) {
      hexValue += hexDigits[Math.floor(Math.random() * 16)];
    }

    return hexValue;
  };

  const submitData = async () => {
    if (categoryValue && descValue && dueDate) {
      const task = createTask(
        label,
        descValue,
        DateTime.now(),
        DateTime.fromISO(dueDate),
        false
      );

      const result = await chrome.storage.local.get('categories');
      let categories = result.categories ?? [];
      const category = categories
        ? categories.find((ele) => ele.category === categoryValue)
        : [];
      if (category) {
        category.items.push(task);
      } else {
        const newList = createTaskList(categoryValue, generateRandomHex());
        newList.items.push(task);
        categories = [...categories, newList];
      }
      await chrome.storage.local.set({
        categories: categories,
      });
      handleClose();
    }
    //toast not enough data
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    chrome.storage.local.get('categories', (result) => {
      const list = result
        ? result.flatmap((cat) => {
            return cat.category;
          })
        : [];
      setCategories(list);
    });
  }, []);

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
        <Stack spacing={2} style={{ width: 500, backgroundColor: '#c68a0c' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ margin: 8 }}
          >
            <Typography sx={{ p: 2 }}>Item Name: {label}</Typography>
            <TextField
              id="outlined-basic"
              label="Task Name"
              variant="outlined"
              value={label}
              style={{ width: 260, backgroundColor: '#fcce03' }}
              onChange={(event) => {
                setLabel(event.target.value);
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ margin: 8 }}
          >
            <Typography sx={{ p: 2 }}>Category: {categoryValue}</Typography>
            <Autocomplete
              freeSolo
              value={categoryValue}
              onKeyDown={(event) => {
                setCategoryValue(event.target.value);
                setCategoryValue(event.target.value);
              }}
              options={categories}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              style={{ width: 260, backgroundColor: '#fcce03' }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ margin: 8 }}
          >
            <Typography sx={{ p: 2 }}>Description: {descValue}</Typography>
            <TextField
              style={{ width: 260, backgroundColor: '#fcce03' }}
              value={descValue}
              label="Description"
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
              style={{ width: 260, backgroundColor: '#fcce03' }}
            >
              <DatePicker
                value={dueDate}
                onChange={(event) => {
                  setDueDateValue(event.toString());
                }}
              />
            </LocalizationProvider>
          </Stack>
          <Button
            variant="contained"
            style={{ backgroundColor: '#F8C8DC' }}
            onClick={submitData}
          >
            Add Item
          </Button>
        </Stack>
      </Popover>
    </>
  );
};
