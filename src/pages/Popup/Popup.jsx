import React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Checkbox,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { addTask, createTask, createTaskList } from './Util/utils';
import { AddButton } from './components/addButton';

const Popup = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    const intervalID = window.setInterval(() => {
      getFromStorage();
    }, 500);
  }, []);

  const getFromStorage = () => {
    chrome.storage.local.get('categories', (result) => {
      setList(result.categories ?? []);
      // console.log(result.categories);
    });
    // chrome.storage.local.set({ categories: [] });
  };

  const handleClick = (ind) => {
    setOpen(open === ind ? -1 : ind);
  };

  const handleItemClick = (item) => {
    list.map((category) => {
      category.items.map((i) => {
        if (i === item) {
          i.isDone = !i.isDone;
        }
      });
    });
    setList(list);
    chrome.storage.local.set({
      categories: list,
    });
  };

  return (
    <Card sx={{ maxWidth: 600 }} style={{ backgroundColor: '#b0eafe' }}>
      <CardMedia
        sx={{ height: 75 }}
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
        <Paper>
          <List
            component="nav"
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              height: 425,
              maxHeight: 425,
              '& ul': { padding: 0 },
            }}
            style={{ padding: 0 }}
          >
            {list.map((cat, ind) => {
              return (
                <>
                  <ListItemButton
                    onClick={() => handleClick(ind)}
                    style={{ backgroundColor: cat.color }}
                  >
                    <ListItemText primary={cat.category} />
                    {open === ind ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {cat.items.map((item, jdx) => {
                    return (
                      <Collapse in={open === ind} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            style={{ backgroundColor: cat.color }}
                          >
                            <Checkbox
                              checked={item.isDone}
                              onChange={() => handleItemClick(item)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <ListItemText primary={item.label} />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    );
                  })}
                </>
              );
            })}
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default Popup;
