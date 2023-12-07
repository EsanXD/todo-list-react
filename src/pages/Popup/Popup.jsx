import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Popover,
} from '@mui/material';
import { addTask, createTask, createTaskList } from './Util/utils';
import { AddButton } from './components/addButton';

const Popup = () => {
  // chrome.storage.sync.set({ key: {} }).then(() => {
  //   console.log('Value is set');
  // });

  // chrome.storage.sync.get(['list']).then((result) => {
  //   console.log('Value currently is ' + result.key);
  // });

  const [list, setList] = useState({});

  useEffect(() => {
    chrome.storage.sync.get('list', (result) => {
      setList(result.key);
    });
  }, []);

  return (
    <Card sx={{ maxWidth: 600 }} style={{ backgroundColor: '#b0eafe' }}>
      <CardMedia
        sx={{ height: 150 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjefDFZwfsU77Fzt9KrHGtLKfEZ7mUqEvGHg"
        title="Rilakuma"
      />
      <CardContent>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4">Todo List</Typography>
          <AddButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default Popup;
