const { 
  addNotehandler, 
  getAllNotesHandler, 
  editNoteByIdHandler, 
  getNoteByIdHandler, 
  deleteNoteByIdHandler
} = require('./handler');

const routes = [
  // create
  {
    method: 'POST',
    path: '/notes',
    handler: addNotehandler
  },
  // read
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler
  },
  // update
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler
  },
  // delete
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler
  }
];

module.exports = routes;